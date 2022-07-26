import { useLiveQuery } from "dexie-react-hooks";
import { LeagueIconRatio } from "../data/constants";
import { db } from "../utils/db";
import CustomImage from "./ui/CustomImage";

interface LeagueImageProps {
    id: number;
    sizePx: number;
}

export default function LeagueImage({ id, sizePx }: LeagueImageProps) {
    const league = useLiveQuery(() => {
        if (id) {
            return db.leagues.get({ id });
        }
    }, [id]);
    return (
        <CustomImage
            src={`/assets/img/leagues/${id}.png`}
            width={sizePx}
            alt={league?.displayName}
            fallbackSrc={`/assets/img/nations/placeholder.svg`}
            ratio={LeagueIconRatio}
            tooltipLabel={league?.displayName}
        />
    );
}
