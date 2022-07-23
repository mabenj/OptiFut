import { PlayerEditorValues } from "../types/player-editor-values";

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
    index: -1,
    name: "",
    position: "ST",
    version: "other",
    nationId: null,
    leagueId: null,
    clubId: null,
    hasLoyalty: true
};
