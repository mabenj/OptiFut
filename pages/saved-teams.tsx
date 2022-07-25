import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
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
    useToast,
    VStack
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import PlayerInfo from "../components/PlayerInfo";
import { useActiveTeam } from "../hooks/useActiveTeam";
import { useSavedTeam } from "../hooks/useSavedTeam";
import { PlayerDto } from "../types/player-dto.interface";

const SavedTeams: NextPage = () => {
    const { savedTeams, deleteSavedTeam } = useSavedTeam();
    const { setPlayers } = useActiveTeam();

    const router = useRouter();
    const toast = useToast();

    const setActiveTeam = (players: PlayerDto[], teamName: string) => {
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
        <VStack>
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
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <Stack
                                spacing={3}
                                divider={
                                    <StackDivider borderColor="gray.200" />
                                }>
                                {team.players.map((player, index) => (
                                    <PlayerInfo key={index} player={player} />
                                ))}
                            </Stack>
                            <ButtonGroup mt={10} w="100%">
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
                                    variant="outline"
                                    onClick={() =>
                                        setActiveTeam(team.players, team.name)
                                    }
                                    leftIcon={<CheckIcon />}>
                                    Set Active
                                </Button>
                            </ButtonGroup>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </VStack>
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
                            w="50%"
                            colorScheme="red"
                            variant="outline"
                            leftIcon={<DeleteIcon />}>
                            Delete Team
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
                                <Button variant="outline" onClick={onClose}>
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
