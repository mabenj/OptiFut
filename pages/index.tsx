import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    Flex,
    FormLabel,
    Heading,
    SimpleGrid,
    Stack,
    Switch,
    Text
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import PlayerList from "../components/PlayerList";
import { TeamPlayerCount } from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { PlayerDto } from "../types/player-dto.interface";

const FORMATIONS = [
    { displayValue: "3-4-1-2", value: "3412" },
    { displayValue: "3-4-2-1", value: "3421" },
    { displayValue: "3-1-4-2", value: "3142" },
    { displayValue: "3-4-3", value: "343" },
    { displayValue: "3-5-2", value: "352" },
    { displayValue: "4-1-2-1-2", value: "41212" },
    { displayValue: "4-1-2-1-2 (2)", value: "41212-2" },
    { displayValue: "4-1-4-1", value: "4141" },
    { displayValue: "4-2-3-1", value: "4231" },
    { displayValue: "4-2-3-1 (2)", value: "4231-2" },
    { displayValue: "4-2-2-2", value: "4222" },
    { displayValue: "4-2-4", value: "424" },
    { displayValue: "4-3-1-2", value: "4312" },
    { displayValue: "4-1-3-2", value: "4132" },
    { displayValue: "4-3-2-1", value: "4321" },
    { displayValue: "4-3-3", value: "433" },
    { displayValue: "4-3-3 (2)", value: "433-2" },
    { displayValue: "4-3-3 (3)", value: "433-3" },
    { displayValue: "4-3-3 (4)", value: "433-4" },
    { displayValue: "4-3-3 (5)", value: "433-5" },
    { displayValue: "4-4-1-1", value: "4411" },
    { displayValue: "4-4-1-1 (2)", value: "4411-2" },
    { displayValue: "4-4-2", value: "442" },
    { displayValue: "4-4-2 (2)", value: "442-2" },
    { displayValue: "4-5-1", value: "451" },
    { displayValue: "4-5-1 (2)", value: "451-2" },
    { displayValue: "5-2-1-2", value: "5212" },
    { displayValue: "5-2-2-1", value: "5221" },
    { displayValue: "5-3-2", value: "532" },
    { displayValue: "5-4-1", value: "541" }
];

type FormationCheckedMap = {
    [formation: string]: boolean;
};

const DEFAULT_SELECTED_FORMATIONS = FORMATIONS.reduce((map, current) => {
    map[current.value] = true;
    return map;
}, {} as FormationCheckedMap);

