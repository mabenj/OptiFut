import { PlayerDto } from "./player-dto.interface";

export interface TeamDto {
    name: string;
    players: PlayerDto[];
    useManager: boolean;
}
