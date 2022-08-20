import cloneDeep from "lodash.clonedeep";
import { HeroClubId, IconClubId, IconLeagueId } from "../../data/constants";
import { ChemistryResult } from "../../types/chemistry-result";
import { FormationId } from "../../types/formation-id";
import { Manager } from "../../types/manager";
import { choice } from "../../utils/utils";
import { GAConfig } from "../ga-config";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";

export abstract class Formation {
    abstract readonly formationId: FormationId;

    public manager: Manager | undefined;
    private positions: PositionNode[];

    private get players(){
        return this.positions.map((position) => position.player);
    }

    constructor(positions: PositionNode[], useManager: boolean) {
        this.positions = positions;
        if (useManager) {
            this.manager = this.generateManager();
        }
    }

    abstract createFormation(
        players: PlayerEntity[],
        useManager: boolean
    ): Formation;

    // https://www.ea.com/games/fifa/fifa-23/news/pitch-notes-fifa-23-fut-deep-dive?isLocalized=true
    public calculateChemistry(): ChemistryResult {
        const nationCounts = new Map<number, number>();
        const leagueCounts = new Map<number, number>();
        const clubCounts = new Map<number, number>();

        for (let i = 0; i < this.positions.length; i++) {
            if (this.positions[i].isOutOfPosition()) {
                continue;
            }
            const { nationId, leagueId, clubId } = this.positions[i].player;

            let currentNationCount = nationCounts.get(nationId) || 0;
            let currentLeagueCount = leagueCounts.get(leagueId) || 0;
            let currentClubCount = clubCounts.get(clubId) || 0;

            if (clubId === IconClubId) {
                currentNationCount += 2;
            } else if (clubId === HeroClubId) {
                currentNationCount += 1;
                currentLeagueCount += 2;
            } else {
                currentNationCount += 1;
                currentLeagueCount += 1;
                currentClubCount += 1;
            }

            nationCounts.set(nationId, currentNationCount);
            leagueCounts.set(leagueId, currentLeagueCount);
            clubCounts.set(clubId, currentClubCount);
        }

        if (this.manager) {
            nationCounts.set(
                this.manager.nationId,
                (nationCounts.get(this.manager.nationId) || 0) + 1
            );
            leagueCounts.set(
                this.manager.leagueId,
                (leagueCounts.get(this.manager.leagueId) || 0) + 1
            );
        }

        const playerChemistries = new Map<PlayerEntity, number>();
        for (let i = 0; i < this.positions.length; i++) {
            const { nationId, leagueId, clubId } = this.positions[i].player;

            let resultPoints = 0;
            if (this.positions[i].isOutOfPosition()) {
                resultPoints = 0;
            } else if (clubId === IconClubId || clubId === HeroClubId) {
                resultPoints = 3;
            } else {
                const nationCount = nationCounts.get(nationId) || 0;
                const leagueCount = leagueCounts.get(leagueId) || 0;
                const clubCount = clubCounts.get(clubId) || 0;

                const nationPoints =
                    nationCount >= 10
                        ? 3
                        : nationCount >= 6
                        ? 2
                        : nationCount >= 3
                        ? 1
                        : 0;
                const leaguePoints =
                    leagueCount >= 10
                        ? 3
                        : leagueCount >= 6
                        ? 2
                        : leagueCount >= 3
                        ? 1
                        : 0;
                const clubPoints =
                    clubCount >= 9
                        ? 3
                        : clubCount >= 5
                        ? 2
                        : clubCount >= 2
                        ? 1
                        : 0;

                resultPoints = Math.min(
                    nationPoints + leaguePoints + clubPoints,
                    3
                );
            }
            playerChemistries.set(this.positions[i].player, resultPoints);
        }

        let result: ChemistryResult  = {
            combinedChemistry: 0,
            chem0Count: 0,
            chem1Count: 0,
            chem2Count: 0,
            chem3Count: 0,
            avgChemistry: 0,
            positionModifications: 0
        };
        playerChemistries.forEach((chem, player) => {
            result.combinedChemistry += chem;
            chem === 0 && result.chem0Count++;
            chem === 1 && result.chem1Count++;
            chem === 2 && result.chem2Count++;
            chem === 3 && result.chem3Count++;
            if (player.initialPrefPosition !== player.prefPosition) {
                result.positionModifications++;
            }
        });
        result.avgChemistry =
            result.combinedChemistry / playerChemistries.keys.length;

        return result;
    }

    public getPlayer(id: number){
        const player = this.players.find((player) => player.id === id);
        if (!player) {
            throw new Error(`Player with id '${id}' not found`);
        }
        return player;
    }

    private generateManager() {
        const nationOptions = Array.from(
            new Set(this.positions.map((position) => position.player.nationId))
        );
        const leagueOptions = Array.from(
            new Set(
                this.positions
                    .map((position) => position.player.leagueId)
                    .filter((leagueId) => leagueId !== IconLeagueId)
            )
        );
        return {
            nationId: choice(nationOptions),
            leagueId: choice(leagueOptions)
        };
    }

    // #region genetic algorithm

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
        for (let i = 0; i < this.positions.length; i++) {
            const currentPosition = this.positions[i];
            if (Math.random() < GAConfig.mutationRate) {
                // mutate pref position
                currentPosition.player.randomizePosition();
            }
            if (Math.random() < GAConfig.mutationRate) {
                // mutate player position (swap players with another node)
                let swapTarget = choice(
                    this.positions.filter(
                        (position) =>
                            position.nodePosition !==
                            currentPosition.nodePosition
                    )
                );
                const tempPlayer = currentPosition.player;
                currentPosition.player = swapTarget.player;
                swapTarget.player = tempPlayer;
            }
        }

        if(this.manager && Math.random() < GAConfig.mutationRate) {
            this.manager = this.generateManager();
        }
    }

    // #endregion
}
