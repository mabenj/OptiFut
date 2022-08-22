import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation532 extends Formation {
    public readonly formationId = "532";

    /**
     *
     * @param players Order: ST, ST, CM, CM, CM, LWB, CB, CB, CB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "CM",
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
        return new Formation532(players, useManager);
    }
}
