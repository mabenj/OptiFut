import { PlayerPosition } from "./player-position.type";
import { PlayerVersion } from "./player-version.type";

export interface PlayerInfo {
    name: string;
    version: PlayerVersion;
    hasLoyalty: boolean;
    position: PlayerPosition;
    nationId: number;
    leagueId: number;
    clubId: number;
    alternativePositions: PlayerPosition[];
}
