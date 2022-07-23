import { useLiveQuery } from "dexie-react-hooks";
import { NationFlagRatio } from "../data/constants";
import { db } from "../utils/db";
import CustomImage from "./ui/CustomImage";

interface NationImageProps {
    id: number;
    sizePx: number;
}

export default function NationImage({ id, sizePx }: NationImageProps) {
    const nation = useLiveQuery(() => db.nations.get({ id }), [id]);
    return (
        <CustomImage
            src={`/assets/img/nations/${id}.png`}
            width={sizePx}
            alt={nation?.displayName}
            fallbackSrc={`/assets/img/nations/placeholder.svg`}
            ratio={NationFlagRatio}
            tooltipLabel={nation?.displayName}
        />
    );
}
