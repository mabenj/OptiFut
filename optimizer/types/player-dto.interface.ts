import { Club } from "./club.interface";
import { League } from "./league.interface";
import { Nationality } from "./nationality.interface";
import { PositionTag } from "./position-tag.type";

export interface PlayerDto {
    name: string;
    nationality: Nationality;
    league: League;
    club: Club;
    facePosition: PositionTag;
    hasLoyalty: boolean;
}
