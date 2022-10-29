import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation4321 extends Formation {
    public readonly formationId = "4321";

    /**
     *
     * @param players Order: ST, CF, CF, CM, CM, CM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "CF",
                "CF",
                "CM",
                "CM",
                "CM",
                "LB",
                "CB",
                "CB",
                "RB",
                "GK"
            ]),
            useManager
        );
    }

    createFormation(players: PlayerEntity[], useManager: boolean) {
        return new Formation4321(players, useManager);
    }
}
