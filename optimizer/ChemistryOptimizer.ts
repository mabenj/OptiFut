import cloneDeep from "lodash.clonedeep";
import { FormationId } from "../types/formation-id";
import { FormationInfo } from "../types/formation-info";
import { PlayerInfo } from "../types/player-info.interface";
import { choice, getFormationSortFunction, shuffle } from "../utils/utils";
import { Formation } from "./formations/Formation";
import { FormationFactory } from "./formations/FormationFactory";
import { GaConfig } from "./ga-config";
import { PlayerEntity } from "./PlayerEntity";

export class ChemistryOptimizer {
    private readonly playerPool: PlayerEntity[];
    private readonly useManager: boolean;
    private readonly formation: FormationId;

    constructor(
        playerPool: PlayerInfo[],
        useManager: boolean,
        formation: FormationId
    ) {
        this.playerPool = playerPool.map(
            (player, i) =>
                new PlayerEntity(
                    i,
                    player.name,
                    player.nationId,
                    player.leagueId,
                    player.clubId,
                    player.prefPosition,
                    player.prefPosition,
                    player.altPositions
                )
        );
        this.useManager = useManager;
        this.formation = formation;
    }

    public optimize(onGeneration?: (currentBest: FormationInfo) => void) {
        let population = this.generateInitialPopulation();
        for (let gen = 1; gen < GaConfig.generations; gen++) {
            onGeneration && onGeneration(getMostFit(population).getInfo());
            population = this.getNextGeneration(population);
        }
        onGeneration && onGeneration(getMostFit(population).getInfo());
        return getMostFit(population).getInfo();
    }

    private generateInitialPopulation(): Formation[] {
        const population: Formation[] = [];

        for (let i = 0; i < GaConfig.populationSize; i++) {
            const shuffledPlayerPool = shuffle(cloneDeep(this.playerPool));
            shuffledPlayerPool.forEach((player) => player.randomizePosition());
            const formation = FormationFactory.createFormation(
                this.formation,
                shuffledPlayerPool,
                this.useManager
            );
            formation.autoAdjustPositions();
            population.push(formation);
        }

        return population;
    }

    private getNextGeneration(prevGen: Formation[]): Formation[] {
        const populationSize = prevGen.length;
        prevGen.sort(getFormationSortFunction(prevGen));

        const elite: Formation[] = [];
        for (let i = 0; i < GaConfig.elitismSize; i++) {
            elite.push(prevGen[populationSize - 1 - i]);
        }

        const nextGen: Formation[] = [];
        while (nextGen.length < populationSize - GaConfig.elitismSize) {
            const parent1 = this.tournament(prevGen);
            const parent2 = this.tournament(prevGen);
            const [child1, child2] = parent1.mateWith(parent2);
            nextGen.push(child1, child2);
        }

        return nextGen.concat(elite);
    }

    private tournament(population: Formation[]) {
        const tournament: Formation[] = [];
        while (tournament.length < GaConfig.tournamentSize) {
            const candidate = choice(population);
            if (!tournament.includes(candidate)) {
                tournament.push(candidate);
            }
        }
        return tournament.sort(getFormationSortFunction(tournament))[
            tournament.length - 1
        ];
    }
}

function getMostFit(population: Formation[]) {
    return population.sort(getFormationSortFunction(population))[
        population.length - 1
    ];
}
