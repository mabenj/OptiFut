import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    SimpleGrid,
    Switch,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import FormationResults from "../components/FormationResults";
import FormationsAccordion from "../components/FormationsAccordion";
import PlayerList from "../components/PlayerList";
import { DefaultSelectedFormations, TeamPlayerCount } from "../data/constants";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { useOptimizer } from "../hooks/useOptimizer";
import { FormationId } from "../types/formation-id";
import { notEmpty } from "../utils/utils";

const Home: NextPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { players, setPlayers, shouldUseManager, setShouldUseManager } =
        useActiveTeam();
    const [selectedFormations, setSelectedFormations] = useState(
        DefaultSelectedFormations
    );
    const {
        optimize,
        optimizedFormations,
        resetOptimizer,
        isOptimizing,
        stopOptimizer
    } = useOptimizer();

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
        optimize(players.filter(notEmpty), formationsToUse, shouldUseManager);
    };

    return (
        <>
            <Tabs
                index={tabIndex}
                onChange={setTabIndex}
                colorScheme="green"
                size="md"
                isFitted>
                <TabList color="gray.600">
                    <Tab>
                        <Heading size="md" as="h2">
                            Team
                        </Heading>
                    </Tab>
                    <Tab>
                        <Heading size="md" as="h2">
                            Results
                        </Heading>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <SimpleGrid columns={[1, 1, 3]}>
                            <GridItem colSpan={2}>
                                <PlayerList
                                    players={players}
                                    onChange={setPlayers}
                                />
                            </GridItem>
                            <GridItem>
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
                            </GridItem>
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel p={0}>
                        <FormationResults
                            results={optimizedFormations}
                            isOptimizing={isOptimizing}
                            onReset={resetOptimizer}
                            onStop={stopOptimizer}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
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
