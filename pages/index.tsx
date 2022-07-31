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
import FormationsAccordion from "../components/FormationsAccordion";
import PlayerList from "../components/PlayerList";
import {
    DefaultSelectedFormations,
    FormationOptions,
    TeamPlayerCount
} from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { PlayerDto } from "../types/player-dto.interface";

const Home: NextPage = () => {
    const { players, setPlayers, shouldUseManager, setShouldUseManager } =
        useActiveTeam();
    const [selectedFormations, setSelectedFormations] = useState(
        DefaultSelectedFormations
    );

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
                players={players}
                shouldUseManager={shouldUseManager}
                disabled={!canOptimize()}
            />
        </Stack>
    );
};

const OptimizeTeamBtn = ({
    players,
    shouldUseManager,
    disabled
}: {
    players: (PlayerDto | null)[];
    shouldUseManager: boolean;
    disabled: boolean;
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
                disabled={disabled}>
                Optimize Team
            </Button>
        </Link>
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
        <Flex alignItems="center" justifyContent="center" gap={4}>
            <FormLabel m={0}>Use manager</FormLabel>
            <Switch
                size="lg"
                colorScheme="green"
                defaultChecked={isOn}
                checked={isOn}
                onChange={(e) => setIsOn(e.target.checked)}
            />
        </Flex>
    );
};

export default Home;
