import { FormationId } from "../../types/formation-id";
import { PositionNodeId } from "./position-node-id.type";

export interface FormationInfo {
    formationId: FormationId;
    players: {
        id: number;
        name: string;
        chemistry: number;
        originalPosition: string;
        newPosition: string;
        positionModificationsCount: number;
        positionNodeId: PositionNodeId;
        hasLoyalty: boolean;
    }[];
    teamChemistry: number;
    manager?: {
        nationalityId: number;
        leagueId: number;
    };
}
