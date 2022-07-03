import { League } from "./league.interface";
import { Nationality } from "./nationality.interface";

export interface Manager {
    nationality: Nationality;
    league: League;
}
