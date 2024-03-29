import { HeroClubId, IconClubId } from "../data/constants";
import { PlayerEntity } from "./PlayerEntity";
import { Manager } from "./types/manager.interface";
import { NodeLinkMap } from "./types/node-link-map.type";
import { PositionNodeId } from "./types/position-node-id.type";
import { PositionValue } from "./types/position-value.enum";

export class PositionNode {
    private links: PositionNode[];
    public readonly naturalPosition: PositionValue;
    public readonly nodeId: PositionNodeId;
    public player: PlayerEntity;

    constructor(player: PlayerEntity, nodeId: PositionNodeId) {
        this.player = player;
        this.nodeId = nodeId;
        this.naturalPosition = PositionValue.fromNodeId(nodeId);
        this.links = [];
    }

    public static createForFormation(
        players: PlayerEntity[],
        linksByNodeId: NodeLinkMap
    ): PositionNode[] {
        const nodeIds = Object.keys(linksByNodeId) as PositionNodeId[];
        const nodes: PositionNode[] = [];
        for (let i = 0; i < nodeIds.length; i++) {
            nodes.push(new PositionNode(players[i], nodeIds[i]));
        }
        for (let i = 0; i < nodes.length; i++) {
            const currentNode = nodes[i];
            const links = linksByNodeId[currentNode.nodeId]?.map((linkId) => {
                const linkedNode = nodes.find((n) => n.nodeId === linkId);
                if (!linkedNode) {
                    throw new Error(`Linked node not found (linkId ${linkId})`);
                }
                return linkedNode;
            });
            if (!links) {
                throw new Error("Could not resolve node links");
            }
            currentNode.setLinks(links);
        }
        return nodes;
    }

    public setLinks(links: PositionNode[]) {
        this.links = links;
    }

    public calculateChemistry(manager?: Manager): number {
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
        return this.player.currentPosition === this.naturalPosition;
    }

    private isInRelatedPosition() {
        return this.player.relatedPositions.includes(this.naturalPosition);
    }

    private isInUnrelatedPosition() {
        return this.player.unrelatedPositions.includes(this.naturalPosition);
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
