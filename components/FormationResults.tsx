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
    Heading,
    ListItem,
    Spinner,
    UnorderedList
} from "@chakra-ui/react";
import { FormationOptions } from "../data/constants";
import { FormationInfo } from "../optimizer/types/formation-info";
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
                        <AccordionPanel>
                            <Heading as="h6" size="sm">
                                Manager
                            </Heading>
                            {formation.manager ? (
                                <>
                                    {formation.manager.nationalityId}{" "}
                                    {formation.manager.leagueId}
                                </>
                            ) : (
                                <small>No manager</small>
                            )}

                            <UnorderedList>
                                {formation.players.map((player) => (
                                    <ListItem key={player.id}>
                                        {player.name}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    // <Box key={formation.formationId} my={4} p={2} bg="gray.300">
                    //     <Heading as="h5" size="md">
                    //         {
                    //             FormationOptions.find(
                    //                 (f) => f.id === formation.formationId
                    //             )?.displayName
                    //         }
                    //     </Heading>
                    //     <Box>Total Chemistry: {formation.teamChemistry}</Box>
                    //     {formation.manager && (
                    //         <Box>
                    //             Manager nationality:{" "}
                    //             {formation.manager.nationalityId}
                    //             <br />
                    //             Manager league: {formation.manager.leagueId}
                    //         </Box>
                    //     )}
                    //     <Box>
                    //         {formation.players.map((player) => (
                    //             <Box key={player.id}>
                    //                 <strong>{player.name}</strong>
                    //                 <br />
                    //                 Chemistry: {player.chemistry}
                    //                 <br />
                    //                 Position from {player.originalPosition} to{" "}
                    //                 {player.newPosition}
                    //                 <br />
                    //                 Position in squad: {player.positionNodeId}
                    //                 <br />
                    //                 Has loyalty: {player.hasLoyalty ? "yes" : "no"}
                    //                 <br />
                    //                 Position modifications:{" "}
                    //                 {player.positionModificationsCount}
                    //             </Box>
                    //         ))}
                    //     </Box>
                    // </Box>
                ))}
            </Accordion>
        </Box>
    );
}
