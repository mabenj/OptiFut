import cloneDeep from "lodash.clonedeep";
import { FormationId } from "../types/formation-id";
import { PlayerInfo } from "../types/player-info.interface";
import { choice, getFormationSortFunction, shuffle } from "../utils/utils";
import { GAConfig } from "./constants/ga-config";
import { Formation } from "./formations/Formation";
import { FormationFactory } from "./formations/FormationFactory";
import { PlayerEntity } from "./PlayerEntity";
import { PositionValue } from "./types/position-value.enum";

export class ChemistryOptimizer {
    private readonly playerPool: PlayerEntity[];
    private readonly useManager: boolean;
    private readonly formationId: FormationId;

    constructor(
        players: PlayerInfo[],
        useManager: boolean,
        formationId: FormationId
    ) {
        this.playerPool = players.map(
            (p, i) =>
                new PlayerEntity(
                    i,
                    p.name,
                    p.nationId,
                    p.leagueId,
                    p.clubId,
                    p.position,
                    p.hasLoyalty
                )
        );
        this.useManager = useManager;
        this.formationId = formationId;
    }

    public optimize() {
        let population = this.generateInitialPopulation();
        for (let gen = 1; gen < GAConfig.generations; gen++) {
            population = this.getNextGeneration(population);
        }
        const best = population.sort(getFormationSortFunction(population))[
            population.length - 1
        ];
        return best.getInfo();
    }

    private generateInitialPopulation() {
        const population: Formation[] = [];
        const availablePositions = FormationFactory.createFormation(
            this.formationId,
            this.playerPool,
            this.useManager
        ).positions;
        const emptyPositionSlots: {
            position: PositionValue;
            player: PlayerEntity | null;
        }[] = availablePositions.map((availablePosition) => ({
            position: availablePosition,
            player: null
        }));

        for (let i = 0; i < GAConfig.populationSize; i++) {
            const shuffledPlayerPool = shuffle(cloneDeep(this.playerPool));
            shuffledPlayerPool.forEach((player) => player.randomizePosition());
            const positionSlots = cloneDeep(emptyPositionSlots);

            positionSlots.forEach((positionSlot) => {
                // first try to find natural fit
                const indexOfNaturalFit = shuffledPlayerPool.findIndex(
                    (player) => player.currentPosition === positionSlot.position
                );
                if (indexOfNaturalFit > -1) {
                    positionSlot.player = shuffledPlayerPool[indexOfNaturalFit];
                    shuffledPlayerPool.splice(indexOfNaturalFit, 1);
                    return;
                }

                // then related fit
                const indexOfRelatedFit = shuffledPlayerPool.findIndex(
                    (player) =>
                        player.relatedPositions.includes(positionSlot.position)
                );
                if (indexOfRelatedFit > -1) {
                    positionSlot.player = shuffledPlayerPool[indexOfRelatedFit];
                    shuffledPlayerPool.splice(indexOfRelatedFit, 1);
                    return;
                }

                // then unrelated fit
                const indexOfUnrelatedFit = shuffledPlayerPool.findIndex(
                    (player) =>
                        player.unrelatedPositions.includes(
                            positionSlot.position
                        )
                );
                if (indexOfUnrelatedFit > -1) {
                    positionSlot.player =
                        shuffledPlayerPool[indexOfUnrelatedFit];
                    shuffledPlayerPool.splice(indexOfUnrelatedFit, 1);
                    return;
                }
            });

            // fill empty rest positions
            positionSlots
                .filter((positionSlot) => positionSlot.player === null)
                .forEach((positionSlot) => {
                    const player = shuffledPlayerPool.pop();
                    if (!player) {
                        throw new Error("Player pool is empty");
                    }
                    positionSlot.player = player;
                });

            const players = positionSlots.map(({ player }) => {
                if (player === null) {
                    throw new Error("Squad position player is null");
                }
                return player;
            });

            population.push(
                FormationFactory.createFormation(
                    this.formationId,
                    players,
                    this.useManager
                )
            );
        }
        return population;
    }

    private tournament(population: Formation[]) {
        const tournament: Formation[] = [];
        for (let i = 0; i < GAConfig.tournamentSize; i++) {
            tournament.push(choice(population));
        }
        return tournament.sort(getFormationSortFunction(tournament))[
            tournament.length - 1
        ];
    }

    private getNextGeneration(prevGen: Formation[]): Formation[] {
        const populationSize = prevGen.length;
        prevGen.sort(getFormationSortFunction(prevGen));
        const mostFit = prevGen[populationSize - 1];
        const secondFit = prevGen[populationSize - 2];
        const thirdFit = prevGen[populationSize - 3];
        const fourthFit = prevGen[populationSize - 4];
        const fifthFit = prevGen[populationSize - 5];

        const nextGen: Formation[] = [];

        while (nextGen.length < populationSize - 5) {
            const parent1 = this.tournament(prevGen);
            const parent2 = this.tournament(prevGen);
            const [child1, child2] = parent1.mateWith(parent2);
            nextGen.push(child1, child2);
        }

        // Elitism
        nextGen[populationSize - 5] = fifthFit;
        nextGen[populationSize - 4] = fourthFit;
        nextGen[populationSize - 3] = thirdFit;
        nextGen[populationSize - 2] = secondFit;
        nextGen[populationSize - 1] = mostFit;

        return nextGen;
    }
}
