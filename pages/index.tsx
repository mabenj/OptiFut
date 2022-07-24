import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightAddon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import PlayerEditorModal from "../components/PlayerEditorModal";
import PlayerList from "../components/PlayerList";
import { DefaultEditorValues, TeamPlayerCount } from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { useSavedTeam } from "../hooks/useSavedTeam";
import { PlayerDto } from "../types/player-dto.interface";
import { PlayerEditorValues } from "../types/player-editor-values";

const Home: NextPage = () => {
    const {
        isOpen: isEditorOpen,
        onOpen: openEditor,
        onClose: closeEditor
    } = useDisclosure();
    const { players, setPlayers } = useActiveTeam();
    const [editorDefaults, setEditorDefaults] =
        useState<PlayerEditorValues>(DefaultEditorValues);
    const { addSavedTeam } = useSavedTeam();

    const toast = useToast();

    const deletePlayerAt = (index: number) => {
        setPlayers((prev) => {
            prev.splice(index, 1);
            return [...prev];
        });
    };

    const editPlayerAt = (index: number) => {
        if (index < 0) {
            setEditorDefaults(DefaultEditorValues);
        } else {
            setEditorDefaults({ ...players[index], index });
        }
        openEditor();
    };

    const addPlayer = (editorValues: PlayerEditorValues) => {
        const newPlayer: PlayerDto = {
            name: editorValues.name,
            version: editorValues.version,
            position: editorValues.position,
            hasLoyalty: editorValues.hasLoyalty,
            nationId: editorValues.nationId!,
            leagueId: editorValues.leagueId!,
            clubId: editorValues.clubId!
        };
        if (editorValues.index < 0) {
            // add new
            setPlayers((prev) => [...prev, newPlayer]);
        } else {
            // edit existing
            setPlayers((prev) => {
                prev[editorValues.index] = newPlayer;
                return [...prev];
            });
        }
    };

    const saveCurrentTeam = (teamName: string) => {
        if (players.length !== TeamPlayerCount) {
            return;
        }
        addSavedTeam({
            name: teamName,
            players: players.map((player) => ({
                name: player.name,
                position: player.position,
                version: player.version,
                hasLoyalty: player.hasLoyalty,
                nationId: player.nationId,
                leagueId: player.leagueId,
                clubId: player.clubId
            }))
        }).then(() =>
            toast({
                title: "Team Saved",
                description: `Team '${teamName}' saved successfully`,
                duration: 9000,
                isClosable: true,
                status: "success"
            })
        );
    };

    return (
        <Flex justifyContent="center" height="100vh">
            <Box width={["95%", "80%", "60%", "40%"]}>
                <Stack spacing={5}>
                    <Heading>OptiFut</Heading>
                    <PlayerEditorModal
                        isOpen={isEditorOpen}
                        closeModal={closeEditor}
                        onPlayerAdded={addPlayer}
                        prefillValues={editorDefaults}
                    />
                    <PlayerList
                        players={players}
                        onEditPlayer={editPlayerAt}
                        onRemovePlayer={deletePlayerAt}
                        onResetTeam={() => setPlayers([])}
                    />
                    <Stack>
                        <Button
                            leftIcon={<AddIcon />}
                            onClick={() => editPlayerAt(-1)}
                            disabled={players.length >= TeamPlayerCount}>
                            Add Player
                        </Button>
                        <SaveTeamBtn
                            disabled={players.length !== TeamPlayerCount}
                            onSave={saveCurrentTeam}
                        />
                        <OptimizeTeamBtn
                            players={players}
                            shouldUseManager={true}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Flex>
    );
};

const OptimizeTeamBtn = ({
    players,
    shouldUseManager
}: {
    players: PlayerDto[];
    shouldUseManager: boolean;
}) => {
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
                disabled={players.length !== TeamPlayerCount}>
                Optimize Team
            </Button>
        </Link>
    );
};

const SaveTeamBtn = ({
    disabled,
    onSave
}: {
    disabled: boolean;
    onSave: (teamName: string) => any;
}) => {
    const [teamName, setTeamName] = useState("");

    return (
        <Popover>
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button
                            leftIcon={<Text className="bi bi-save2" />}
                            disabled={disabled}>
                            Save Team
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody my={3}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onSave(teamName);
                                    onClose();
                                }}>
                                <FormControl>
                                    <FormLabel htmlFor="savedTeamName" hidden>
                                        Team Name
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            id="savedTeamName"
                                            name="savedTeamName"
                                            placeholder="Enter team name"
                                            onChange={(e) =>
                                                setTeamName(e.target.value)
                                            }
                                            required
                                            autoComplete="off"
                                        />
                                        <InputRightAddon p={0}>
                                            <ButtonGroup isAttached>
                                                <IconButton
                                                    type="submit"
                                                    aria-label="Save"
                                                    color="green.600"
                                                    icon={<CheckIcon />}
                                                />
                                                <IconButton
                                                    type="button"
                                                    aria-label="Cancel"
                                                    color="red.600"
                                                    onClick={onClose}
                                                    icon={<CloseIcon />}
                                                />
                                            </ButtonGroup>
                                        </InputRightAddon>
                                    </InputGroup>
                                </FormControl>
                            </form>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};

export default Home;
