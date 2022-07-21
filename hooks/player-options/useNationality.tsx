import { useEffect, useState } from "react";
import CustomImage from "../../components/ui/CustomImage";
import {
    NationFlagRatio,
    PopularNationIds,
    SelectImageWidth
} from "../../data/constants";
import { SelectOption } from "../../types/select-option.interface";
import { db, Nation } from "../../utils/db";
import { useNextLiveQuery } from "../useNextLiveQuery";

interface NationOption {
    label: string;
    options: SelectOption[];
}

export function useNationality(initialId?: number | null) {
    const [selectedNationality, setSelectedNationality] =
        useState<SelectOption | null>(null);
    const nationOptions =
        useNextLiveQuery(async () => {
            const allNations = await db.nations
                .orderBy("displayName")
                .toArray();
            const popularNations = await db.nations
                .where("id")
                .anyOf(PopularNationIds)
                .sortBy("displayName");
            return getNationOptions(popularNations, allNations);
        }, []) || [];

    useEffect(() => {
        if (!initialId) {
            setSelectedNationality(null);
            return;
        }
        db.nations
            .get({ id: initialId })
            .then((nation) =>
                setSelectedNationality(nation ? getNationOption(nation) : null)
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setById = async (id: number | null | undefined) => {
        if (!id) {
            setSelectedNationality(null);
            return;
        }
        const selectedNation = await db.nations.get({ id: id });
        setSelectedNationality(
            selectedNation ? getNationOption(selectedNation) : null
        );
    };

    return {
        nationalityId: selectedNationality?.value,
        setNationalityId: setById,
        nationalityOption: selectedNationality,
        nationalityOptions: nationOptions
    };
}

function getNationOption(nation: Nation): SelectOption {
    return {
        label: nation.displayName,
        value: nation.id,
        icon: (
            <CustomImage
                src={`/assets/img/nations/${nation.id}.png`}
                fallbackSrc="/assets/img/nations/placeholder.svg"
                alt={nation.displayName}
                width={SelectImageWidth}
                ratio={NationFlagRatio}
            />
        )
    };
}

function getNationOptions(
    popularNations: Nation[],
    allNations: Nation[]
): NationOption[] {
    return [
        {
            label: "Popular nationalities",
            options: popularNations.map(getNationOption)
        },
        {
            label: "All nationalities",
            options: allNations.map(getNationOption)
        }
    ];
}
