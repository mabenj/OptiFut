import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Stack,
    Switch,
    Text
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Pool, spawn, Worker } from "threads";
import FormationsAccordion from "../components/FormationsAccordion";
import PlayerList from "../components/PlayerList";
import { DefaultSelectedFormations, TeamPlayerCount } from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { FormationId } from "../types/formation-id";
import { PlayerDto } from "../types/player-dto.interface";
import { ChemistryOptimizerWorker } from "../workers/optimizer.worker";

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

    const optimize = async () => {
        console.log("[creating thread pool]");
        const threadPool = Pool(() =>
            spawn<ChemistryOptimizerWorker>(
                new Worker(
                    // @ts-ignore
                    new URL("../workers/optimizer.worker", import.meta.url)
                )
            )
        );

        ["442"].forEach((formationId) => {
            threadPool.queue(async (optimizer) => {
                console.time(`[optimizer ${formationId}]`);
                const result = await optimizer.start(
                    players as PlayerDto[],
                    formationId as FormationId,
                    shouldUseManager
                );
                console.timeEnd(`[optimizer ${formationId}]`);
                console.log("manager", result.manager);
                console.log("total chem", result.teamChemistry);
                console.table(result.players);
                // alert(JSON.stringify(result));
            });
        });

        await threadPool.completed();
        console.log("[terminating thread pool]");
        await threadPool.terminate();
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
                onClick={optimize}
            />
        </Stack>
    );
};

const OptimizeTeamBtn = ({
    players,
    shouldUseManager,
    disabled,
    onClick
}: {
    players: (PlayerDto | null)[];
    shouldUseManager: boolean;
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
