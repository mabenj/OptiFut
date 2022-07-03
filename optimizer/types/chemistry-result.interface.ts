import { Player } from "../players/Player";
import { PosModInfo } from "./pos-mod-info.interface";

export interface ChemistryResult {
    totalChemistry: number;
    offChemPlayers: Player[];
    posModdedPlayers: PosModInfo[];
}
