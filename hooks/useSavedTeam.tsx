import { PlayerDto } from "../types/player-dto.interface";
import { db } from "../utils/db";
import { useNextLiveQuery } from "./useNextLiveQuery";

export function useSavedTeam() {
    const savedTeams = useNextLiveQuery(() => db.savedTeams.toArray()) || [];

    const addSavedTeam = (team: { name: string; players: PlayerDto[] }) => {
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
