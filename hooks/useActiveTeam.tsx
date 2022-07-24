import { useToast } from "@chakra-ui/react";
import { PlayerDto } from "../types/player-dto.interface";
import { TeamDto } from "../types/team-dto.interface";
import { useLocalStorage } from "./useLocalStorage";

const TEAM_STORAGE_KEY = "OPTIFUT_CURRENT_TEAM";

export function useActiveTeam() {
    const [team, setTeam] = useLocalStorage<TeamDto>(TEAM_STORAGE_KEY, {
        name: "",
        players: [],
        useManager: true
    });
    const toast = useToast();

    const setPlayers = (
        players: PlayerDto[] | ((prevPlayers: PlayerDto[]) => PlayerDto[])
    ) => {
        const valueToStore =
            players instanceof Function ? players(team.players) : players;
        setTeam((prev) => ({ ...prev, players: valueToStore }));
    };

    const setShouldUseManager = (
        shouldUseManager: boolean | ((prevUseManager: boolean) => boolean)
    ) => {
        const valueToStore =
            shouldUseManager instanceof Function
                ? shouldUseManager(team.useManager)
                : shouldUseManager;
        setTeam((prev) => ({ ...prev, useManager: valueToStore }));
    };

    return {
        players: team.players || [],
        shouldUseManager: team.useManager,
        setPlayers,
        setShouldUseManager
    };
}
