import { useState } from "react";
import { Nations, PopularNations } from "../optimizer/data/nations";
import { SelectOption } from "../types/select-option.interface";

export function useNationality(initialId?: number | null) {
    const [selectedNationality, setSelectedNationality] =
        useState<SelectOption | null>(
            NATIONALITY_OPTIONS.flatMap(({ options }) => options).find(
                (nation) => nation.value === initialId
            ) || null
        );

    const setById = (id: number | undefined | null) => {
        if (!id) {
            setSelectedNationality(null);
            return;
        }
        setSelectedNationality(
            NATIONALITY_OPTIONS.flatMap(({ options }) => options).find(
                (nation) => nation.value === id
            ) || null
        );
    };

    return [selectedNationality, setById, NATIONALITY_OPTIONS] as const;
}

const NATIONALITY_OPTIONS = [
    {
        label: "Popular nationalities",
        options: PopularNations.map((nation) => ({
            label: nation.displayName,
            value: nation.id,
            icon: (
                <span
                    className={`fi fi-${nation.countryCode.toLowerCase()}`}></span>
            )
        })) as SelectOption[]
    },
    {
        label: "All nationalities",
        options: Nations.map((nation) => ({
            label: nation.displayName,
            value: nation.id,
            icon: (
                <span
                    className={`fi fi-${nation.countryCode.toLowerCase()}`}></span>
            )
        })) as SelectOption[]
    }
];
