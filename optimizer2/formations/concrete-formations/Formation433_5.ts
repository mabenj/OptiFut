import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation433_5 extends Formation {
    public readonly formationId = "433_5";

    /**
     *
     * @param players Order: LW, RW, CF, CM, CM, CDM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "LW",
                "RW",
                "CF",
                "CM",
                "CM",
                "CDM",
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
        return new Formation433_5(players, useManager);
    }
}
