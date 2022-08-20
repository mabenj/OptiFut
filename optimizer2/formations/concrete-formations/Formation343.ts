import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation343 extends Formation {
    public readonly formationId = "343";

    /**
     *
     * @param players Order: LW, ST, RW, LM, CM, CM, RM, CB, CB, CB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "LW",
                "ST",
                "RW",
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
        return new Formation343(players, useManager);
    }
}
