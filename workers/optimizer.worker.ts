import { expose } from "threads/worker";
import { ChemistryOptimizer } from "../optimizer/ChemistryOptimizer";
import { FormationId } from "../types/formation-id";
import { PlayerDto } from "../types/player-dto.interface";

const chemistryOptimizerWorker = {
    start(players: PlayerDto[], formationId: FormationId, useManager: boolean) {
        const chemOptimizer = new ChemistryOptimizer(
            players,
            useManager,
            "433"
        );
        const result = chemOptimizer.optimize();
        return result;
    }
};

export type ChemistryOptimizerWorker = typeof chemistryOptimizerWorker;

expose(chemistryOptimizerWorker);
