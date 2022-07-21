import { useLiveQuery } from "dexie-react-hooks";
import { ClubIconRatio } from "../data/constants";
import { db } from "../utils/db";
import CustomImage from "./ui/CustomImage";

interface ClubImageProps {
    id: number;
    sizePx: number;
}

export default function ClubImage({ id, sizePx }: ClubImageProps) {
    const club = useLiveQuery(() => db.clubs.get({ id }));
    return (
        <CustomImage
            src={`/assets/img/clubs/${id}.png`}
            width={sizePx}
            alt={club?.displayName}
            fallbackSrc={`/assets/img/nations/placeholder.svg`}
            ratio={ClubIconRatio}
            tooltipLabel={club?.displayName}
        />
    );
}
