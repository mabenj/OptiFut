import { useState } from "react";
import CustomImage from "../components/CustomImage";
import { Clubs, HeroClubId, IconClubId } from "../optimizer/data/clubs";
import { Leagues } from "../optimizer/data/leagues";
import { SelectOption } from "../types/select-option.interface";

export function useClub(initialId?: number | null) {
    const [selectedClub, setSelectedClub] = useState<SelectOption | null>(
        CLUB_OPTIONS.flatMap(({ options }) => options).find(
            (club) => club.value === initialId
        ) || null
    );

    const setById = (id: number | "icon" | "hero" | undefined | null) => {
        if (!id) {
            setSelectedClub(null);
            return;
        }
        if (id === "icon") {
            setById(IconClubId);
            return;
        }
        if (id === "hero") {
            setById(HeroClubId);
            return;
        }
        setSelectedClub(
            CLUB_OPTIONS.flatMap(({ options }) => options).find(
                (club) => club.value === id
            ) || null
        );
    };

    return [selectedClub, setById, CLUB_OPTIONS] as const;
}

const SELECT_IMG_WIDTH = 20;

const CLUB_OPTIONS = Leagues.concat({ displayName: "Heroes", id: -1 }).map(
    (league) => ({
        label: league.displayName,
        leagueId: league.id,
        options: Clubs.filter(({ leagueId22 }) => leagueId22 === league.id).map(
            (club) => ({
                label: club.displayName,
                value: club.id,
                icon: (
                    <CustomImage
                        src={`/assets/img/clubs/${club.id}.png`}
                        fallbackSrc="/assets/img/club/placeholder.svg"
                        alt={club.displayName}
                        width={SELECT_IMG_WIDTH}
                        ratio={1}
                    />
                ),
                leagueId22: league.id
            })
        ) as SelectOption[]
    })
);
