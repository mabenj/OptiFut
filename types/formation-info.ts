import { FormationId } from "./formation-id";
import { Manager } from "./manager";
import { PlayerPosition } from "./player-position.type";

export interface FormationInfo {
    formationId: FormationId;
    players: {
        id: number;
        name: string;
        chemistry: number;
        initialPrefPosition: PlayerPosition;
        newPrefPosition: PlayerPosition;
        positionInFormation: PlayerPosition;
    }[];
    combinedChemistry: number;
    positionModifications: number;
    manager?: Manager;
}
