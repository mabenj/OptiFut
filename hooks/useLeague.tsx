import { useState } from "react";
import CustomImage from "../components/CustomImage";
import {
    IconLeagueId,
    Leagues,
    PopularLeagues
} from "../optimizer/data/leagues";
import { SelectOption } from "../types/select-option.interface";

export function useLeague(initialId?: number | null) {
    const [selectedLeague, setSelectedLeague] = useState<SelectOption | null>(
        LEAGUE_OPTIONS.flatMap(({ options }) => options).find(
            (league) => league.value === initialId
        ) || null
    );

    const setById = (id: number | "icon" | undefined | null) => {
        if (!id) {
            setSelectedLeague(null);
            return;
        }
        if (id === "icon") {
            setById(IconLeagueId);
            return;
        }
        setSelectedLeague(
            LEAGUE_OPTIONS.flatMap(({ options }) => options).find(
                (league) => league.value === id
            ) || null
        );
    };

    return [selectedLeague, setById, LEAGUE_OPTIONS] as const;
}

const SELECT_IMG_WIDTH = 20;

const LEAGUE_OPTIONS = [
    {
        label: "Popular leagues",
        options: PopularLeagues.map((league) => ({
            label: league.displayName,
            value: league.id,
            icon: (
                <CustomImage
                    src={`/assets/img/leagues/${league.id}.png`}
                    fallbackSrc=""
                    alt={league.displayName}
                    width={SELECT_IMG_WIDTH}
                    ratio={1}
                />
            )
        })) as SelectOption[]
    },
    {
        label: "All leagues",
        options: Leagues.map((league) => ({
            label: league.displayName,
            value: league.id,
            icon: (
                <CustomImage
                    src={`/assets/img/leagues/${league.id}.png`}
                    fallbackSrc=""
                    alt={league.displayName}
                    width={SELECT_IMG_WIDTH}
                    ratio={1}
                />
            )
        })) as SelectOption[]
    }
];
