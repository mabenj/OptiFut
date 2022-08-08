import { useState } from "react";
import { Pool, spawn } from "threads";
import { FormationInfo } from "../optimizer/types/formation-info";
import { FormationId } from "../types/formation-id";
import { PlayerInfo } from "../types/player-info.interface";
import { ChemistryOptimizerWorker } from "../workers/optimizer.worker";

export function useOptimizer() {
    const [optimizedFormations, setOptimizedFormations] = useState<
        FormationInfo[]
    >([]);

    const optimize = async (
        players: PlayerInfo[],
        formations: FormationId[],
        useManager: boolean
    ) => {
        setOptimizedFormations([]);

        const threadPool = Pool(() =>
            spawn<ChemistryOptimizerWorker>(
                new Worker(
                    // @ts-ignore
                    new URL("../workers/optimizer.worker", import.meta.url)
                )
            )
        );

        console.time("[optimizer total]");
        formations.forEach((formationId) =>
            threadPool.queue(async (optimizerWorker) => {
                const result = await optimizerWorker.start(
                    players,
                    formationId,
                    useManager
                );
                setOptimizedFormations((prev) => [...prev, result]);
            })
        );

        await threadPool.completed();
        console.timeEnd("[optimizer total]");
        await threadPool.terminate();
    };

    return { optimize, optimizedFormations };
}
