import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const API_KEY = process.env.FUTDB_API_KEY || "";
const AXIOS_CONFIG = { headers: { "X-AUTH-TOKEN": API_KEY } };
const IMAGE_FOLDER = "../public/assets/img";
const DATA_FOLDER = "../data";
const HERO_RARITY = 72;
const ICON_RARITY = 84;
const DEFAULT_RARITIES = [
    0, // non-rare
    1, // rare
    // 12, // legend
    52, // sudamericana
    53, // libertadores
    HERO_RARITY, // FUT heroes
    ICON_RARITY // Icon
];

function main() {
    // downloadClubs();
    // downloadLeagues();
    // downloadNations();
    downloadPlayers();
    // console.log(players.length);
}

async function downloadPlayers() {
    const allPlayers: any[] = [];
    let numberOfPages = 0;
    let currentPage = 1;
    do {
        console.log("fetching page %i of %i", currentPage, numberOfPages);
        const { data } = await axios.get(
            `https://futdb.app/api/players?page=${currentPage}`,
            AXIOS_CONFIG
        );
        for (let i = 0; i < data.items.length; i++) {
            const player = data.items[i];
            if (
                !player.id ||
                !player.league ||
                !player.nation ||
                !player.club ||
                !player.position ||
                !isFinite(player.rating) ||
                !isFinite(player.rarity)
            ) {
                continue;
            }
            if (!DEFAULT_RARITIES.includes(player.rarity)) {
                continue;
            }
            allPlayers.push({
                id: player.id,
                playerName: player.name,
                commonName: player.common_name,
                leagueId: player.league,
                nationId: player.nation,
                clubId: player.club,
                position: player.position,
                version:
                    player.rarity === ICON_RARITY
                        ? "icon"
                        : player.rarity === HERO_RARITY
                        ? "hero"
                        : "other",
                rating: player.rating
            });
            // await downloadImage(
            //     `https://futdb.app/api/players/${player.id}/image`,
            //     `${IMAGE_FOLDER}/players/${player.id}.png`
            // );
        }
        numberOfPages = data.page_total;
        currentPage++;
    } while (currentPage <= numberOfPages);
    console.log("writing players.min.json");
    fs.writeFile(
        path.join(DATA_FOLDER, "players.min.json"),
        JSON.stringify(allPlayers),
        () => null
    );
}

async function downloadNations() {
    const allNations: any[] = [];
    let numberOfPages = 0;
    let currentPage = 1;
    do {
        console.log("fetching page ", currentPage);
        const { data } = await axios.get(
            `https://futdb.app/api/nations?page=${currentPage}`,
            AXIOS_CONFIG
        );
        for (let i = 0; i < data.items.length; i++) {
            const nation = data.items[i];
            if (!nation.id || !nation.name) {
                continue;
            }
            allNations.push({
                id: nation.id,
                displayName: nation.name
            });
            await downloadImage(
                `https://futdb.app/api/nations/${nation.id}/image`,
                `${IMAGE_FOLDER}/nations/${nation.id}.png`
            );
        }
        numberOfPages = data.page_total;
        currentPage++;
    } while (currentPage <= numberOfPages);
    console.log("writing nations.min.json");
    fs.writeFile(
        `${DATA_FOLDER}/nations.min.json`,
        JSON.stringify(allNations),
        () => null
    );
}

async function downloadLeagues() {
    const allLeagues: any[] = [];
    let numberOfPages = 0;
    let currentPage = 1;
    do {
        console.log("fetching page ", currentPage);
        const { data } = await axios.get(
            `https://futdb.app/api/leagues?page=${currentPage}`,
            AXIOS_CONFIG
        );
        for (let i = 0; i < data.items.length; i++) {
            const league = data.items[i];
            if (!league.id || !league.name) {
                continue;
            }
            allLeagues.push({
                id: league.id,
                displayName: league.name
            });
            await downloadImage(
                `https://futdb.app/api/leagues/${league.id}/image`,
                `${IMAGE_FOLDER}/leagues/${league.id}.png`
            );
        }
        numberOfPages = data.page_total;
        currentPage++;
    } while (currentPage <= numberOfPages);
    console.log("writing leagues.min.json");
    fs.writeFile(
        `${DATA_FOLDER}/leagues.min.json`,
        JSON.stringify(allLeagues),
        () => null
    );
}

async function downloadClubs() {
    const allClubs: any[] = [];
    let numberOfPages = 0;
    let currentPage = 1;
    do {
        console.log(`fetching page ${currentPage} of ${numberOfPages}`);
        const { data } = await axios.get(
            `https://futdb.app/api/clubs?page=${currentPage}`,
            AXIOS_CONFIG
        );
        for (let i = 0; i < data.items.length; i++) {
            const club = data.items[i];
            if (!club.id || !club.name) {
                continue;
            }
            allClubs.push({
                id: club.id,
                displayName: club.name,
                leagueId: club.league || null
            });
            await downloadImage(
                `https://futdb.app/api/clubs/${club.id}/image`,
                `${IMAGE_FOLDER}/clubs/${club.id}.png`
            );
        }
        numberOfPages = data.page_total;
        currentPage++;
    } while (currentPage <= numberOfPages);
    console.log("writing clubs.min.json");
    fs.writeFile(
        `${DATA_FOLDER}/clubs.min.json`,
        JSON.stringify(allClubs),
        () => null
    );
}

async function downloadImage(url: string, path: string) {
    const response = await axios({
        url,
        method: "GET",
        responseType: "arraybuffer",
        headers: { "X-AUTH-TOKEN": API_KEY }
    });
    fs.writeFile(path, Buffer.from(response.data, "binary"), () => null);
}

main();
