import Dexie, { Table } from "dexie";
import { PlayerInfo } from "../types/player-info.interface";
import { PlayerPosition } from "../types/player-position.type";
import { PlayerVersion } from "../types/player-version.type";
import { Log } from "./Log";

export interface Player {
    id: number;
    playerName: string;
    commonName: string;
    leagueId: number;
    nationId: number;
    clubId: number;
    preferredPosition: PlayerPosition;
    allPositions: PlayerPosition[];
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
    players: PlayerInfo[];
}

export class OptiFutDexie extends Dexie {
    players!: Table<Player>;
    nations!: Table<Nation>;
    leagues!: Table<League>;
    clubs!: Table<Club>;
    savedTeams!: Table<SavedTeam>;

    constructor() {
        super("optifutDb");
        this.version(4)
            .stores({
                players: "&id, playerName, commonName, rating",
                nations: "&id, displayName",
                leagues: "&id, displayName",
                clubs: "&id, displayName, leagueId",
                savedTeams: "++id, name"
            })
            .upgrade((tx) => {
                tx.table("players").clear();
                tx.table("nations").clear();
                tx.table("leagues").clear();
                tx.table("clubs").clear();
                tx.table("savedTeams").clear();
            });
        this.on("ready", (db) => populateTablesIfEmpty(db as OptiFutDexie));
    }
}

function populateTablesIfEmpty(db: OptiFutDexie) {
    db.players.count((count) => {
        if (count > 0) {
            Log.info("[players table already populated]");
            return;
        }
        Log.info("[players table is empty]");
        return new Promise<Player[]>((resolve) => {
            import("../data/players.min.json").then((module) =>
                resolve(
                    module.default.map(
                        (p) =>
                            ({
                                id: p.id,
                                playerName: p.playerName,
                                commonName: p.commonName,
                                leagueId: p.leagueId,
                                nationId: p.nationId,
                                clubId: p.clubId,
                                preferredPosition: p.position,
                                allPositions: p.allPositions,
                                version: p.version,
                                rating: p.rating
                            } as Player)
                    )
                )
            );
        }).then((players) => {
            Log.info("[populating players table]");
            db.players.bulkAdd(players);
        });
    });
    db.nations.count((count) => {
        if (count > 0) {
            Log.info("[nations table already populated]");
            return;
        }
        Log.info("[nations table is empty]");
        return new Promise<Nation[]>((resolve) => {
            import("../data/nations.min.json").then((module) =>
                resolve(module.default as Nation[])
            );
        }).then((nations) => {
            Log.info("[populating nations table]");
            db.nations.bulkAdd(nations);
        });
    });
    db.leagues.count((count) => {
        if (count > 0) {
            Log.info("[leagues table already populated]");
            return;
        }
        Log.info("[leagues table is empty]");
        return new Promise<League[]>((resolve) => {
            import("../data/leagues.min.json").then((module) =>
                resolve(module.default as League[])
            );
        }).then((leagues) => {
            Log.info("[populating leagues table]");
            db.leagues.bulkAdd(leagues);
        });
    });
    db.clubs.count((count) => {
        if (count > 0) {
            Log.info("[clubs table already populated]");
            return;
        }
        Log.info("[clubs table is empty]");
        return new Promise<Club[]>((resolve) => {
            import("../data/clubs.min.json").then((module) =>
                resolve(module.default as Club[])
            );
        }).then((clubs) => {
            Log.info("[populating clubs table]");
            db.clubs.bulkAdd(clubs);
        });
    });
}

export const db = new OptiFutDexie();
