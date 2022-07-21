import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import AddPlayerModal from "../components/AddPlayerModal";
import PlayerList from "../components/PlayerList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PlayerDto } from "../types/player-dto.interface";

const TEAM_STORAGE_KEY = "OPTIFUT_CURRENT_TEAM";
const MAX_PLAYER_COUNT = 11;

const Home: NextPage = () => {
    const [players, setPlayers] = useLocalStorage<PlayerDto[]>(
        TEAM_STORAGE_KEY,
        []
    );

    const deletePlayerAt = (index: number) => {
        setPlayers((prev) => {
            prev.splice(index, 1);
            return [...prev];
        });
    };

    const editPlayerAt = (index: number) => {};

    const addPlayer = (player: PlayerDto) => {
        setPlayers((prev) => [...prev, player]);
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
                    <AddPlayerModal
                        onPlayerAdded={addPlayer}
                        disabled={players.length >= MAX_PLAYER_COUNT}
                    />
                </Stack>
            </Box>
        </Flex>
    );
};

export default Home;
