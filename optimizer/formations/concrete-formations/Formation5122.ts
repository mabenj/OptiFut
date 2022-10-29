import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation5122 extends Formation {
    public readonly formationId = "5122";

    /**
     *
     * @param players Order: ST, ST, CM, CDM, CM, LWB, CB, CB, CB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "CM",
                "CDM",
                "CM",
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
        return new Formation5122(players, useManager);
    }
}
