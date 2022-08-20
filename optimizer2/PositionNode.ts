import { PlayerPosition } from "../types/player-position.type";
import { PlayerEntity } from "./PlayerEntity";

export class PositionNode {
    public readonly nodePosition: PlayerPosition;
    public player: PlayerEntity;

    constructor(player: PlayerEntity, position: PlayerPosition) {
        this.player = player;
        this.nodePosition = position;
    }

    public static createForFormation(
        players: PlayerEntity[],
        positions: PlayerPosition[]
    ) {
        if (players.length !== positions.length) {
            throw new Error("Players and positions must have the same length");
        }
        const result: PositionNode[] = [];
        for (let i = 0; i < positions.length; i++) {
            result.push(new PositionNode(players[i], positions[i]));
        }
        return result;
    }

    public isOutOfPosition() {
        return this.player.prefPosition !== this.nodePosition;
    }
}
