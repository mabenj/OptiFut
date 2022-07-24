import Dexie, { Table } from "dexie";
import { PlayerDto } from "../types/player-dto.interface";
import { PlayerPosition } from "../types/player-position.type";
import { PlayerVersion } from "../types/player-version";

export interface Player {
    id: number;
    playerName: string;
    commonName: string;
    leagueId: number;
    nationId: number;
    clubId: number;
    position: PlayerPosition;
    version: PlayerVersion;
    rating: number;
}

export interface Nation {
    id: number;
    displayName: string;
}

export interface League {
    id: number;
    displayName: string;
}

export interface Club {
    id: number;
    displayName: string;
    leagueId: number | null;
}

export interface SavedTeam {
    id?: number;
    name: string;
    players: PlayerDto[];
}

export class OptiFutDexie extends Dexie {
    players!: Table<Player>;
    nations!: Table<Nation>;
    leagues!: Table<League>;
    clubs!: Table<Club>;
    savedTeams!: Table<SavedTeam>;

    constructor() {
        super("optifutDb");
        this.version(1).stores({
            players: "&id, playerName, commonName, rating", // Primary key and indexed props
            nations: "&id, displayName",
            leagues: "&id, displayName",
            clubs: "&id, displayName, leagueId",
            savedTeams: "++id, name"
        });
        this.on("ready", (db) => populateTablesIfEmpty(db as OptiFutDexie));
    }
}

function populateTablesIfEmpty(db: OptiFutDexie) {
    db.players.count((count) => {
        if (count > 0) {
            console.log("[players table already populated]");
            return;
        }
        console.log("[players table is empty]");
        return new Promise<Player[]>((resolve) => {
            import("../data/players.min.json").then((module) =>
                resolve(module.default as Player[])
            );
        }).then((players) => {
            console.log("[populating players table]");
            db.players.bulkAdd(players);
        });
    });
    db.nations.count((count) => {
        if (count > 0) {
            console.log("[nations table already populated]");
            return;
        }
        console.log("[nations table is empty]");
        return new Promise<Nation[]>((resolve) => {
            import("../data/nations.min.json").then((module) =>
                resolve(module.default as Nation[])
            );
        }).then((nations) => {
            console.log("[populating nations table]");
            db.nations.bulkAdd(nations);
        });
    });
    db.leagues.count((count) => {
        if (count > 0) {
            console.log("[leagues table already populated]");
            return;
        }
        console.log("[leagues table is empty]");
        return new Promise<League[]>((resolve) => {
            import("../data/leagues.min.json").then((module) =>
                resolve(module.default as League[])
            );
        }).then((leagues) => {
            console.log("[populating leagues table]");
            db.leagues.bulkAdd(leagues);
        });
    });
    db.clubs.count((count) => {
        if (count > 0) {
            console.log("[clubs table already populated]");
            return;
        }
        console.log("[clubs table is empty]");
        return new Promise<Club[]>((resolve) => {
            import("../data/clubs.min.json").then((module) =>
                resolve(module.default as Club[])
            );
        }).then((clubs) => {
            console.log("[populating clubs table]");
            db.clubs.bulkAdd(clubs);
        });
    });
}

export const db = new OptiFutDexie();
