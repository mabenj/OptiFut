import { FormationId } from "../../types/formation-id";
import { OptiPlayer } from "../OptiPlayer";
import { OptiPlayerNode } from "../OptiPlayerNode";
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
    constructor(squad: OptiPlayer[], useManager: boolean) {
        const [LW, ST, RW, LCM, CM, RCM, LB, LCB, RCB, RB, GK] = squad;
        const LW_links = [ST, LCM];
        const ST_links = [LW, RW, CM];
        const RW_links = [ST, RCM];
        const LCM_links = [LW, CM, LB];
        const CM_links = [LCM, ST, RCM, LCB, RCB];
        const RCM_links = [CM, RW, RB];
        const LB_links = [LCM, LCB];
        const LCB_links = [LB, CM, RCB, GK];
        const RCB_links = [LCB, CM, RB, GK];
        const RB_links = [RCB, RCM];
        const GK_links = [LCB, RCB];
        super(
            [
                new OptiPlayerNode(LW, LW_links, "LW"),
                new OptiPlayerNode(ST, ST_links, "ST"),
                new OptiPlayerNode(RW, RW_links, "RW"),
                new OptiPlayerNode(LCM, LCM_links, "LCM"),
                new OptiPlayerNode(CM, CM_links, "CM"),
                new OptiPlayerNode(RCM, RCM_links, "RCM"),
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
        return new Formation433(players, useManager);
    }
}
