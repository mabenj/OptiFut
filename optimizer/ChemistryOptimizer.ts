import cloneDeep from "lodash.clonedeep";
import {
    choice,
    compareFormations,
    getPosModCount,
    shuffle
} from "../utils/utils";
import { GA_CONFIG } from "./constants/geneticAlgorithm";
import { AbstractFormation } from "./formations/AbstractFormation";
import { Player } from "./players/Player";
import { FormationDto } from "./types/formation-dto.interface";
import { GenerationInfo } from "./types/generation-info.interface";
import { Position } from "./types/position.interface";

export class ChemistryOptimizer {
    constructor(
        private readonly playerPool: Player[],
        private readonly useManager: boolean,
        private readonly blankFormation: {
            position: Position;
            player: Player | null;
        }[],
        private readonly formationFactory: (
            players: Player[],
            useManager: boolean
        ) => AbstractFormation<unknown>
    ) {}

    public optimize(updateFn: (genInfo: GenerationInfo) => any): FormationDto {
        let population = this.generateInitialPopulation();
        updateFn(getGenerationInfo(population));

        for (let gen = 1; gen < GA_CONFIG.generations; gen++) {
            population = this.getNextGeneration(population);
            updateFn(getGenerationInfo(population));
        }

        const best = population.sort(compareFormations)[population.length - 1];
        return best.toDto();
    }

    private generateInitialPopulation() {
        const population: AbstractFormation<unknown>[] = [];
        for (let i = 0; i < GA_CONFIG.populationSize; i++) {
            const shuffledPool = shuffle(cloneDeep(this.playerPool));
            shuffledPool.forEach((player) => player.randomizeFacePosition());
            const squadPositions = cloneDeep(this.blankFormation);

            squadPositions.forEach((squadPos) => {
                // first try to find natural fit
                const indexOfNaturalFit = shuffledPool.findIndex(
                    (player) =>
                        player.facePosition.naturalPosition ===
                        squadPos.position.naturalPosition
                );
                if (indexOfNaturalFit > -1) {
                    squadPos.player = shuffledPool[indexOfNaturalFit];
                    shuffledPool.splice(indexOfNaturalFit, 1);
                    return;
                }

                // then related fit
                const indexOfRelatedFit = shuffledPool.findIndex((player) =>
                    squadPos.position.relatedPositions.includes(
                        player.facePosition.naturalPosition
                    )
                );
                if (indexOfRelatedFit > -1) {
                    squadPos.player = shuffledPool[indexOfRelatedFit];
                    shuffledPool.splice(indexOfRelatedFit, 1);
                    return;
                }

                // then unrelated fit
                const indexOfUnrelatedFit = shuffledPool.findIndex((player) =>
                    squadPos.position.unrelatedPositions.includes(
                        player.facePosition.naturalPosition
                    )
                );
                if (indexOfUnrelatedFit > -1) {
                    squadPos.player = shuffledPool[indexOfUnrelatedFit];
                    shuffledPool.splice(indexOfUnrelatedFit, 1);
                    return;
                }
            });

            // fill empty rest positions
            squadPositions
                .filter((squadPos) => squadPos.player === null)
                .forEach((squadPos) => {
                    const player = shuffledPool.pop();
                    if (!player) {
                        throw new Error("Player pool is empty");
                    }
                    squadPos.player = player;
                });

            const players = squadPositions.map(({ player }) => {
                if (player === null) {
                    throw new Error("Squad position player is null");
                }
                return player;
            });

            population.push(this.formationFactory(players, this.useManager));
        }
        return population;
    }

    private tournament(population: AbstractFormation<unknown>[]) {
        const tournament: AbstractFormation<unknown>[] = [];
        for (let i = 0; i < GA_CONFIG.tournamentSize; i++) {
            tournament.push(choice(population));
        }
        return tournament.sort(compareFormations)[GA_CONFIG.tournamentSize - 1];
    }

    private getNextGeneration<T>(
        prevGen: AbstractFormation<T>[]
    ): AbstractFormation<T>[] {
        const populationSize = prevGen.length;
        prevGen.sort(compareFormations);
        const mostFit = prevGen[populationSize - 1];
        const secondFit = prevGen[populationSize - 2];
        const thirdFit = prevGen[populationSize - 3];
        const fourthFit = prevGen[populationSize - 4];
        const fifthFit = prevGen[populationSize - 5];

        const nextGen: AbstractFormation<T>[] = [];

        while (nextGen.length < populationSize) {
            const parent1 = this.tournament(prevGen);
            const parent2 = this.tournament(prevGen);
            const [child1, child2] = parent1.mateWith(
                parent2,
                GA_CONFIG.mutationRate,
                GA_CONFIG.crossoverRate
            );
            nextGen.push(child1, child2);
        }

        // Elitism
        nextGen[prevGen.length - 5] = fifthFit;
        nextGen[prevGen.length - 4] = fourthFit;
        nextGen[prevGen.length - 3] = thirdFit;
        nextGen[prevGen.length - 2] = secondFit;
        nextGen[prevGen.length - 1] = mostFit;
        return nextGen;
    }
}

function getGenerationInfo(
    generation: AbstractFormation<unknown>[]
): GenerationInfo {
    let chemTotal = 0;
    let offChemCountTotal = 0;
    let posModCountTotal = 0;
    generation.sort(compareFormations);
    const bestChemInfo = generation[generation.length - 1].calculateChemistry();
    generation.forEach((squad) => {
        const chemInfo = squad.calculateChemistry();
        chemTotal += chemInfo.totalChemistry;
        offChemCountTotal += chemInfo.offChemPlayers.length;
        posModCountTotal += getPosModCount(chemInfo.posModdedPlayers);
    });
    return {
        avgChemistry: chemTotal / generation.length,
        avgOffChem: offChemCountTotal / generation.length,
        avgPosModCount: posModCountTotal / generation.length,
        bestChemistry: bestChemInfo.totalChemistry,
        bestOffChem: bestChemInfo.offChemPlayers.length,
        bestPosModCount: getPosModCount(bestChemInfo.posModdedPlayers)
    };
}
