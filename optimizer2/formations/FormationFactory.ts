import { FormationId } from "../../types/formation-id";
import { PlayerPosition } from "../../types/player-position.type";
import { PlayerEntity } from "../PlayerEntity";
import { Formation } from "./Formation";
import { Formation442 } from "./Formation442";

export class FormationFactory {
    /**
     * Returns an array of available positions for the given formation in the same order as the formation's constructor expects them to be.
     * @param formation formation to create
     */
    public static getAvailablePositions(
        formation: FormationId
    ): PlayerPosition[] {
        return []; //TODO
    }

    public static createFormation(
        formationId: FormationId,
        players: PlayerEntity[],
        useManager: boolean
    ): Formation {
        //TODO
        return new Formation442(players, useManager);
    }
}