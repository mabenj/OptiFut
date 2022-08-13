import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation532 extends Formation {
    formationId: FormationId = "532";

    /**
     *
     * @param players Order: LST, RST, LCM, CM, RCM, LWB, LCB, CB, RCB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CM", "LCM"],
            RST: ["RCM", "CM", "LST"],
            LCM: ["LST", "CM", "LCB", "LWB"],
            CM: ["RST", "RCM", "CB", "LCM", "LST"],
            RCM: ["RWB", "RCB", "CM", "RST"],
            LWB: ["LCM", "LCB"],
            LCB: ["CB", "GK", "LWB", "LCM"],
            CB: ["CM", "RCB", "GK", "LCB"],
            RCB: ["RCM", "RWB", "GK", "CB"],
            RWB: ["RCB", "RCM"],
            GK: ["LCB", "CB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation532(players, useManager);
    }
}
