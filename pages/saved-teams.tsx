import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Alert,
    AlertIcon,
    Box,
    Button,
    ButtonGroup,
    Heading,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    StackDivider,
    useToast
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { useSavedTeam } from "../hooks/useSavedTeam";
import { PlayerInfo } from "../types/player-info.interface";

const SavedTeams: NextPage = () => {
    const { savedTeams, deleteSavedTeam } = useSavedTeam();
    const { setPlayers } = useActiveTeam();

    const router = useRouter();
    const toast = useToast();

    const setActiveTeam = (players: PlayerInfo[], teamName: string) => {
        setPlayers(players);
        toast({
            title: `Team '${teamName}' set as active team`,
            duration: 3000,
            isClosable: true,
            status: "success"
        });
        router.push("/");
    };

    return (
        <Stack>
            <Heading as="h2" size="md" mb={3}>
                Saved Teams
            </Heading>
            <Accordion w="100%" allowToggle>
                {savedTeams.map((team) => (
                    <AccordionItem key={team.id}>
                        <AccordionButton
                            display="flex"
                            justifyContent="space-between">
                            <Heading as="h3" size="sm" py={2}>
                                {team.name}
                            </Heading>
                            <ButtonGroup display="flex" alignItems="center">
                                <DeleteTeamBtn
                                    teamName={team.name}
                                    onDelete={() =>
                                        deleteSavedTeam(team.id!).then(() =>
                                            toast({
                                                title: `Team '${team.name}' deleted`,
                                                status: "success",
                                                duration: 9000,
                                                isClosable: true
                                            })
                                        )
                                    }
                                />
                                <Button
                                    w="50%"
                                    colorScheme="green"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTeam(team.players, team.name);
                                    }}
                                    leftIcon={<CheckIcon />}>
                                    Set Active
                                </Button>
                                <AccordionIcon />
                            </ButtonGroup>
                        </AccordionButton>
                        <AccordionPanel>
                            <Stack
                                mt={4}
                                spacing={3}
                                divider={
                                    <StackDivider borderColor="gray.200" />
                                }>
                                {team.players.map(
                                    (player, index) =>
                                        //TODO
                                        // <PlayerInfoComponent
                                        //     key={index}
                                        //     player={player}
                                        // />
                                        player.name
                                )}
                            </Stack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
                {savedTeams.length === 0 && (
                    <Alert status="warning">
                        <AlertIcon />
                        No saved teams were found.
                    </Alert>
                )}
            </Accordion>
        </Stack>
    );
};

export default SavedTeams;

const DeleteTeamBtn = ({
    teamName,
    onDelete
}: {
    teamName: string;
    onDelete: () => any;
}) => {
    return (
        <Popover>
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button
                            leftIcon={<DeleteIcon />}
                            size="sm"
                            colorScheme="red"
                            onClick={(e) => e.stopPropagation()}>
                            Delete
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody textAlign="center">
                            <Box mb={3}>
                                Are you sure you want to delete team <br />
                                <strong>{teamName}</strong>?
                            </Box>
                            <ButtonGroup size="sm">
                                <Button
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClose();
                                    }}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={onDelete}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};