const Home: NextPage = () => {
    const { players, setPlayers, shouldUseManager, setShouldUseManager } =
        useActiveTeam();
    const [selectedFormations, setSelectedFormations] = useState(
        DEFAULT_SELECTED_FORMATIONS
    );

    const allFormationsSelected = Object.values(selectedFormations).every(
        (isSelected) => isSelected
    );
    const someFormationsSelected =
        !allFormationsSelected &&
        Object.values(selectedFormations).some((isSelected) => isSelected);

    return (
        <Flex justifyContent="center" height="100vh" my={5}>
            <Box width={["95%", "80%", "60%", "40%"]}>
                <Stack spacing={5}>
                    <Box textAlign="center">
                        <Heading as="h1">OptiFut</Heading>
                        <Text color="gray.500" mt={3}>
                            FIFA Ultimate Team Chemistry Optimizer
                        </Text>
                    </Box>
                    <PlayerList players={players} onChange={setPlayers} />

                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="center">
                                        <Text fontWeight="medium">
                                            Formations to use
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel px={8} py={5}>
                                <Checkbox
                                    fontWeight="semibold"
                                    colorScheme="green"
                                    isChecked={allFormationsSelected}
                                    isIndeterminate={someFormationsSelected}
                                    onChange={(e) =>
                                        setSelectedFormations((prev) => {
                                            Object.keys(prev).forEach(
                                                (formation) =>
                                                    (prev[formation] =
                                                        e.target.checked)
                                            );
                                            return { ...prev };
                                        })
                                    }>
                                    Select all
                                </Checkbox>
                                <Flex
                                    flexWrap="wrap"
                                    gap={3}
                                    mt={5}
                                    _after={{
                                        content: `""`,
                                        flex: "auto"
                                    }}>
                                    {FORMATIONS.map((formation) => (
                                        <Box key={formation.value} flexGrow={1}>
                                            <CheckToken
                                                isChecked={
                                                    selectedFormations[
                                                        formation.value
                                                    ]
                                                }
                                                label={formation.displayValue}
                                                onChange={(checked) => {
                                                    setSelectedFormations(
                                                        (prev) => {
                                                            prev[
                                                                formation.value
                                                            ] = checked;
                                                            return {
                                                                ...prev
                                                            };
                                                        }
                                                    );
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Flex>

                                <SimpleGrid
                                    hidden
                                    mt={5}
                                    minChildWidth="10rem"
                                    spacingY="1rem"
                                    spacingX="0.7rem">
                                    {FORMATIONS.map((formation) => (
                                        <Box key={formation.value}>
                                            <CheckToken
                                                isChecked={
                                                    selectedFormations[
                                                        formation.value
                                                    ]
                                                }
                                                label={formation.displayValue}
                                                onChange={(checked) => {
                                                    setSelectedFormations(
                                                        (prev) => {
                                                            prev[
                                                                formation.value
                                                            ] = checked;
                                                            return {
                                                                ...prev
                                                            };
                                                        }
                                                    );
                                                }}
                                            />

                                            {/* <Tag size="lg" w="100%">
                                                <TagLeftIcon
                                                    boxSize="12px"
                                                    as={CheckIcon}
                                                    color="green"
                                                />
                                                <TagLabel>
                                                    {selectedFormations[
                                                        formation.value
                                                    ] ? (
                                                        <Text>
                                                            {
                                                                formation.displayValue
                                                            }
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            as="s"
                                                            color="gray.500">
                                                            {
                                                                formation.displayValue
                                                            }
                                                        </Text>
                                                    )}
                                                </TagLabel>
                                            </Tag> */}

                                            {/* <Checkbox
                                                    colorScheme="green"
                                                    isChecked={
                                                        selectedFormations[
                                                            formation.value
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedFormations(
                                                            (prev) => {
                                                                prev[
                                                                    formation.value
                                                                ] =
                                                                    e.target.checked;
                                                                return {
                                                                    ...prev
                                                                };
                                                            }
                                                        )
                                                    }>
                                                    {selectedFormations[
                                                        formation.value
                                                    ] ? (
                                                        <Text>
                                                            {
                                                                formation.displayValue
                                                            }
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            as="s"
                                                            color="gray.500">
                                                            {
                                                                formation.displayValue
                                                            }
                                                        </Text>
                                                    )}
                                                </Checkbox> */}
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Flex alignItems="center" justifyContent="center" gap={4}>
                        <FormLabel m={0}>Use manager</FormLabel>
                        <Switch
                            size="lg"
                            colorScheme="green"
                            checked={shouldUseManager}
                            onChange={(e) =>
                                setShouldUseManager(e.target.checked)
                            }
                        />
                    </Flex>
                    <OptimizeTeamBtn
                        players={players}
                        shouldUseManager={true}
                    />
                </Stack>
            </Box>
        </Flex>
    );
};

const OptimizeTeamBtn = ({
    players,
    shouldUseManager
}: {
    players: (PlayerDto | null)[];
    shouldUseManager: boolean;
}) => {
    const isDisabled =
        players.length !== TeamPlayerCount ||
        players.some((player) => player === null);
    return (
        <Link
            href={{
                pathname: "/optimize",
                query: {
                    players: JSON.stringify(players),
                    useManager: shouldUseManager
                }
            }}>
            <Button
                colorScheme="green"
                leftIcon={<Text className="bi bi-cursor" />} // candidates: magic, stars,
                onClick={() => -1}
                disabled={isDisabled}>
                Optimize Team
            </Button>
        </Link>
    );
};

const CheckToken = ({
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
            w="100%"
            rounded="full"
            leftIcon={
                // <Circle bg={isChecked ? "green.600" : "white"} p="3px">
                //     <CheckIcon color="white" fontSize="8px" />
                // </Circle>
                <Text
                    className={
                        isChecked ? "bi bi-check-circle-fill" : "bi-circle-fill"
                    }
                    color={isChecked ? "green.500" : "white"}
                />
            }
            onClick={() => onChange(!isChecked)}>
            {isChecked ? (
                <Text>{label}</Text>
            ) : (
                <Text as="s" color="gray.500">
                    {label}
                </Text>
            )}
        </Button>
    );
};

export default Home;
