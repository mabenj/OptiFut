import { expose } from "threads/worker";
import { ChemistryOptimizer } from "../optimizer/ChemistryOptimizer";
import { FormationId } from "../types/formation-id";
import { PlayerInfo } from "../types/player-info.interface";

const chemistryOptimizerWorker = {
    start(
        players: PlayerInfo[],
        formationId: FormationId,
        useManager: boolean
    ) {
        const chemOptimizer = new ChemistryOptimizer(
            players,
            useManager,
            formationId
        );
        const result = chemOptimizer.optimize();
        return result;
    }
};

export type ChemistryOptimizerWorker = typeof chemistryOptimizerWorker;

expose(chemistryOptimizerWorker);
