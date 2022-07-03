import { Manager } from "./manager.interface";
import { PlayerDto } from "./player-dto.interface";
import { PositionTag } from "./position-tag.type";

export interface FormationDto {
    manager: Manager | undefined;
    positions: {
        positionTag: PositionTag;
        player: PlayerDto;
    }[];
    totalChemistry: number;
    offChemPlayers: PlayerDto[];
    posModdedPlayers: {
        count: number;
        player: PlayerDto;
    }[];
}
