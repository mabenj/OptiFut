import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation5221 extends Formation {
    public readonly formationId = "5221";

    /**
     *
     * @param players Order: ST, LW, RW, CM, CM, LWB, CB, CB, CB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "LW",
                "RW",
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
        return new Formation5221(players, useManager);
    }
}
