import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import PlayerEditorModal from "../components/PlayerEditorModal";
import PlayerList from "../components/PlayerList";
import { DefaultEditorValues } from "../data/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSavedTeam } from "../hooks/useSavedTeam";
import { PlayerDto } from "../types/player-dto.interface";
import { PlayerEditorValues } from "../types/player-editor-values";
import { getRandomInt } from "../utils/utils";

const TEAM_STORAGE_KEY = "OPTIFUT_CURRENT_TEAM";
const TEAM_PLAYER_COUNT = 11;

const Home: NextPage = () => {
    const {
        isOpen: isEditorOpen,
        onOpen: openEditor,
        onClose: closeEditor
    } = useDisclosure();
    const [players, setPlayers] = useLocalStorage<PlayerDto[]>(
        TEAM_STORAGE_KEY,
        []
    );
    const [editorDefaults, setEditorDefaults] =
        useState<PlayerEditorValues>(DefaultEditorValues);

    const { addSavedTeam } = useSavedTeam();

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

    const saveCurrentTeam = () => {
        if (players.length !== TEAM_PLAYER_COUNT) {
            return;
        }
        addSavedTeam({
            name: "Team_" + getRandomInt(0, 999), // TODO
            useManager: true, // TODO
            players: players.map((player) => ({
                name: player.name,
                position: player.position,
                version: player.version,
                hasLoyalty: player.hasLoyalty,
                nationId: player.nationId,
                leagueId: player.leagueId,
                clubId: player.clubId
            }))
        });
    };

    return (
        <Flex justifyContent="center" height="100vh">
            <Box width={["95%", "80%", "60%", "40%"]}>
                <Stack spacing={10}>
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
                    />
                    <Stack>
                        <Button
                            leftIcon={<AddIcon />}
                            onClick={() => editPlayerAt(-1)}
                            disabled={players.length >= TEAM_PLAYER_COUNT}>
                            Add Player
                        </Button>
                        <Button
                            leftIcon={<Text className="bi bi-save2" />}
                            onClick={saveCurrentTeam}
                            disabled={players.length !== TEAM_PLAYER_COUNT}>
                            Save Team
                        </Button>
                        <Button
                            colorScheme="green"
                            leftIcon={<Text className="bi bi-cursor" />} // candidates: magic, stars,
                            onClick={() => -1}
                            disabled={players.length !== TEAM_PLAYER_COUNT}>
                            Optimize Team
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Home;
