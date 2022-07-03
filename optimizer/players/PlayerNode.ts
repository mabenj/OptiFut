import { CLUBS } from "../constants/testData";
import { Manager } from "../types/manager.interface";
import { PositionIdentifier } from "../types/position-identifier.enum";
import { PositionTag } from "../types/position-tag.type";
import { Player } from "./Player";

const ICON_CLUB_ID = CLUBS.Icons.id;
const HERO_CLUB_ID = CLUBS.Hero.id;

export class PlayerNode {
    private links: Player[];
    private squadPosition: PositionIdentifier;
    public player: Player;
    public tag: PositionTag;

    constructor(
        player: Player,
        links: Player[],
        squadPos: PositionIdentifier,
        posTag: PositionTag
    ) {
        this.player = player;
        this.links = links;
        this.squadPosition = squadPos;
        this.tag = posTag;
    }

    calculateChemistry(manager?: Manager): number {
        const numberOfLinks = this.links.length;
        let linkSum = 0;
        this.links.forEach((linkedPlayer) => {
            this.isSameNationality(linkedPlayer) && linkSum++;
            this.isSameLeague(linkedPlayer) && linkSum++;
            this.isSameClub(linkedPlayer) && linkSum++;
        });
        const linkIntensity = linkSum / numberOfLinks;

        let result = 0;
        result += this.player.loyaltyBonus ? 1 : 0;
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
        return this.player.facePosition.naturalPosition === this.squadPosition;
    }

    private isInRelatedPosition() {
        return this.player.facePosition.relatedPositions.includes(
            this.squadPosition
        );
    }

    private isInUnrelatedPosition() {
        return this.player.facePosition.unrelatedPositions.includes(
            this.squadPosition
        );
    }

    private isSameNationality(other: Player) {
        return this.player.nationality.id === other.nationality.id;
    }

    private isSameLeague(other: Player) {
        const isIcon =
            this.player.club.id === ICON_CLUB_ID ||
            other.club.id === ICON_CLUB_ID;
        return isIcon || this.player.league.id === other.league.id;
    }

    private isSameClub(other: Player) {
        const isHero =
            this.player.club.id === HERO_CLUB_ID ||
            other.club.id === HERO_CLUB_ID;
        if (isHero && this.player.league.id === other.league.id) {
            return true;
        }
        return this.player.club.id === other.club.id;
    }

    private managerMatches(manager: Manager) {
        return (
            this.player.league.id === manager.league.id ||
            this.player.nationality.id === manager.nationality.id
        );
    }
}
