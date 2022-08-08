import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Stack,
    Switch,
    Text
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import FormationsAccordion from "../components/FormationsAccordion";
import PlayerList from "../components/PlayerList";
import {
    DefaultSelectedFormations,
    FormationOptions,
    TeamPlayerCount
} from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { useOptimizer } from "../hooks/useOptimizer";
import { FormationId } from "../types/formation-id";
import { PlayerInfo } from "../types/player-info.interface";

const Home: NextPage = () => {
    const { players, setPlayers, shouldUseManager, setShouldUseManager } =
        useActiveTeam();
    const [selectedFormations, setSelectedFormations] = useState(
        DefaultSelectedFormations
    );
    const { optimize, optimizedFormations } = useOptimizer();

    const canOptimize = () => {
        if (
            players.length !== TeamPlayerCount ||
            players.some((player) => player === null) ||
            Object.values(selectedFormations).every((isSelected) => !isSelected)
        ) {
            return false;
        }
        return true;
    };

    const startOptimizing = async () => {
        const formationsToUse = Object.keys(selectedFormations).filter(
            (formationId) => selectedFormations[formationId as FormationId]
        ) as FormationId[];
        optimize(
            players.filter((player): player is PlayerInfo => player !== null),
            formationsToUse,
            shouldUseManager
        );
    };

    return (
        <Stack spacing={5}>
            <PlayerList players={players} onChange={setPlayers} />
            <FormationsAccordion
                selectedFormations={selectedFormations}
                onChange={setSelectedFormations}
            />
            <ManagerSwitch
                isOn={shouldUseManager}
                setIsOn={setShouldUseManager}
            />
            <OptimizeTeamBtn
                disabled={!canOptimize()}
                onClick={startOptimizing}
            />
            {optimizedFormations.map((formation) => (
                <Box key={formation.formationId} my={2}>
                    <Heading as="h5" size="md">
                        {
                            FormationOptions.find(
                                (f) => f.id === formation.formationId
                            )?.displayName
                        }
                    </Heading>
                    <Box>Total Chemistry: {formation.teamChemistry}</Box>
                    {formation.manager && (
                        <Box>
                            Manager nationality:{" "}
                            {formation.manager.nationalityId}
                            <br />
                            Manager league: {formation.manager.leagueId}
                        </Box>
                    )}
                    <Box>
                        {formation.players.map((player) => (
                            <Box key={player.id}>
                                <strong>{player.name}</strong>
                                <br />
                                Chemistry: {player.chemistry}
                                <br />
                                Position from {player.originalPosition} to{" "}
                                {player.newPosition}
                                <br />
                                Position in squad: {player.positionNodeId}
                                <br />
                                Has loyalty: {player.hasLoyalty}
                                <br />
                                Position modifications:{" "}
                                {player.positionModificationsCount}
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};

const OptimizeTeamBtn = ({
    disabled,
    onClick
}: {
    disabled: boolean;
    onClick: () => void;
}) => {
    return (
        <Button
            colorScheme="green"
            leftIcon={<Text className="bi bi-cursor" />} // candidates: magic, stars,
            onClick={onClick}
            disabled={disabled}>
            Optimize Team
        </Button>
    );
};

const ManagerSwitch = ({
    isOn,
    setIsOn
}: {
    isOn: boolean;
    setIsOn: (isOn: boolean) => any;
}) => {
    return (
        <FormControl>
            <Flex alignItems="center" justifyContent="center" gap={4}>
                <FormLabel m={0} cursor="pointer">
                    Use manager
                </FormLabel>
                <Switch
                    size="lg"
                    colorScheme="green"
                    isChecked={isOn}
                    onChange={(e) => setIsOn(e.target.checked)}
                />
            </Flex>
        </FormControl>
    );
};

export default Home;
