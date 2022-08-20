import { ChemistryResult } from "../../types/chemistry-result";
import { FormationId } from "../../types/formation-id";
import { Manager } from "../../types/manager";
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
        isOffChem: boolean;
    }[];
    chemistry: ChemistryResult;
    manager?: Manager;
}
