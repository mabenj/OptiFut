import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { PositionValue } from "../types/position-value.enum";
import { Formation } from "./Formation";

export class Formation433 extends Formation {
    formationId: FormationId = "433";
    availablePositions: PositionValue[] = [
        PositionValue.LW,
        PositionValue.ST,
        PositionValue.RW,
        PositionValue.CM,
        PositionValue.CM,
        PositionValue.CM,
        PositionValue.LB,
        PositionValue.CB,
        PositionValue.CB,
        PositionValue.RB,
        PositionValue.GK
    ];

    /**
     *
     * @param squad Order: LW, ST, RW, LCM, CM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(squad: PlayerEntity[], useManager: boolean) {
        const [LW, ST, RW, LCM, CM, RCM, LB, LCB, RCB, RB, GK] = squad;
        const LW_node = new PositionNode(LW, "LW");
        const ST_node = new PositionNode(ST, "ST");
        const RW_node = new PositionNode(RW, "RW");
        const LCM_node = new PositionNode(LCM, "LCM");
        const CM_node = new PositionNode(CM, "CM");
        const RCM_node = new PositionNode(RCM, "RCM");
        const LB_node = new PositionNode(LB, "LB");
        const LCB_node = new PositionNode(LCB, "LCB");
        const RCB_node = new PositionNode(RCB, "RCB");
        const RB_node = new PositionNode(RB, "RB");
        const GK_node = new PositionNode(GK, "GK");

        LW_node.setLinks([ST_node, LCM_node]);
        ST_node.setLinks([LW_node, RW_node, CM_node]);
        RW_node.setLinks([ST_node, RCM_node]);
        LCM_node.setLinks([LW_node, CM_node, LB_node]);
        CM_node.setLinks([LCM_node, ST_node, RCM_node, LCB_node, RCB_node]);
        RCM_node.setLinks([CM_node, RW_node, RB_node]);
        LB_node.setLinks([LCM_node, LCB_node]);
        LCB_node.setLinks([LB_node, CM_node, RCB_node, GK_node]);
        RCB_node.setLinks([LCB_node, CM_node, RB_node, GK_node]);
        RB_node.setLinks([RCB_node, RCM_node]);
        GK_node.setLinks([LCB_node, RCB_node]);

        super(
            [
                LW_node,
                ST_node,
                RW_node,
                LCM_node,
                CM_node,
                RCM_node,
                LB_node,
                LCB_node,
                RCB_node,
                RB_node,
                GK_node
            ],
            useManager
        );
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation433(players, useManager);
    }
}
