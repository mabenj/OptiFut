import { FormationId } from "../../types/formation-id";
import { OptiPlayer } from "../OptiPlayer";
import { OptiPlayerNode } from "../OptiPlayerNode";
import { PositionValue } from "../types/position-value.enum";
import { Formation } from "./Formation";

export class Formation442 extends Formation {
    formationId: FormationId = "442";
    availablePositions: PositionValue[] = [
        PositionValue.ST,
        PositionValue.ST,
        PositionValue.LM,
        PositionValue.CM,
        PositionValue.CM,
        PositionValue.RM,
        PositionValue.LB,
        PositionValue.CB,
        PositionValue.CB,
        PositionValue.RB,
        PositionValue.GK
    ];

    /**
     *
     * @param squad Order: LST, RST, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(squad: OptiPlayer[], useManager: boolean) {
        const [LST, RST, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK] = squad;
        const LST_node = new OptiPlayerNode(LST, "LST");
        const RST_node = new OptiPlayerNode(RST, "RST");
        const LM_node = new OptiPlayerNode(LM, "LM");
        const LCM_node = new OptiPlayerNode(LCM, "LCM");
        const RCM_node = new OptiPlayerNode(RCM, "RCM");
        const RM_node = new OptiPlayerNode(RM, "RM");
        const LB_node = new OptiPlayerNode(LB, "LB");
        const LCB_node = new OptiPlayerNode(LCB, "LCB");
        const RCB_node = new OptiPlayerNode(RCB, "RCB");
        const RB_node = new OptiPlayerNode(RB, "RB");
        const GK_node = new OptiPlayerNode(GK, "GK");

        LST_node.setLinks([RST_node, LCM_node, LM_node]);
        RST_node.setLinks([LST_node, RM_node, RCM_node]);
        LM_node.setLinks([LST_node, LCM_node, LB_node]);
        LCM_node.setLinks([LST_node, RCM_node, LCB_node, LM_node]);
        RCM_node.setLinks([RST_node, RM_node, RCB_node, LCM_node]);
        RM_node.setLinks([RST_node, RB_node, RCM_node]);
        LB_node.setLinks([LM_node, LCB_node]);
        LCB_node.setLinks([LCM_node, RCB_node, GK_node, LB_node]);
        RCB_node.setLinks([RCM_node, RB_node, GK_node, LCB_node]);
        RB_node.setLinks([RM_node, RCB_node]);
        GK_node.setLinks([LCB_node, RCB_node]);

        super(
            [
                LST_node,
                RST_node,
                LM_node,
                LCM_node,
                RCM_node,
                RM_node,
                LB_node,
                LCB_node,
                RCB_node,
                RB_node,
                GK_node
            ],
            useManager
        );
    }

    createFormation(players: OptiPlayer[], useManager: boolean): Formation {
        return new Formation442(players, useManager);
    }
}
