import cloneDeep from "lodash.clonedeep";
import { FormationId } from "../../types/formation-id";
import { choice } from "../../utils/utils";
import { GAConfig } from "../constants/ga-config";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { ChemistryResult } from "../types/chemistry-result.interface";
import { Manager } from "../types/manager.interface";
import { PositionValue } from "../types/position-value.enum";

const OFFCHEM_THRESHOLD = 10;
const FULLCHEM = 100;

export abstract class Formation {
    abstract readonly formationId: FormationId;
    abstract readonly availablePositions: PositionValue[];

    private positionNodes: PositionNode[];
    public manager: Manager | undefined;
    public get players(): PlayerEntity[] {
        return this.positionNodes.map((positionNode) => positionNode.player);
    }

    constructor(positionNodes: PositionNode[], useManager: boolean) {
        this.positionNodes = positionNodes;
        if (useManager) {
            this.manager = this.generateManager();
        }
        // this.calculateChemistry = memoize(this.calculateChemistry); // TODO: check if this actually works
    }

    abstract createFormation(
        players: PlayerEntity[],
        useManager: boolean
    ): Formation;

    //https://fifauteam.com/how-is-chemistry-calculated-in-fifa-19-ultimate-team/
    public calculateChemistry(): ChemistryResult {
        let totalChem = 0;
        let offChemPlayersCount = 0;
        let positionModificationsCount = 0;
        for (let i = 0; i < this.positionNodes.length; i++) {
            const playerNode = this.positionNodes[i];
            const playerChem = playerNode.calculateChemistry(this.manager);
            const posModCount =
                playerNode.player.getNumberOfPositionModifications();
            if (playerChem < OFFCHEM_THRESHOLD) {
                offChemPlayersCount++;
            }
            positionModificationsCount += posModCount;
            totalChem += playerChem;
        }
        return {
            totalChemistry: Math.min(totalChem, FULLCHEM),
            offChemPlayersCount: offChemPlayersCount,
            positionModificationsCount: positionModificationsCount
        };
    }

    public toDto() {
        const players = this.positionNodes.map((node) => ({
            id: node.player.id,
            name: node.player.name,
            chemistry: node.calculateChemistry(this.manager),
            originalPosition: PositionValue.toString(
                node.player.originalPosition
            ),
            newPosition: PositionValue.toString(node.player.currentPosition),
            positionModificationCount:
                node.player.getNumberOfPositionModifications(),
            positionNode: node.nodeId,
            hasLoyalty: node.player.hasLoyalty
        }));
        const teamChemistry = this.calculateChemistry().totalChemistry;
        return {
            players,
            teamChemistry,
            manager: {
                nationalityId: this.manager?.nationalityId,
                leagueId: this.manager?.leagueId
            }
        };
    }

    public mateWith(mate: Formation): [child1: Formation, child2: Formation] {
        const [child1Players, child2Players, child1Manager, child2Manager] =
            this.getChildrenWith(mate);
        const childFormation1 = this.createFormation(child1Players, false);
        const childFormation2 = this.createFormation(child2Players, false);
        childFormation1.manager = child1Manager;
        childFormation2.manager = child2Manager;
        childFormation1.mutate();
        childFormation2.mutate();
        return [childFormation1, childFormation2];
    }

    private getChildrenWith(
        mate: Formation
    ): [
        playersOfChild1: PlayerEntity[],
        playersOfChild2: PlayerEntity[],
        managerOfChild1: Manager | undefined,
        managerOfChild2: Manager | undefined
    ] {
        const playersOfChild1: PlayerEntity[] = [];
        const playersOfChild2: PlayerEntity[] = [];
        const playerIds = this.players.map((player) => player.id);
        for (let i = 0; i < playerIds.length; i++) {
            if (Math.random() < GAConfig.crossoverRate) {
                playersOfChild1.push(cloneDeep(this.getPlayer(playerIds[i])));
                playersOfChild2.push(cloneDeep(mate.getPlayer(playerIds[i])));
            } else {
                playersOfChild1.push(cloneDeep(mate.getPlayer(playerIds[i])));
                playersOfChild2.push(cloneDeep(this.getPlayer(playerIds[i])));
            }
        }
        let manager1: Manager | undefined;
        let manager2: Manager | undefined;
        if (Math.random() < GAConfig.crossoverRate) {
            manager1 = cloneDeep(this.manager);
            manager2 = cloneDeep(mate.manager);
        } else {
            manager1 = cloneDeep(mate.manager);
            manager2 = cloneDeep(this.manager);
        }
        return [playersOfChild1, playersOfChild2, manager1, manager2];
    }

    private mutate() {
        for (let i = 0; i < this.positionNodes.length; i++) {
            const currentNode = this.positionNodes[i];
            if (Math.random() < GAConfig.mutationRate) {
                // mutate face position
                currentNode.player.randomizePosition();
            }

            if (Math.random() < GAConfig.mutationRate) {
                // mutate player position (swap players with another node)
                let swapTarget = choice(
                    this.positionNodes.filter(
                        (node) => node.nodeId !== currentNode.nodeId
                    )
                );
                const tempPlayer = currentNode.player;
                currentNode.player = swapTarget.player;
                swapTarget.player = tempPlayer;
            }
        }

        if (this.manager && Math.random() < GAConfig.mutationRate) {
            // mutate manager
            this.manager = this.generateManager();
        }
    }

    private generateManager(): Manager {
        const nationOptions = Array.from(
            new Set(this.positionNodes.map((node) => node.player.nationalityId))
        );
        const leagueOptions = Array.from(
            new Set(this.positionNodes.map((node) => node.player.leagueId))
        );
        return {
            nationalityId: choice(nationOptions),
            leagueId: choice(leagueOptions)
        };
    }

    private getPlayer(id: number) {
        const player = this.players.find((player) => player.id === id);
        if (!player) {
            throw new Error(`Player with id '${id}' not found`);
        }
        return player;
    }
}
