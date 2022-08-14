import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Badge,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Spinner,
    VStack
} from "@chakra-ui/react";
import React from "react";
import { FormationOptions } from "../data/constants";
import { FormationInfo } from "../optimizer/types/formation-info";
import LeagueImage from "./image-icons/LeagueImage";
import NationImage from "./image-icons/NationImage";
import CustomTooltip from "./ui/CustomTooltip";

interface FormationResultsProps {
    results: FormationInfo[];
    isOptimizing: boolean;
    onReset: () => Promise<void>;
    onStop: () => Promise<void>;
}

export default function FormationResults({
    results,
    isOptimizing,
    onReset,
    onStop
}: FormationResultsProps) {
    return (
        <Box>
            <Heading as="h2" size="lg">
                Optimized Formations {isOptimizing && <Spinner />}
            </Heading>
            <Button
                onClick={async () => {
                    await onStop();
                    await onReset();
                }}
                leftIcon={<ArrowBackIcon />}
                my={2}>
                Back
            </Button>
            <Accordion allowToggle>
                {results.map((formation) => (
                    <AccordionItem key={formation.formationId}>
                        <AccordionButton>
                            <Heading as="h4" size="md" w="100%">
                                <Flex justifyContent="space-between">
                                    {
                                        FormationOptions.find(
                                            (f) =>
                                                f.id === formation.formationId
                                        )?.displayName
                                    }
                                    <Box>
                                        <CustomTooltip label="Total chemistry">
                                            <Badge
                                                colorScheme={
                                                    formation.teamChemistry >=
                                                    100
                                                        ? "green"
                                                        : formation.teamChemistry >=
                                                          65
                                                        ? "yellow"
                                                        : "red"
                                                }
                                                mr={2}>
                                                {formation.teamChemistry}
                                            </Badge>
                                        </CustomTooltip>
                                        <AccordionIcon />
                                    </Box>
                                </Flex>
                            </Heading>
                        </AccordionButton>
                        <AccordionPanel px={0}>
                            <VStack spacing={10}>
                                <Box w="100%">
                                    <Grid templateColumns="2fr 6fr 2fr 2fr">
                                        <GridItem></GridItem>
                                        <GridItem
                                            fontWeight="medium"
                                            color="gray.800"
                                            fontSize="sm">
                                            Name
                                        </GridItem>
                                        <GridItem
                                            fontWeight="medium"
                                            color="gray.800"
                                            textAlign="center"
                                            fontSize="sm">
                                            Position
                                        </GridItem>
                                        <GridItem
                                            fontWeight="medium"
                                            color="gray.800"
                                            textAlign="center"
                                            fontSize="sm"
                                            pl={2}>
                                            Chemistry
                                        </GridItem>

                                        {formation.players.map((player) => (
                                            <React.Fragment key={player.id}>
                                                <GridItem
                                                    fontWeight="medium"
                                                    color="gray.800"
                                                    textAlign="center"
                                                    fontSize="sm">
                                                    {player.positionNodeId}
                                                </GridItem>
                                                <GridItem>
                                                    {player.name}
                                                </GridItem>
                                                <GridItem textAlign="center">
                                                    {player.newPosition}
                                                </GridItem>
                                                <GridItem textAlign="center">
                                                    {player.chemistry}
                                                </GridItem>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </Box>

                                <Box w="100%">
                                    <Grid
                                        w="70%"
                                        templateColumns="10fr 2fr"
                                        rowGap={3}>
                                        <GridItem
                                            fontWeight="medium"
                                            color="gray.800"
                                            fontSize="sm"
                                            textAlign="right"
                                            mr={2}>
                                            Team chemistry
                                        </GridItem>
                                        <GridItem textAlign="center">
                                            {formation.teamChemistry}
                                        </GridItem>
                                        <GridItem
                                            fontWeight="medium"
                                            color="gray.800"
                                            fontSize="sm"
                                            textAlign="right"
                                            mr={2}>
                                            Position modifications
                                        </GridItem>
                                        <GridItem textAlign="center">
                                            {formation.players.reduce(
                                                (acc, curr) =>
                                                    acc +
                                                    curr.positionModificationsCount,
                                                0
                                            )}
                                        </GridItem>
                                        {formation.manager && (
                                            <>
                                                <GridItem
                                                    fontWeight="medium"
                                                    color="gray.800"
                                                    fontSize="sm"
                                                    textAlign="right"
                                                    mr={2}>
                                                    Manager nationality
                                                </GridItem>
                                                <GridItem
                                                    display="flex"
                                                    justifyContent="center">
                                                    <NationImage
                                                        id={
                                                            formation.manager
                                                                .nationalityId
                                                        }
                                                        sizePx={40}
                                                    />
                                                </GridItem>

                                                <GridItem
                                                    fontWeight="medium"
                                                    color="gray.800"
                                                    fontSize="sm"
                                                    textAlign="right"
                                                    mr={2}>
                                                    Manager league
                                                </GridItem>
                                                <GridItem
                                                    display="flex"
                                                    justifyContent="center">
                                                    <LeagueImage
                                                        id={
                                                            formation.manager
                                                                .leagueId
                                                        }
                                                        sizePx={35}
                                                    />
                                                </GridItem>
                                            </>
                                        )}
                                    </Grid>
                                </Box>
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
