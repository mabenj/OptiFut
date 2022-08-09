import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { FormationOptions } from "../data/constants";
import { FormationInfo } from "../optimizer/types/formation-info";

interface FormationResultsProps {
    results: FormationInfo[];
    isOptimizing: boolean;
    onReset: () => void;
    onStop: () => void;
}

export default function FormationResults({
    results,
    isOptimizing,
    onReset
}: FormationResultsProps) {
    return (
        <Box>
            <Button onClick={onReset} leftIcon={<ArrowBackIcon />} mb={2}>
                Back
            </Button>
            <Heading as="h2" size="lg">
                Optimized Formations {isOptimizing && <Spinner />}
            </Heading>
            {results.map((formation) => (
                <Box key={formation.formationId} my={4} p={2} bg="gray.300">
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
                                Has loyalty: {player.hasLoyalty ? "yes" : "no"}
                                <br />
                                Position modifications:{" "}
                                {player.positionModificationsCount}
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
