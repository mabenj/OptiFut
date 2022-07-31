import { useEffect } from "react";
import { TeamPlayerCount } from "../data/constants";
import { PlayerDto } from "../types/player-dto.interface";
import { useLocalStorage } from "./useLocalStorage";

const TEAM_STORAGE_KEY = "OPTIFUT_CURRENT_TEAM";
const DEFAULT_TEAM = new Array(TeamPlayerCount).fill(
    null
) as (PlayerDto | null)[];

interface Team {
    shouldUseManager: boolean;
    players: (PlayerDto | null)[];
}

export function useActiveTeam() {
    const [team, setTeam] = useLocalStorage<Team>(TEAM_STORAGE_KEY, {
        players: DEFAULT_TEAM,
        shouldUseManager: true
    });

    useEffect(() => {
        if (team.players?.length !== TeamPlayerCount) {
            setTeam((prev) => ({ ...prev, players: DEFAULT_TEAM }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [team]);

    const setPlayers = (
        players:
            | (PlayerDto | null)[]
            | ((prevPlayers: (PlayerDto | null)[]) => (PlayerDto | null)[])
    ) => {
        const valueToStore =
            players instanceof Function ? players(team.players) : players;

        const isInvalidPlayerList = valueToStore.some(
            (player) =>
                player !== null &&
                (!player?.name ||
                    !player?.position ||
                    !player?.version ||
                    player?.nationId == null ||
                    player?.leagueId == null ||
                    player?.clubId == null)
        );

        setTeam((prev) => ({
            ...prev,
            players: isInvalidPlayerList ? DEFAULT_TEAM : valueToStore
        }));
    };

    const setShouldUseManager = (
        shouldUseManager: boolean | ((prevUseManager: boolean) => boolean)
    ) => {
        const valueToStore =
            shouldUseManager instanceof Function
                ? shouldUseManager(team.shouldUseManager)
                : shouldUseManager;
        setTeam((prev) => ({ ...prev, shouldUseManager: valueToStore }));
    };

    return {
        players: team.players || DEFAULT_TEAM,
        shouldUseManager: team.shouldUseManager,
        setPlayers,
        setShouldUseManager
    };
}
