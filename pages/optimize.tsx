import { useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TeamPlayerCount } from "../data/constants";
import { PlayerDto } from "../types/player-dto.interface";
import { getErrorMessage } from "../utils/utils";

const ERROR_TOAST_ID = "optimize-toast-error";

const Optimize: NextPage = () => {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [players, setPlayers] = useState<PlayerDto[]>([]);
    const [shouldUseManager, setShouldUseManager] = useState(false);

    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        try {
            const { players: playersString, useManager: useManagerString } =
                router.query;
            const players = JSON.parse(playersString as string);
            const useManager = Boolean(useManagerString);
            if (players.length !== TeamPlayerCount) {
                throw new Error("Incorrect amount of players in the team");
            }
            // setPlayers(players);
            // setShouldUseManager(useManager);
            optimize(players, useManager);
        } catch (error) {
            !toast.isActive(ERROR_TOAST_ID) &&
                toast({
                    id: ERROR_TOAST_ID,
                    title: "Error parsing parameters",
                    description: getErrorMessage(error),
                    status: "error",
                    duration: 9000,
                    isClosable: true
                });
            router.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    const optimize = (players: PlayerDto[], shouldUseManager: boolean) => {
        if (isOptimizing) {
            return;
        }
        setIsOptimizing(true);
        toast({
            title: "Optimization started",
            status: "success",
            duration: 9000,
            isClosable: true
        });
    };

    return <h1>Optimize</h1>;
};

export default Optimize;
