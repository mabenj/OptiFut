import { Player } from "../players/Player";
import { PlayerNode } from "../players/PlayerNode";
import { PositionIdentifier as PosId } from "../types/position-identifier.enum";
import { AbstractFormation } from "./AbstractFormation";

export class Formation433 extends AbstractFormation<Formation433> {
    public name: string;

    /**
     *
     * @param squad Order: LW, ST, RW, LCM, CM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(squad: Player[], generateManager: boolean) {
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
                new PlayerNode(LW, LW_links, PosId.LW, "LW"),
                new PlayerNode(ST, ST_links, PosId.ST, "ST"),
                new PlayerNode(RW, RW_links, PosId.RW, "RW"),
                new PlayerNode(LCM, LCM_links, PosId.CM, "LCM"),
                new PlayerNode(CM, CM_links, PosId.CM, "CM"),
                new PlayerNode(RCM, RCM_links, PosId.CM, "RCM"),
                new PlayerNode(LB, LB_links, PosId.LB, "LB"),
                new PlayerNode(LCB, LCB_links, PosId.CB, "LCB"),
                new PlayerNode(RCB, RCB_links, PosId.CB, "RCB"),
                new PlayerNode(RB, RB_links, PosId.RB, "RB"),
                new PlayerNode(GK, GK_links, PosId.GK, "GK")
            ],
            generateManager
        );
        this.name = "4-3-3";
    }

    mateWith(
        mate: Formation433,
        mutationRate: number,
        crossoverRate: number
    ): [child1: Formation433, child2: Formation433] {
        return this.mateWithImpl(
            mate,
            mutationRate,
            crossoverRate,
            (players, generateManager) =>
                new Formation433(players, generateManager)
        );
    }
}
