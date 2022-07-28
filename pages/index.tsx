import {
    Box,
    Button,
    Flex,
    FormLabel,
    Heading,
    Stack,
    Switch,
    Text
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import PlayerList from "../components/PlayerList";
import { TeamPlayerCount } from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { PlayerDto } from "../types/player-dto.interface";

const Home: NextPage = () => {
    const { players, setPlayers, shouldUseManager, setShouldUseManager } =
        useActiveTeam();

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
                    
                    <Flex alignItems="center" justifyContent="center" gap={4}>
                        <FormLabel m={0}>Use manager?</FormLabel>
                        <Switch
                            size="lg"
                            colorScheme="green"
                            checked={shouldUseManager}
                            onChange={() =>
                                setShouldUseManager((prev) => !prev)
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

export default Home;
