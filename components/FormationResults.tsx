import { ArrowBackIcon, NotAllowedIcon } from "@chakra-ui/icons";
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
import { FormationInfo } from "../types/formation-info";
import ClubImage from "./image-icons/ClubImage";
import LeagueImage from "./image-icons/LeagueImage";
import NationImage from "./image-icons/NationImage";
import PlayerLineup from "./PlayerLineup";
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
            <Flex justifyContent="space-between">
                <Button
                    onClick={async () => {
                        await onStop();
                        await onReset();
                    }}
                    leftIcon={<ArrowBackIcon />}
                    my={2}>
                    Back
                </Button>
                <Button
                    colorScheme="red"
                    onClick={onStop}
                    leftIcon={<NotAllowedIcon />}
                    my={2}
                    disabled={!isOptimizing}>
                    Stop
                </Button>
            </Flex>
            <Flex alignItems="center" gap={2} my={3}>
                <Heading as="h2" size="lg">
                    Optimized Formations
                </Heading>
                {isOptimizing && <Spinner />}
            </Flex>
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
                                                fontSize="lg"
                                                variant={
                                                    formation.chemistry
                                                        .combinedChemistry ===
                                                    33
                                                        ? "solid"
                                                        : "subtle"
                                                }
                                                colorScheme={
                                                    formation.chemistry
                                                        .combinedChemistry > 25
                                                        ? "green"
                                                        : formation.chemistry
                                                              .combinedChemistry >
                                                          15
                                                        ? "yellow"
                                                        : "red"
                                                }>
                                                {
                                                    formation.chemistry
                                                        .combinedChemistry
                                                }
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
                                    <PlayerLineup
                                        lineup={formation.players.map((p) => ({
                                            name: p.name,
                                            chemistry: p.chemistry,
                                            originalPosition:
                                                p.initialPrefPosition,
                                            finalPosition: p.newPrefPosition,
                                            positionInFormation:
                                                p.positionInFormation
                                        }))}
                                    />
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
                                            Combined Chemistry
                                        </GridItem>
                                        <GridItem textAlign="center">
                                            {
                                                formation.chemistry
                                                    .combinedChemistry
                                            }
                                        </GridItem>
                                        <GridItem
                                            fontWeight="medium"
                                            color="gray.800"
                                            fontSize="sm"
                                            textAlign="right"
                                            mr={2}>
                                            Position Modifications
                                        </GridItem>
                                        <GridItem textAlign="center">
                                            {
                                                formation.chemistry
                                                    .positionModifications
                                            }
                                        </GridItem>
                                        {!!formation.manager && (
                                            <>
                                                <GridItem
                                                    fontWeight="medium"
                                                    color="gray.800"
                                                    fontSize="sm"
                                                    textAlign="right"
                                                    mr={2}>
                                                    Manager Nationality
                                                </GridItem>
                                                <GridItem
                                                    display="flex"
                                                    justifyContent="center">
                                                    <NationImage
                                                        id={
                                                            formation.manager
                                                                ?.nationId
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
                                                    Manager League
                                                </GridItem>
                                                <GridItem
                                                    display="flex"
                                                    justifyContent="center">
                                                    <LeagueImage
                                                        id={
                                                            formation.manager
                                                                ?.leagueId
                                                        }
                                                        sizePx={35}
                                                    />
                                                </GridItem>
                                            </>
                                        )}
                                        <ul>
                                            {formation.chemistry.nationCounts.map(
                                                (nationCount) => (
                                                    <li key={nationCount.id}>
                                                        <Flex gap={2}>
                                                            <NationImage
                                                                id={
                                                                    nationCount.id
                                                                }
                                                                sizePx={30}
                                                            />{" "}
                                                            {nationCount.count}{" "}
                                                            / 8
                                                        </Flex>
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                        <ul>
                                            {formation.chemistry.clubCounts.map(
                                                (clubCount) => (
                                                    <li key={clubCount.id}>
                                                        <Flex gap={2}>
                                                            <ClubImage
                                                                id={
                                                                    clubCount.id
                                                                }
                                                                sizePx={30}
                                                            />{" "}
                                                            {clubCount.count} /
                                                            7
                                                        </Flex>
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                        <ul>
                                            {formation.chemistry.leagueCounts.map(
                                                (leagueCount) => (
                                                    <li key={leagueCount.id}>
                                                        <Flex gap={2}>
                                                            <LeagueImage
                                                                id={
                                                                    leagueCount.id
                                                                }
                                                                sizePx={30}
                                                            />{" "}
                                                            {leagueCount.count}{" "}
                                                            / 8
                                                        </Flex>
                                                    </li>
                                                )
                                            )}
                                        </ul>
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

// eslint-disable-next-line react/display-name
const ChemistryBadge = React.forwardRef(
    ({ chemistry }: { chemistry: number }, ref) => (
        <Badge
            fontSize="lg"
            variant={chemistry === 100 ? "solid" : "subtle"}
            colorScheme={
                chemistry > 80 ? "green" : chemistry > 50 ? "yellow" : "red"
            }>
            {chemistry}
        </Badge>
    )
);
