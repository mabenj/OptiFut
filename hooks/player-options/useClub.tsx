import { useEffect, useState } from "react";
import CustomImage from "../../components/ui/CustomImage";
import { HeroClubId, IconClubId } from "../../data/constants";
import { SelectOption } from "../../types/select-option.interface";
import { Club, db, League } from "../../utils/db";
import { useNextLiveQuery } from "../useNextLiveQuery";

interface ClubOption {
    label: string; // label of league
    options: SelectOption[]; // clubs in the league
}

interface LeagueWithClubs extends League {
    clubs: Club[];
}

export function useClub(initialId?: number | null) {
    const [selectedClub, setSelectedClub] = useState<SelectOption | null>(null);
    const clubOptions = useNextLiveQuery(async () => {
        const leagues = await db.leagues.toCollection().sortBy("displayName");
        const leaguesWithClubs: LeagueWithClubs[] = await Promise.all(
            leagues.map(async (league) => {
                const clubs = await db.clubs
                    .where("leagueId")
                    .equals(league.id)
                    .sortBy("displayName");
                return { ...league, clubs };
            })
        );
        return getClubOptions(leaguesWithClubs);
    }, []);

    useEffect(() => {
        if (!initialId) {
            setSelectedClub(null);
            return;
        }
        db.clubs
            .get({ id: initialId })
            .then((club) => setSelectedClub(club ? getClubOption(club) : null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setById = async (id: number | null | undefined) => {
        if (!id) {
            setSelectedClub(null);
            return;
        }
        const selectedClub = await db.clubs.get({ id: id });
        setSelectedClub(selectedClub ? getClubOption(selectedClub) : null);
    };

    return [selectedClub, setById, clubOptions] as const;
}

const SELECT_IMG_WIDTH = 30;

function getClubOption(club: Club): SelectOption {
    return {
        label:
            club.id === HeroClubId
                ? "Heroes"
                : club.id === IconClubId
                ? "Icons"
                : club.displayName,
        value: club.id,
        leagueId: club.leagueId || undefined,
        icon: (
            <CustomImage
                src={`/assets/img/clubs/${club.id}.png`}
                fallbackSrc="/assets/img/nations/placeholder.svg"
                alt={club.displayName}
                width={SELECT_IMG_WIDTH}
                ratio={1}
            />
        )
    };
}

function getClubOptions(leaguesWithClubs: LeagueWithClubs[]): ClubOption[] {
    return leaguesWithClubs.map((league) => ({
        label: league.displayName,
        options: league.clubs.map(getClubOption)
    }));
}