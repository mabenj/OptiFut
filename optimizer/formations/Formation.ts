import cloneDeep from "lodash.clonedeep";
import { FormationId } from "../../types/formation-id";
import { choice } from "../../utils/utils";
import { GAConfig } from "../constants/ga-config";
import { OptiPlayer } from "../OptiPlayer";
import { OptiPlayerNode } from "../OptiPlayerNode";
import { ChemistryResult } from "../types/chemistry-result.interface";
import { Manager } from "../types/manager.interface";
import { PositionValue } from "../types/position-value.enum";

const OFFCHEM_THRESHOLD = 10;
const FULLCHEM = 100;

export abstract class Formation {
    abstract readonly formationId: FormationId;
    abstract readonly availablePositions: PositionValue[];

    private readonly _playerNodes: OptiPlayerNode[];
    public manager: Manager | undefined;
    public get players(): OptiPlayer[] {
        return this._playerNodes.map((playerNode) => playerNode.player);
    }

    constructor(playerNodes: OptiPlayerNode[], useManager: boolean) {
        this._playerNodes = playerNodes;
        if (useManager) {
            this.manager = this.generateManager();
        }
        // this.calculateChemistry = memoize(this.calculateChemistry); // TODO: check if this actually works
    }

    abstract createFormation(
        players: OptiPlayer[],
        useManager: boolean
    ): Formation;

    //https://fifauteam.com/how-is-chemistry-calculated-in-fifa-19-ultimate-team/
    public calculateChemistry(): ChemistryResult {
        let total = 0;
        const offChemIds: number[] = [];
        const posModded: { [playerId: number]: number } = {};
        for (let i = 0; i < this._playerNodes.length; i++) {
            const playerNode = this._playerNodes[i];
            const playerChem = playerNode.calculateChemistry(this.manager);
            const posModCount =
                playerNode.player.getNumberOfPositionModifications();
            if (playerChem < OFFCHEM_THRESHOLD) {
                offChemIds.push(playerNode.player.id);
            }
            if (posModCount > 0) {
                posModded[playerNode.player.id] = posModCount;
            }
            total += playerChem;
        }
        return {
            totalChemistry: Math.min(total, FULLCHEM),
            offChemPlayerIds: offChemIds,
            positionModifications: posModded
        };
    }

    public toDto() {
        const players = this._playerNodes.map((node) => ({
            id: node.player.id,
            name: node.player.name,
            chemistry: node.calculateChemistry(this.manager),
            originalPosition: PositionValue.toString(
                node.player.originalPosition.position
            ),
            newPosition: PositionValue.toString(
                node.player.currentPosition.position
            ),
            positionModificationCount: Math.abs(
                node.player.originalPosition.position -
                    node.player.currentPosition.position
            ),
            positionInSquad: node.nodeId,
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
        playersOfChild1: OptiPlayer[],
        playersOfChild2: OptiPlayer[],
        managerOfChild1: Manager | undefined,
        managerOfChild2: Manager | undefined
    ] {
        const playersOfChild1: OptiPlayer[] = [];
        const playersOfChild2: OptiPlayer[] = [];
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
        for (let i = 0; i < this._playerNodes.length; i++) {
            if (Math.random() < GAConfig.mutationRate) {
                const currentNode = this._playerNodes[i];

                // new face position
                currentNode.player.randomizeFifaPosition();

                // swap position with another node
                let swapTarget = choice(
                    this._playerNodes.filter(
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
            new Set(this._playerNodes.map((node) => node.player.nationalityId))
        );
        const leagueOptions = Array.from(
            new Set(this._playerNodes.map((node) => node.player.leagueId))
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
