import { Formation433 } from "../formations/Formation433";
import { Formation442 } from "../formations/Formation442";
import { Player } from "../players/Player";
import { EMPTY_FORMATIONS } from "./emptyFormations";

export const FORMATIONS_BY_TAG = {
    "4-4-2": {
        blankFormation: EMPTY_FORMATIONS["4-4-2"],
        factory: (players: Player[], useManager: boolean) =>
            new Formation442(players, useManager)
    },
    "4-3-3": {
        blankFormation: EMPTY_FORMATIONS["4-3-3"],
        factory: (players: Player[], useManager: boolean) =>
            new Formation433(players, useManager)
    }
};
