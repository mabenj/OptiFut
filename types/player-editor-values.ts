import { PlayerPosition } from "./player-position.type";
import { PlayerVersion } from "./player-version";

export interface PlayerEditorValues {
    index: number;
    name: string;
    position: PlayerPosition;
    version: PlayerVersion;
    nationId: number | null;
    leagueId: number | null;
    clubId: number | null;
    hasLoyalty: boolean;
}
