import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation5212 extends Formation {
    public readonly formationId = "5212";

    /**
     *
     * @param players Order: ST, ST, CAM, CM, CM, LWB, CB, CB, CB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "CAM",
                "CM",
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
        return new Formation5212(players, useManager);
    }
}
