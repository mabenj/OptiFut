import { useEffect, useState } from "react";
import CustomImage from "../components/ui/CustomImage";
import { PopularLeagueIds } from "../data/constants";
import { SelectOption } from "../types/select-option.interface";
import { db, League, Nation } from "../utils/db";

interface LeagueOption {
    label: string;
    options: SelectOption[];
}

export function useLeague(initialId?: number | null) {
    const [selectedLeague, setSelectedLeague] = useState<SelectOption | null>(
        null
    );
    const [leagueOptions, setLeagueOptions] = useState<LeagueOption[]>([]);

    useEffect(() => {
        async function setupLeagueOptions() {
            const allLeagues = await db.leagues
                .toCollection()
                .sortBy("displayName");
            const popularLeagues = await db.leagues
                .where("id")
                .anyOf(PopularLeagueIds)
                .sortBy("displayName");
            const initialLeague = initialId
                ? await db.leagues.get({ id: initialId })
                : null;
            setSelectedLeague(
                initialLeague ? getLeagueOption(initialLeague) : null
            );
            setLeagueOptions(getLeagueOptions(popularLeagues, allLeagues));
        }
        setupLeagueOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setById = async (id: number | null | undefined) => {
        if (!id) {
            setSelectedLeague(null);
            return;
        }
        const selectedLeague = await db.leagues.get({ id: id });
        setSelectedLeague(
            selectedLeague ? getLeagueOption(selectedLeague) : null
        );
    };

    return [selectedLeague, setById, leagueOptions] as const;
}

const SELECT_IMG_WIDTH = 30;

function getLeagueOption(league: League): SelectOption {
    return {
        label: league.displayName,
        value: league.id,
        icon: (
            <CustomImage
                src={`/assets/img/leagues/${league.id}.png`}
                fallbackSrc="/assets/img/nations/placeholder.svg"
                alt={league.displayName}
                width={SELECT_IMG_WIDTH}
                ratio={1}
            />
        )
    };
}

function getLeagueOptions(
    popularLeagues: Nation[],
    allLeagues: Nation[]
): LeagueOption[] {
    return [
        {
            label: "Popular leagues",
            options: popularLeagues.map(getLeagueOption)
        },
        {
            label: "All leagues",
            options: allLeagues.map(getLeagueOption)
        }
    ];
}
