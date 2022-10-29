import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation3421 extends Formation {
    public readonly formationId = "3421";

    /**
     *
     * @param players Order: CF, ST, CF, LM, CM, CM, RM, CB, CB, CB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "CF",
                "ST",
                "CF",
                "LM",
                "CM",
                "CM",
                "RM",
                "CB",
                "CB",
                "CB",
                "GK"
            ]),
            useManager
        );
    }

    createFormation(players: PlayerEntity[], useManager: boolean) {
        return new Formation3421(players, useManager);
    }
}
