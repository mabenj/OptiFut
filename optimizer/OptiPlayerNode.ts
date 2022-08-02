import { HeroClubId, IconClubId } from "../data/constants";
import { OptiPlayer } from "./OptiPlayer";
import { Manager } from "./types/manager.interface";
import { PositionId } from "./types/position-id.type";
import { PositionValue } from "./types/position-value.enum";

export class OptiPlayerNode {
    private readonly _links: OptiPlayer[];
    private readonly _positionInCard: PositionValue;
    public readonly positionInSquad: PositionId; //TODO: currently not used
    public player: OptiPlayer;

    constructor(
        player: OptiPlayer,
        links: OptiPlayer[],
        positionInCard: PositionValue,
        positionInSquad: PositionId
    ) {
        this.player = player;
        this._links = links;
        this._positionInCard = positionInCard;
        this.positionInSquad = positionInSquad;
    }

    calculateChemistry(manager?: Manager): number {
        const numberOfLinks = this._links.length;
        let linkSum = 0;
        for (let i = 0; i < this._links.length; i++) {
            const linkedPlayer = this._links[i];
            this.isSameNationality(linkedPlayer) && linkSum++;
            this.isSameLeague(linkedPlayer) && linkSum++;
            this.isSameClub(linkedPlayer) && linkSum++;
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
        return (
            this.player.currentFifaPosition.positionValue ===
            this._positionInCard
        );
    }

    private isInRelatedPosition() {
        return this.player.currentFifaPosition.relatedPositions.includes(
            this._positionInCard
        );
    }

    private isInUnrelatedPosition() {
        return this.player.currentFifaPosition.unrelatedPositions.includes(
            this._positionInCard
        );
    }

    private isSameNationality(other: OptiPlayer) {
        return this.player.nationalityId === other.nationalityId;
    }

    private isSameLeague(other: OptiPlayer) {
        const isIcon =
            this.player.clubId === IconClubId || other.clubId === IconClubId;
        return isIcon || this.player.leagueId === other.leagueId;
    }

    private isSameClub(other: OptiPlayer) {
        const isHero =
            this.player.clubId === HeroClubId || other.clubId === HeroClubId;
        if (isHero && this.player.leagueId === other.leagueId) {
            return true;
        }
        return this.player.clubId === other.clubId;
    }

    private managerMatches(manager: Manager) {
        return (
            this.player.leagueId === manager.leagueId ||
            this.player.nationalityId === manager.nationalityId
        );
    }
}
