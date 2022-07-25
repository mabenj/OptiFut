import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
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
    useToast
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import PlayerList from "../components/PlayerList";
import { TeamPlayerCount } from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { useSavedTeam } from "../hooks/useSavedTeam";
import { PlayerDto } from "../types/player-dto.interface";

const Home: NextPage = () => {
    const { players, setPlayers } = useActiveTeam();
    const { addSavedTeam } = useSavedTeam();
    const toast = useToast();

    const saveCurrentTeam = (teamName: string) => {
        if (players.length !== TeamPlayerCount) {
            return;
        }
        addSavedTeam({
            name: teamName,
            players: players.map((player) => ({
                name: player?.name!,
                position: player?.position!,
                version: player?.version!,
                hasLoyalty: player?.hasLoyalty!,
                nationId: player?.nationId!,
                leagueId: player?.leagueId!,
                clubId: player?.clubId!
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

    const canSaveTeam =
        players.length == TeamPlayerCount &&
        players.every((player) => player !== null);

    return (
        <Flex justifyContent="center" height="100vh">
            <Box width={["95%", "80%", "60%", "40%"]}>
                <Stack spacing={5}>
                    <Text textAlign="center">
                        <Heading as="h1">OptiFut</Heading>
                        <Text color="gray.500" mt={3}>
                            FIFA Ultimate Team Chemistry Optimizer
                        </Text>
                    </Text>
                    <PlayerList players={players} onChange={setPlayers} />
                    <Stack>
                        <SaveTeamBtn
                            disabled={!canSaveTeam}
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
