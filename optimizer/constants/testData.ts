import { League } from "../types/league.interface";
import { Nationality } from "../types/nationality.interface";

export const NATIONALITIES = {
    Brazil: {
        displayName: "Brazil",
        id: 27
    },
    Spain: {
        displayName: "Spain",
        id: 176
    },
    England: {
        displayName: "England",
        id: 62
    },
    France: {
        displayName: "France",
        id: 72
    },
    Italy: {
        displayName: "Italy",
        id: 98
    },
    Argentina: {
        displayName: "Argentina",
        id: 8
    },
    Germany: {
        displayName: "Germany",
        id: 76
    },
    Netherlands: {
        displayName: "Netherlands",
        id: 137
    },
    Portugal: {
        displayName: "Portugal",
        id: 154
    },
    Belgium: {
        displayName: "Belgium",
        id: 19
    },
    Colombia: {
        displayName: "Colombia",
        id: 43
    },
    Uruguay: {
        displayName: "Uruguay",
        id: 204
    }
};

export const LEAGUES = {
    England1: {
        displayName: "Premier League",
        id: 37
    },
    Spain1: {
        displayName: "LaLiga",
        id: 23
    },
    Italy1: {
        displayName: "Serie A",
        id: 43
    },
    Germany1: {
        displayName: "Bundesliga",
        id: 6
    },
    France1: {
        displayName: "Ligue 1",
        id: 29
    },
    Icons: {
        displayName: "Icons",
        id: 19
    }
};

export const CLUBS = {
    BayernMunich: {
        displayName: "Bayern Munich",
        id: 189,
        leagueId22: LEAGUES.Germany1.id
    },
    PSG: {
        displayName: "Paris Saint Germain",
        altNames: ["PSG"],
        id: 426,
        leagueId22: LEAGUES.France1.id
    },
    ManCity: {
        displayName: "Manchester City",
        id: 362,
        leagueId22: LEAGUES.England1.id
    },
    ManUnited: {
        displayName: "Manchester United",
        altNames: ["MANU"],
        id: 363,
        leagueId22: LEAGUES.England1.id
    },
    Liverpool: {
        displayName: "Liverpool",
        id: 352,
        leagueId22: LEAGUES.England1.id
    },
    RealMadrid: {
        displayName: "Real Madrid",
        id: 473,
        leagueId22: LEAGUES.Spain1.id
    },
    Chelsea: {
        displayName: "Chelsea",
        id: 128,
        leagueId22: LEAGUES.England1.id
    },
    AtleticoMadrid: {
        displayName: "Atletico Madrid",
        id: 64,
        leagueId22: LEAGUES.Spain1.id
    },
    Juventus: {
        displayName: "Juventus",
        altNames: ["Piemonte Calcio"],
        id: 436,
        leagueId22: LEAGUES.Italy1.id
    },
    Barcelona: {
        displayName: "Barcelona",
        altNames: ["Barca"],
        id: 187,
        leagueId22: LEAGUES.Spain1.id
    },
    Icons: {
        displayName: "Icons",
        altNames: ["Legends"],
        id: 229,
        leagueId22: LEAGUES.Icons.id
    },
    Hero: {
        displayName: "Heroes",
        id: 12,
        leagueId22: -1
    }
};
