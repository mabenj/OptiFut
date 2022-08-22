import { PlayerPosition } from "./player-position.type";
import { PlayerVersion } from "./player-version.type";

export interface PlayerInfo {
    name: string;
    version: PlayerVersion;
    prefPosition: PlayerPosition;
    altPositions: PlayerPosition[];
    nationId: number;
    leagueId: number;
    clubId: number;
}
