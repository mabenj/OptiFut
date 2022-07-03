import cloneDeep from "lodash.clonedeep";
import { choice } from "../../utils/utils";
import { Player } from "../players/Player";
import { PlayerNode } from "../players/PlayerNode";
import { ChemistryResult } from "../types/chemistry-result.interface";
import { FormationDto } from "../types/formation-dto.interface";
import { League } from "../types/league.interface";
import { Manager } from "../types/manager.interface";
import { Nationality } from "../types/nationality.interface";
import { PosModInfo } from "../types/pos-mod-info.interface";
import { PositionTag } from "../types/position-tag.type";

export abstract class AbstractFormation<T> {
    abstract readonly name: string;

    private readonly playerNodes: PlayerNode[];

    public manager: Manager | undefined;
    public get players(): Player[] {
        return this.playerNodes.map((playerNode) => playerNode.player);
    }

    constructor(playerNodes: PlayerNode[], generateManager: boolean) {
        this.playerNodes = playerNodes;
        if (generateManager) {
            this.manager = this.generateManager();
        }
    }

    abstract mateWith(
        mate: AbstractFormation<T>,
        mutationRate: number,
        crossoverRate: number
    ): [child1: AbstractFormation<T>, child2: AbstractFormation<T>];

    //https://fifauteam.com/how-is-chemistry-calculated-in-fifa-19-ultimate-team/
    public calculateChemistry(): ChemistryResult {
        let total = 0;
        const offChem: Player[] = [];
        const posModded: PosModInfo[] = [];
        this.playerNodes.forEach((playerNode) => {
            const playerChem = playerNode.calculateChemistry(this.manager);
            const posModCount = playerNode.player.getPosModCount();
            if (playerChem < 10) {
                offChem.push(playerNode.player);
            }
            if (posModCount > 0) {
                posModded.push({
                    count: posModCount,
                    player: playerNode.player
                });
            }
            total += playerChem;
        });
        return {
            totalChemistry: Math.min(total, 100),
            offChemPlayers: offChem,
            posModdedPlayers: posModded
        };
    }

    public getPlayer(name: string) {
        const player = this.players.find((player) => player.name === name);
        if (!player) {
            throw new Error(`Player with name '${name}' not found`);
        }
        return player;
    }

    public getPlayerByTag(tag: PositionTag) {
        const player = this.playerNodes.find(
            (node) => node.tag === tag
        )?.player;
        if (!player) {
            throw new Error(`Player with tag '${tag}' not found`);
        }
        return player;
    }

    public toDto(): FormationDto {
        const chemInfo = this.calculateChemistry();
        return {
            manager: this.manager,
            positions: this.playerNodes.map((node) => ({
                positionTag: node.tag,
                player: node.player.toDto()
            })),
            totalChemistry: chemInfo.totalChemistry,
            offChemPlayers: chemInfo.offChemPlayers.map((p) => p.toDto()),
            posModdedPlayers: chemInfo.posModdedPlayers.map((posMod) => ({
                count: posMod.count,
                player: posMod.player.toDto()
            }))
        };
    }

    protected mateWithImpl<T>(
        mate: AbstractFormation<T>,
        mutationRate: number,
        crossoverRate: number,
        formationFactory: (
            players: Player[],
            generateManager: boolean
        ) => AbstractFormation<T>
    ): [child1: AbstractFormation<T>, child2: AbstractFormation<T>] {
        const [child1Players, child2Players, child1Manager, child2Manager] =
            this.getChildrenWith(mate, crossoverRate);
        const childFormation1 = formationFactory(child1Players, false);
        const childFormation2 = formationFactory(child2Players, false);
        childFormation1.manager = child1Manager;
        childFormation2.manager = child2Manager;
        childFormation1.mutate(mutationRate);
        childFormation2.mutate(mutationRate);
        return [childFormation1, childFormation2];
    }

    private getChildrenWith(
        mate: AbstractFormation<T>,
        crossoverRate: number
    ): [
        playersChild1: Player[],
        playersChild2: Player[],
        managerChild1: Manager | undefined,
        managerChild2: Manager | undefined
    ] {
        const playersOfChild1: Player[] = [];
        const playersOfChild2: Player[] = [];
        const playerNames = this.players.map((player) => player.name);
        playerNames.forEach((playerName) => {
            if (Math.random() < crossoverRate) {
                playersOfChild1.push(cloneDeep(this.getPlayer(playerName)));
                playersOfChild2.push(cloneDeep(mate.getPlayer(playerName)));
            } else {
                playersOfChild1.push(cloneDeep(mate.getPlayer(playerName)));
                playersOfChild2.push(cloneDeep(this.getPlayer(playerName)));
            }
        });
        let manager1: Manager | undefined;
        let manager2: Manager | undefined;
        if (Math.random() < crossoverRate) {
            manager1 = this.manager;
            manager2 = mate.manager;
        } else {
            manager1 = mate.manager;
            manager2 = this.manager;
        }
        return [playersOfChild1, playersOfChild2, manager1, manager2];
    }

    private mutate(mutationRate: number) {
        for (let i = 0; i < this.playerNodes.length; i++) {
            if (Math.random() < mutationRate) {
                const currentNode = this.playerNodes[i];

                // new face position
                currentNode.player.randomizeFacePosition();

                // swap position with another node
                let swapTarget = choice(
                    this.playerNodes.filter(
                        (node) => node.tag !== currentNode.tag
                    )
                );
                const tempPlayer = currentNode.player;
                currentNode.player = swapTarget.player;
                swapTarget.player = tempPlayer;
            }
        }

        if (Math.random() < mutationRate) {
            // mutate manager
            this.manager = this.generateManager();
        }
    }

    private generateManager() {
        const nationOptions = this.playerNodes
            .map((node) => node.player.nationality)
            .reduce((acc: Nationality[], curr: Nationality) => {
                if (!acc.some((nation) => nation.id === curr.id)) {
                    acc.push(curr);
                }
                return acc;
            }, []);
        const leagueOptions = this.playerNodes
            .map((node) => node.player.league)
            .reduce((acc: League[], curr: League) => {
                if (!acc.some((league) => league.id === curr.id)) {
                    acc.push(curr);
                }
                return acc;
            }, []);
        return {
            nationality: choice(nationOptions),
            league: choice(leagueOptions)
        };
    }
}
