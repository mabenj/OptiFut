export interface ChemistryResult {
    combinedChemistry: number;
    chem0Count: number;
    chem1Count: number;
    chem2Count: number;
    chem3Count: number;
    avgChemistry: number;
    positionModifications: number;
    playerChemistries: { [playerId: number]: number };
    leagueCounts: { id: number; count: number }[];
    clubCounts: { id: number; count: number }[];
    nationCounts: { id: number; count: number }[];
}
