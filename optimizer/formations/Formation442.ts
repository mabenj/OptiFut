import { Player } from "../players/Player";
import { PlayerNode } from "../players/PlayerNode";
import { PositionIdentifier as PosId } from "../types/position-identifier.enum";
import { AbstractFormation } from "./AbstractFormation";

interface Squad442 {
    LST: Player;
    RST: Player;
    LM: Player;
    LCM: Player;
    RCM: Player;
    RM: Player;
    LB: Player;
    LCB: Player;
    RCB: Player;
    RB: Player;
    GK: Player;
}

export class Formation442 extends AbstractFormation<Formation442> {
    public name: string;

    /**
     *
     * @param squad Order: LST, RST, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(squad: Player[], generateManager: boolean) {
        const [LST, RST, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK] = squad;
        const LST_links = [RST, LM, LCM];
        const RST_links = [LST, RCM, RM];
        const LM_links = [LST, LCM, LB];
        const LCM_links = [LM, LST, RCM, LCB];
        const RCM_links = [LCM, RST, RM, RCB];
        const RM_links = [RCM, RST, RB];
        const LB_links = [LM, LCB];
        const LCB_links = [LB, LCM, RCB, GK];
        const RCB_links = [LCB, RCM, RB, GK];
        const RB_links = [RCB, RM];
        const GK_links = [LCB, RCB];
        super(
            [
                new PlayerNode(LST, LST_links, PosId.ST, "LST"),
                new PlayerNode(RST, RST_links, PosId.ST, "RST"),
                new PlayerNode(LM, LM_links, PosId.LM, "LM"),
                new PlayerNode(LCM, LCM_links, PosId.CM, "LCM"),
                new PlayerNode(RCM, RCM_links, PosId.CM, "RCM"),
                new PlayerNode(RM, RM_links, PosId.RM, "RM"),
                new PlayerNode(LB, LB_links, PosId.LB, "LB"),
                new PlayerNode(LCB, LCB_links, PosId.CB, "LCB"),
                new PlayerNode(RCB, RCB_links, PosId.CB, "RCB"),
                new PlayerNode(RB, RB_links, PosId.RB, "RB"),
                new PlayerNode(GK, GK_links, PosId.GK, "GK")
            ],
            generateManager
        );
        this.name = "4-4-2";
    }

    mateWith(
        mate: Formation442,
        mutationRate: number,
        crossoverRate: number
    ): [child1: Formation442, child2: Formation442] {
        return this.mateWithImpl(
            mate,
            mutationRate,
            crossoverRate,
            (players, generateManager) =>
                new Formation442(players, generateManager)
        );
    }
}
