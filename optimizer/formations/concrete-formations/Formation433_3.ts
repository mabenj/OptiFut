import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation433_3 extends Formation {
    public readonly formationId = "433_3";

    /**
     *
     * @param players Order: ST, LW, RW, CDM, CM, CDM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "LW",
                "RW",
                "CDM",
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
        return new Formation433_3(players, useManager);
    }
}
