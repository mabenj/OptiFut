import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation5212 extends Formation {
    formationId: FormationId = "5212";

    /**
     *
     * @param players Order: LST, RST, CAM, LCM, RCM, LWB, LCB, CB, RCB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CAM", "LCM"],
            RST: ["RCM", "CAM", "LST"],
            CAM: ["RST", "RCM", "LCM", "LST"],
            LCM: ["LST", "CAM", "RCM", "CB", "LWB"],
            RCM: ["RST", "RWB", "CB", "LCM", "CAM"],
            LWB: ["LCM", "LCB"],
            LCB: ["CB", "GK", "LWB"],
            CB: ["RCM", "RCB", "GK", "LCB", "LCM"],
            RCB: ["RWB", "GK", "CB"],
            RWB: ["RCB", "RCM"],
            GK: ["LCB", "CB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation5212(players, useManager);
    }
}
