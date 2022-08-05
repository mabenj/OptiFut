import { HeroClubId, IconClubId } from "../data/constants";
import { PlayerEntity } from "./PlayerEntity";
import { Manager } from "./types/manager.interface";
import { PositionNodeId } from "./types/position-node-id.type";
import { PositionValue } from "./types/position-value.enum";

export class PositionNode {
    private links: PositionNode[];
    private readonly positionValue: PositionValue;
    public readonly nodeId: PositionNodeId;
    public player: PlayerEntity;

    constructor(player: PlayerEntity, nodeId: PositionNodeId) {
        this.player = player;
        this.nodeId = nodeId;
        this.positionValue = PositionValue.fromNodeId(nodeId);
        this.links = [];
    }

    public setLinks(links: PositionNode[]) {
        this.links = links;
    }

    calculateChemistry(manager?: Manager): number {
        const numberOfLinks = this.links.length;
        let linkSum = 0;
        for (let i = 0; i < numberOfLinks; i++) {
            const linkedNode = this.links[i];
            this.isSameNationality(linkedNode) && linkSum++;
            this.isSameLeague(linkedNode) && linkSum++;
            this.isSameClub(linkedNode) && linkSum++;
        }
        const linkIntensity = linkSum / numberOfLinks;

        let result = 0;
        result += this.player.hasLoyalty ? 1 : 0;
        result += manager && this.managerMatches(manager) ? 1 : 0;
        if (linkIntensity < 0.3) {
            result += this.isInNaturalPosition()
                ? 3
                : this.isInRelatedPosition()
                ? 2
                : this.isInUnrelatedPosition()
                ? 1
                : 0;
        } else if (linkIntensity < 1) {
            result += this.isInNaturalPosition()
                ? 6
                : this.isInRelatedPosition()
                ? 5
                : this.isInUnrelatedPosition()
                ? 3
                : 1;
        } else if (linkIntensity <= 1.6) {
            result += this.isInNaturalPosition()
                ? 9
                : this.isInRelatedPosition()
                ? 8
                : this.isInUnrelatedPosition()
                ? 5
                : 2;
        } else {
            result += this.isInNaturalPosition()
                ? 10
                : this.isInRelatedPosition()
                ? 9
                : this.isInUnrelatedPosition()
                ? 5
                : 2;
        }

        return Math.min(result, 10);
    }

    private isInNaturalPosition() {
        return this.player.currentPosition === this.positionValue;
    }

    private isInRelatedPosition() {
        return this.player.relatedPositions.includes(this.positionValue);
    }

    private isInUnrelatedPosition() {
        return this.player.unrelatedPositions.includes(this.positionValue);
    }

    private isSameNationality(other: PositionNode) {
        return this.player.nationalityId === other.player.nationalityId;
    }

    private isSameLeague(other: PositionNode) {
        const isIcon =
            this.player.clubId === IconClubId ||
            other.player.clubId === IconClubId;
        return isIcon || this.player.leagueId === other.player.leagueId;
    }

    private isSameClub(other: PositionNode) {
        const isHero =
            this.player.clubId === HeroClubId ||
            other.player.clubId === HeroClubId;
        if (isHero && this.player.leagueId === other.player.leagueId) {
            return true;
        }
        return this.player.clubId === other.player.clubId;
    }

    private managerMatches(manager: Manager) {
        return (
            this.player.leagueId === manager.leagueId ||
            this.player.nationalityId === manager.nationalityId
        );
    }
}
