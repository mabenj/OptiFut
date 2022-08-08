import { PlayerInfo } from "../types/player-info.interface";
import { db } from "../utils/db";
import { useNextLiveQuery } from "./common/useNextLiveQuery";

export function useSavedTeam() {
    const savedTeams = useNextLiveQuery(() => db.savedTeams.toArray()) || [];

    const addSavedTeam = (team: { name: string; players: PlayerInfo[] }) => {
        return db.savedTeams.add({
            name: team.name,
            players: team.players
        });
    };

    const deleteSavedTeam = (teamId: number) => {
        return db.savedTeams.delete(teamId);
    };

    return { savedTeams, addSavedTeam, deleteSavedTeam };
}
