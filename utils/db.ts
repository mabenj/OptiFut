import Dexie, { Table } from "dexie";
import Clubs from "../data/clubs.min.json";
import Leagues from "../data/leagues.min.json";
import Nations from "../data/nations.min.json";
import { PlayerPosition } from "../types/player-position.type";

interface Player {
    id: number;
    playerName: string;
    commonName: string;
    leagueId: number;
    nationId: number;
    clubId: number;
    position: PlayerPosition;
}

interface Nation {
    id: number;
    displayName: string;
}

interface League {
    id: number;
    displayName: string;
}

interface Club {
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

        this.on("populate", this.PrePopulateDatabase);
    }

    private async PrePopulateDatabase() {
        console.log("Populating players");
        import("../data/players.min.json").then((module) => {
            const playersJson = module.default;
            console.log("players: ", playersJson.length);
            db.players.bulkAdd(
                playersJson.map((player) => ({
                    id: player.id,
                    playerName: player.playerName,
                    commonName: player.commonName,
                    position: player.position as PlayerPosition,
                    nationId: player.nationId,
                    leagueId: player.leagueId,
                    clubId: player.clubId
                }))
            );
        });

        console.log("Populating nations");
        db.nations.bulkAdd(Nations);

        console.log("Populating leagues");
        db.leagues.bulkAdd(Leagues);

        console.log("Populating clubs");
        db.clubs.bulkAdd(Clubs);
    }
}

export const db = new OptiFutDexie();
