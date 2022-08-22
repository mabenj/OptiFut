import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation541 extends Formation {
    public readonly formationId = "541";

    /**
     *
     * @param players Order: ST, LM, CM, CM, RM, LWB, CB, CB, CB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "LM",
                "CM",
                "CM",
                "RM",
                "LWB",
                "CB",
                "CB",
                "CB",
                "RWB",
                "GK"
            ]),
            useManager
        );
    }

    createFormation(players: PlayerEntity[], useManager: boolean) {
        return new Formation541(players, useManager);
    }
}
