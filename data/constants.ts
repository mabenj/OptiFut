import { FormationId } from "../types/formation-id";
import { PlayerEditorValues } from "../types/player-editor-values.interface";
import { PlayerPosition } from "../types/player-position.type";

export const PopularNationIds = [
    52, // argentina
    7, // belgium
    54, // brazil
    // 56, // colombia
    // 10, // croatia
    // 111, // egypt
    14, // england
    18, // france
    21, // germany
    27, // italy
    // 83, // mexico
    34, // Netherlands
    // 37, // Poland
    38, // Portugal
    45 // Spain
    // 60 // Uruguay
];

export const PopularLeagueIds = [
    19, // bundesliga
    // 10, // Eredivisie
    53, // laliga
    16, // ligue 1
    13, // premier league
    31 // serie a
];

export const HeroClubId = 114605;
export const IconClubId = 112658;
export const IconLeagueId = 2118;

export const SelectImageWidth = 30;
export const NationFlagRatio = 70 / 42;
export const LeagueIconRatio = 170 / 170;
export const ClubIconRatio = 140 / 140;

export const DefaultEditorValues: PlayerEditorValues = {
    name: "",
    prefPosition: "ST",
    altPositions: [],
    version: "other",
    nationId: null,
    leagueId: null,
    clubId: null
};

export const TeamPlayerCount = 11;

export const FormationOptions: { id: FormationId; displayName: string }[] = [
    { id: "3142", displayName: "3-1-4-2" },
    { id: "3412", displayName: "3-4-1-2" },
    { id: "3421", displayName: "3-4-2-1" },
    { id: "343", displayName: "3-4-3" },
    { id: "352", displayName: "3-5-2" },
    { id: "41212", displayName: "4-1-2-1-2" },
    { id: "41212_2", displayName: "4-1-2-1-2 (2)" },
    { id: "4132", displayName: "4-1-3-2" },
    { id: "4141", displayName: "4-1-4-1" },
    { id: "4222", displayName: "4-2-2-2" },
    { id: "4231", displayName: "4-2-3-1" },
    { id: "4231_2", displayName: "4-2-3-1 (2)" },
    { id: "424", displayName: "4-2-4" },
    { id: "4312", displayName: "4-3-1-2" },
    { id: "4321", displayName: "4-3-2-1" },
    { id: "433", displayName: "4-3-3" },
    { id: "433_2", displayName: "4-3-3 (2)" },
    { id: "433_3", displayName: "4-3-3 (3)" },
    { id: "433_4", displayName: "4-3-3 (4)" },
    { id: "433_5", displayName: "4-3-3 (5)" },
    { id: "4411", displayName: "4-4-1-1" },
    { id: "4411_2", displayName: "4-4-1-1 (2)" },
    { id: "442", displayName: "4-4-2" },
    { id: "442_2", displayName: "4-4-2 (2)" },
    { id: "451", displayName: "4-5-1" },
    { id: "451_2", displayName: "4-5-1 (2)" },
    { id: "5212", displayName: "5-2-1-2" },
    { id: "5221", displayName: "5-2-2-1" },
    { id: "5122", displayName: "5-1-2-2" },
    { id: "541", displayName: "5-4-1" }
];

export const DefaultSelectedFormations = FormationOptions.reduce(
    (acc, curr) => {
        acc[curr.id] = true;
        return acc;
    },
    {} as { [formationId in FormationId]: boolean }
);

export const PlayerPositions: PlayerPosition[] = [
    "ST",
    "CF",
    "CAM",
    "CM",
    "CDM",
    "LW",
    "LM",
    "RW",
    "RM",
    "LWB",
    "LB",
    "RWB",
    "RB",
    "CB",
    "GK"
];
