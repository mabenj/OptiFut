import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import PlayerEditorModal from "../components/PlayerEditorModal";
import PlayerList from "../components/PlayerList";
import { DefaultEditorValues } from "../data/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PlayerDto } from "../types/player-dto.interface";
import { PlayerEditorValues } from "../types/player-editor-values";

const TEAM_STORAGE_KEY = "OPTIFUT_CURRENT_TEAM";
const MAX_PLAYER_COUNT = 11;

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

    return (
        <Flex justifyContent="center" height="100vh">
            <Box width={["95%", "80%", "60%", "40%"]}>
                <Stack spacing={10}>
                    <Heading>OptiFut</Heading>
                    <PlayerList
                        players={players}
                        onEditPlayer={editPlayerAt}
                        onRemovePlayer={deletePlayerAt}
                    />
                    <Button
                        leftIcon={<AddIcon />}
                        onClick={() => editPlayerAt(-1)}
                        disabled={players.length >= MAX_PLAYER_COUNT}>
                        Add Player
                    </Button>
                    <PlayerEditorModal
                        isOpen={isEditorOpen}
                        closeModal={closeEditor}
                        onPlayerAdded={addPlayer}
                        prefillValues={editorDefaults}
                    />
                </Stack>
            </Box>
        </Flex>
    );
};

export default Home;
