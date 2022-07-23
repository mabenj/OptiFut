import { TeamDto } from "../types/team-dto.interface";
import { db } from "../utils/db";
import { useNextLiveQuery } from "./useNextLiveQuery";

export function useSavedTeam() {
    const savedTeams = useNextLiveQuery(() => db.savedTeams.toArray()) || [];

    const addSavedTeam = (team: TeamDto) => {
        db.savedTeams.add({
            name: team.name,
            players: team.players,
            useManager: team.useManager
        });
    };

    return { savedTeams, addSavedTeam };
}
