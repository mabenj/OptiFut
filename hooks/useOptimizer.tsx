import { useBoolean } from "@chakra-ui/react";
import { useState } from "react";
import { ModuleThread, Pool, spawn } from "threads";
import { FormationInfo } from "../optimizer/types/formation-info";
import { FormationId } from "../types/formation-id";
import { PlayerInfo } from "../types/player-info.interface";
import { compareFormationInfo } from "../utils/utils";
import { ChemistryOptimizerWorker } from "../workers/optimizer.worker";

let threadPool: Pool<
    ModuleThread<{
        start(
            players: PlayerInfo[],
            formationId: FormationId,
            useManager: boolean
        ): FormationInfo;
    }>
>;

export function useOptimizer() {
    const [isOptimizing, setIsOptimizing] = useBoolean(false);
    const [optimizedFormations, setOptimizedFormations] = useState<
        FormationInfo[]
    >([]);

    const optimize = async (
        players: PlayerInfo[],
        formations: FormationId[],
        useManager: boolean
    ) => {
        setOptimizedFormations([]);
        setIsOptimizing.on();

        console.time("[optimizer total]");
        threadPool = Pool(() =>
            spawn<ChemistryOptimizerWorker>(
                new Worker(
                    // @ts-ignore
                    new URL("../workers/optimizer.worker", import.meta.url)
                )
            )
        );

        formations.forEach((formationId) =>
            threadPool.queue(async (optimizerWorker) => {
                const result = await optimizerWorker.start(
                    players,
                    formationId,
                    useManager
                );
                setOptimizedFormations((prev) => {
                    const newFormations = [...prev, result];
                    newFormations.sort(compareFormationInfo).reverse();
                    return newFormations;
                });
            })
        );

        await threadPool.completed();
        console.timeEnd("[optimizer total]");
        await stopOptimizer();
    };

    const resetOptimizer = async () => {
        setOptimizedFormations([]);
        await stopOptimizer();
    };

    const stopOptimizer = async () => {
        await threadPool.terminate();
        setIsOptimizing.off();
    };

    return {
        optimize,
        optimizedFormations,
        isOptimizing,
        resetOptimizer,
        stopOptimizer
    };
}
