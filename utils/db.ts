import Dexie, { Table } from "dexie";
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

export class OptiFutDexie extends Dexie {
    players!: Table<Player>;
    nations!: Table<Nation>;
    leagues!: Table<League>;
    clubs!: Table<Club>;

    constructor() {
        super("optifutDb");
        this.version(1).stores({
            players: "&id, playerName, commonName", // Primary key and indexed props
            nations: "&id, displayName",
            leagues: "&id, displayName",
            clubs: "&id, displayName, leagueId"
        });
        this.on("ready", (db) => populateTablesIfEmpty(db as OptiFutDexie));
    }
}

function populateTablesIfEmpty(db: OptiFutDexie) {
    db.players.count((count) => {
        if (count > 0) {
            console.log("players already populated");
            return;
        }
        console.log("player db is empty");
        return new Promise<Player[]>((resolve) => {
            import("../data/players.min.json").then((module) =>
                resolve(module.default as Player[])
            );
        }).then((players) => {
            console.log("adding players");
            db.players.bulkAdd(players);
        });
    });
    db.nations.count((count) => {
        if (count > 0) {
            console.log("nations already populated");
            return;
        }
        console.log("nation db is empty");
        return new Promise<Nation[]>((resolve) => {
            import("../data/nations.min.json").then((module) =>
                resolve(module.default as Nation[])
            );
        }).then((nations) => {
            console.log("adding nations");
            db.nations.bulkAdd(nations);
        });
    });
    db.leagues.count((count) => {
        if (count > 0) {
            console.log("leagues already populated");
            return;
        }
        console.log("league db is empty");
        return new Promise<League[]>((resolve) => {
            import("../data/leagues.min.json").then((module) =>
                resolve(module.default as League[])
            );
        }).then((leagues) => {
            console.log("adding leagues");
            db.leagues.bulkAdd(leagues);
        });
    });
    db.clubs.count((count) => {
        if (count > 0) {
            console.log("clubs already populated");
            return;
        }
        console.log("club db is empty");
        return new Promise<Club[]>((resolve) => {
            import("../data/clubs.min.json").then((module) =>
                resolve(module.default as Club[])
            );
        }).then((clubs) => {
            console.log("adding clubs");
            db.clubs.bulkAdd(clubs);
        });
    });
}

export const db = new OptiFutDexie();
