import { FormationId } from "../../types/formation-id";
import { OptiPlayer } from "../OptiPlayer";
import { OptiPlayerNode } from "../OptiPlayerNode";
import { PositionValue } from "../types/face-position.enum";
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
                new OptiPlayerNode(LW, LW_links, PositionValue.LW, "LW"),
                new OptiPlayerNode(ST, ST_links, PositionValue.ST, "ST"),
                new OptiPlayerNode(RW, RW_links, PositionValue.RW, "RW"),
                new OptiPlayerNode(LCM, LCM_links, PositionValue.CM, "LCM"),
                new OptiPlayerNode(CM, CM_links, PositionValue.CM, "CM"),
                new OptiPlayerNode(RCM, RCM_links, PositionValue.CM, "RCM"),
                new OptiPlayerNode(LB, LB_links, PositionValue.LB, "LB"),
                new OptiPlayerNode(LCB, LCB_links, PositionValue.CB, "LCB"),
                new OptiPlayerNode(RCB, RCB_links, PositionValue.CB, "RCB"),
                new OptiPlayerNode(RB, RB_links, PositionValue.RB, "RB"),
                new OptiPlayerNode(GK, GK_links, PositionValue.GK, "GK")
            ],
            useManager
        );
    }

    createFormation(players: OptiPlayer[], useManager: boolean): Formation {
        return new Formation433(players, useManager);
    }
}
