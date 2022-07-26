import { PlayerPosition } from "./player-position.type";
import { PlayerVersion } from "./player-version.type";

export interface PlayerEditorValues {
    name: string;
    position: PlayerPosition;
    version: PlayerVersion;
    nationId: number | null;
    leagueId: number | null;
    clubId: number | null;
    hasLoyalty: boolean;
}
