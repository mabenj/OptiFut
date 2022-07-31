import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    FormLabel,
    Heading,
    SimpleGrid,
    Stack,
    Switch,
    Text
} from "@chakra-ui/react";
import React from "react";
import { FormationOptions } from "../data/constants";
import { FormationId } from "../types/formation-id";
import CheckToken from "./ui/CheckToken";

interface FormationsAccordionProps {
    selectedFormations: Record<FormationId, boolean>;
    onChange: (newSelectedFormations: Record<FormationId, boolean>) => any;
}

export default function FormationsAccordion({
    onChange,
    selectedFormations
}: FormationsAccordionProps) {
    const handleSelectAll = (allSelected: boolean) => {
        Object.keys(selectedFormations).forEach(
            (formationId) =>
                (selectedFormations[formationId as FormationId] = allSelected)
        );
        onChange({ ...selectedFormations });
    };

    const handleSelectFormation = (
        formationId: FormationId,
        isSelected: boolean
    ) => {
        selectedFormations[formationId] = isSelected;
        onChange({ ...selectedFormations });
    };

    const selectedCount = Object.values(selectedFormations).filter(
        (isSelected) => isSelected
    ).length;
    const allSelected =
        selectedCount === Object.values(selectedFormations).length;
    const someSelected = !allSelected && selectedCount > 0;

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="center">
                            <Text fontWeight="medium">Formations to use</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel px={3} py={5}>
                    <CheckToken
                        isChecked={allSelected}
                        label="Select all"
                        onChange={handleSelectAll}
                        centered
                    />
                    <SimpleGrid minChildWidth="9rem" spacing={2} mt={4}>
                        {FormationOptions.map((formation) => (
                            <Box key={formation.id}>
                                <CheckToken
                                    isChecked={selectedFormations[formation.id]}
                                    label={formation.displayName}
                                    onChange={(checked) =>
                                        handleSelectFormation(
                                            formation.id,
                                            checked
                                        )
                                    }
                                    useUncheckedStyle
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
