import { OptiPlayer } from "../OptiPlayer";

export interface ChemistryResult {
    totalChemistry: number;
    offChemPlayerIds: number[];
    positionModifications: { [playerId: number]: number };
}
