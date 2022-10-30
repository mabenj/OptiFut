import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { FormationOptions } from "../data/constants";
import { FormationId } from "../types/formation-id";

interface FormationsGridProps {
    selectedFormations: Record<FormationId, boolean>;
    onChange: (newSelectedFormations: Record<FormationId, boolean>) => any;
}

export default function FormationsGrid({
    selectedFormations,
    onChange
}: FormationsGridProps) {
    const handleSelectFormation = (
        formationId: FormationId,
        isSelected: boolean
    ) => {
        selectedFormations[formationId] = isSelected;
        onChange({ ...selectedFormations });
    };

    const allSelected = Object.values(selectedFormations).every(
        (isSelected) => isSelected
    );

    const onSelectAll = () => {
        Object.keys(selectedFormations).forEach(
            (formationId) =>
                (selectedFormations[formationId as FormationId] = !allSelected)
        );
        onChange({ ...selectedFormations });
    };

    return (
        <Box my={3}>
            <Button size="sm" variant="ghost" onClick={onSelectAll} mb={2}>
                {allSelected ? "Deselect all" : "Select all"}
            </Button>
            <SimpleGrid columns={3} spacing={2}>
                {FormationOptions.map((option) => (
                    <FormationToggleButton
                        key={option.id}
                        isChecked={selectedFormations[option.id]}
                        label={option.displayName}
                        onChange={(checked) =>
                            handleSelectFormation(option.id, checked)
                        }
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
}

const FormationToggleButton = ({
    isChecked,
    onChange,
    label
}: {
    isChecked: boolean;
    onChange: (newValue: boolean) => any;
    label: string;
}) => {
    return (
        <Button
            colorScheme={isChecked ? "green" : "gray"}
            variant={isChecked ? "solid" : "outline"}
            size="xs"
            w="100%"
            onClick={() => onChange(!isChecked)}>
            {label}
        </Button>
    );
};
