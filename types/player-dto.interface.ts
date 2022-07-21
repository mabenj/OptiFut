import { PlayerPosition } from "./player-position.type";
import { PlayerVersion } from "./player-version";

export interface PlayerDto {
    name: string;
    version: PlayerVersion;
    hasLoyalty: boolean;
    position: PlayerPosition;
    nationId: number;
    leagueId: number;
    clubId: number;
}
