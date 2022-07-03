import { Player } from "../players/Player";
import { Position } from "../types/position.interface";
import { POSITIONS } from "./positions";

const EMPTY_442: { position: Position; player: Player | null }[] = [
    { position: POSITIONS.ST, player: null },
    { position: POSITIONS.ST, player: null },
    { position: POSITIONS.LM, player: null },
    { position: POSITIONS.CM, player: null },
    { position: POSITIONS.CM, player: null },
    { position: POSITIONS.RM, player: null },
    { position: POSITIONS.LB, player: null },
    { position: POSITIONS.CB, player: null },
    { position: POSITIONS.CB, player: null },
    { position: POSITIONS.RB, player: null },
    { position: POSITIONS.GK, player: null }
];

const EMPTY_433: { position: Position; player: Player | null }[] = [
    { position: POSITIONS.LW, player: null },
    { position: POSITIONS.ST, player: null },
    { position: POSITIONS.RW, player: null },
    { position: POSITIONS.CM, player: null },
    { position: POSITIONS.CM, player: null },
    { position: POSITIONS.CM, player: null },
    { position: POSITIONS.LB, player: null },
    { position: POSITIONS.CB, player: null },
    { position: POSITIONS.CB, player: null },
    { position: POSITIONS.RB, player: null },
    { position: POSITIONS.GK, player: null }
];

export const EMPTY_FORMATIONS = {
    "4-4-2": EMPTY_442,
    "4-3-3": EMPTY_433
};
