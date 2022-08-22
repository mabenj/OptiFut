import { ChemistryResult } from "./chemistry-result";
import { FormationId } from "./formation-id";
import { Manager } from "./manager";
import { PlayerPosition } from "./player-position.type";

export interface FormationInfo {
    formationId: FormationId;
    chemistry: ChemistryResult;
    players: {
        id: number;
        name: string;
        chemistry: number;
        initialPrefPosition: PlayerPosition;
        newPrefPosition: PlayerPosition;
        positionInFormation: PlayerPosition;
    }[];
    manager?: Manager;
}
