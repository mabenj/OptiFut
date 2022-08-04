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
        const LST_links = [RST, LCM, LM];
        const RST_links = [LST, RM, RCM];
        const LM_links = [LST, LCM, LB];
        const LCM_links = [LST, RCM, LCB, LM];
        const RCM_links = [RST, RM, RCB, LCM];
        const RM_links = [RST, RB, RCM];
        const LB_links = [LM, LCB];
        const LCB_links = [LCM, RCB, GK, LB];
        const RCB_links = [RCM, RB, GK, LCB];
        const RB_links = [RM, RCB];
        const GK_links = [LCB, RCB];
        super(
            [
                new OptiPlayerNode(LST, LST_links, "LST"),
                new OptiPlayerNode(RST, RST_links, "RST"),
                new OptiPlayerNode(LM, LM_links, "LM"),
                new OptiPlayerNode(LCM, LCM_links, "LCM"),
                new OptiPlayerNode(RCM, RCM_links, "RCM"),
                new OptiPlayerNode(RM, RM_links, "RM"),
                new OptiPlayerNode(LB, LB_links, "LB"),
                new OptiPlayerNode(LCB, LCB_links, "LCB"),
                new OptiPlayerNode(RCB, RCB_links, "RCB"),
                new OptiPlayerNode(RB, RB_links, "RB"),
                new OptiPlayerNode(GK, GK_links, "GK")
            ],
            useManager
        );
    }

    createFormation(players: OptiPlayer[], useManager: boolean): Formation {
        return new Formation442(players, useManager);
    }
}
