import { cloneDeep, shuffle } from "lodash";
import { FormationInfo } from "../optimizer/types/formation-info";
import { FormationId } from "../types/formation-id";
import { PlayerInfo } from "../types/player-info.interface";
import { PlayerPosition } from "../types/player-position.type";
import { choice, getFormationSortFunction } from "../utils/utils";
import { Formation } from "./formations/Formation";
import { Formation442 } from "./formations/Formation442";
import { FormationFactory } from "./formations/FormationFactory";
import { GAConfig } from "./ga-config";
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
                    player.position,
                    player.position,
                    player.alternativePositions
                )
        );
        this.useManager = useManager;
        this.formation = formation;
    }

    public optimize(): FormationInfo {
        let population = this.generateInitialPopulation();
        for (let gen = 1; gen < GAConfig.generations; gen++) {
            population = this.getNextGeneration(population);
        }
        const best = population.sort(getFormationSortFunction(population))[
            population.length - 1
        ];
        return {
            formationId: this.formation,
            chemistry: best.calculateChemistry(),
            players: [],
            manager: best.manager,
        }
    }

    private generateInitialPopulation(): Formation[] {
        const population: Formation[] = [];
        const availablePositions = FormationFactory.getAvailablePositions(
            this.formation
        );
        const emptyPositionSlots = availablePositions.map((position) => ({
            position: position,
            player: null as PlayerEntity | null
        }));

        for (let i = 0; i < GAConfig.populationSize; i++) {
            const shuffledPlayerPool = shuffle(cloneDeep(this.playerPool));
            shuffledPlayerPool.forEach((player) => player.randomizePosition());
            const positionSlots = cloneDeep(emptyPositionSlots);

            // try to fill positions with preferred players
            positionSlots.forEach((positionSlot) => {
                const indexOfPreferredPlayer = shuffledPlayerPool.findIndex(
                    (player) => player.prefPosition === positionSlot.position
                );
                if (indexOfPreferredPlayer === -1) {
                    return;
                }
                positionSlot.player =
                    shuffledPlayerPool[indexOfPreferredPlayer];
                shuffledPlayerPool.splice(indexOfPreferredPlayer, 1);
            });

            // fill remaining positions with random players
            positionSlots
                .filter((positionSlot) => positionSlot.player === null)
                .forEach((positionSlot) => {
                    const player = shuffledPlayerPool.pop();
                    if (!player) {
                        throw new Error("Player pool unexpectedly empty");
                    }
                    positionSlot.player = player;
                });

            const players = positionSlots.map(
                (positionSlot) => {
                    if(positionSlot.player === null) {
                        throw new Error("Position slot unexpectedly empty");
                    }
                    return positionSlot.player
                }
            );

            population.push(
                FormationFactory.createFormation(
                    this.formation,
                    players,
                    this.useManager
                )
            );
        }

        return population
    }

    private getNextGeneration(prevGen: Formation[]): Formation[] {
        const populationSize = prevGen.length;
        prevGen.sort(getFormationSortFunction(prevGen))
        
        const ELITISM_SIZE = 4;
        const mostFit: Formation[] = []
        for (let i = 1; i <= ELITISM_SIZE; i++) {
            mostFit.push(prevGen[populationSize - i])
        }

        const nextGen: Formation[] = [];
        while(nextGen.length < populationSize - ELITISM_SIZE) {
            const parent1 = this.tournament(prevGen)
            const parent2 = this.tournament(prevGen)
            const [child1, child2] = parent1.mateWith(parent2)
            nextGen.push(child1, child2)
        }

        return nextGen.concat(mostFit)
    }

    private tournament(population: Formation[]){
        const tournament: Formation[] = []
        while(tournament.length < GAConfig.tournamentSize) {
            const candidate = choice(population)
            if(!tournament.includes(candidate)){
                tournament.push(candidate)
            }
        }
        return tournament.sort(getFormationSortFunction(tournament))[tournament.length - 1]
    }
}