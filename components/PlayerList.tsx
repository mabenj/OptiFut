import {
    AddIcon,
    CheckIcon,
    DownloadIcon,
    EditIcon,
    ExternalLinkIcon,
    RepeatIcon,
    SmallCloseIcon
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Input,
    InputGroup,
    Menu,
    MenuDivider,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { DefaultEditorValues, TeamPlayerCount } from "../data/constants";
import { useSavedTeam } from "../hooks/useSavedTeam";
import { PlayerEditorValues } from "../types/player-editor-values.interface";
import { PlayerInfo } from "../types/player-info.interface";
import { notEmpty } from "../utils/utils";
import ClubImage from "./image-icons/ClubImage";
import LeagueImage from "./image-icons/LeagueImage";
import NationImage from "./image-icons/NationImage";
import PlayerEditorModal from "./PlayerEditorModal";
import CustomTooltip from "./ui/CustomTooltip";

interface PlayerListProps {
    players: (PlayerInfo | null)[];
    onChange: (players: (PlayerInfo | null)[]) => any;
}

export default function PlayerList({ players, onChange }: PlayerListProps) {
    const [editorPrefillValues, setEditorPrefillValues] =
        useState<PlayerEditorValues>(DefaultEditorValues);
    const [editIndex, setEditIndex] = useState(0);

    const { addSavedTeam } = useSavedTeam();
    const toast = useToast();

    const {
        isOpen: isEditorOpen,
        onOpen: openEditor,
        onClose: closeEditor
    } = useDisclosure();

    const saveCurrentTeam = (teamName: string) => {
        if (players.length !== TeamPlayerCount) {
            return;
        }
        addSavedTeam({
            name: teamName,
            players: players.filter(notEmpty)
        }).then(() =>
            toast({
                title: "Team Saved",
                description: `Team '${teamName}' saved successfully`,
                duration: 9000,
                isClosable: true,
                status: "success"
            })
        );
    };

    const resetTeam = () => {
        onChange(new Array(players.length).fill(null));
    };

    const canSaveTeam =
        players.length == TeamPlayerCount &&
        players.every((player) => player !== null);

    const editPlayer = (index: number) => {
        const player = players[index];
        if (player === null) {
            setEditorPrefillValues(DefaultEditorValues);
        } else {
            setEditorPrefillValues({
                name: player.name,
                version: player.version,
                prefPosition: player.prefPosition,
                altPositions: player.altPositions,
                nationId: player.nationId,
                leagueId: player.leagueId,
                clubId: player.clubId
            });
        }
        setEditIndex(index);
        openEditor();
    };

    const addPlayer = (editorValues: PlayerEditorValues) => {
        const {
            name,
            version,
            prefPosition,
            altPositions,
            nationId,
            leagueId,
            clubId
        } = editorValues;
        players[editIndex] = {
            name,
            version,
            prefPosition,
            altPositions,
            nationId: nationId!,
            leagueId: leagueId!,
            clubId: clubId!
        };
        onChange([...players]);
    };

    const removePlayer = (index: number) => {
        players[index] = null;
        onChange([...players]);
    };

    return (
        <Box>
            <PlayerEditorModal
                isOpen={isEditorOpen}
                closeModal={closeEditor}
                onPlayerAdded={addPlayer}
                prefillValues={editorPrefillValues}
            />
            <Flex justifyContent="space-between">
                <Menu>
                    {/* <MenuButton
                        as={IconButton}
                        icon={
                            <Text
                                className="bi bi-three-dots-vertical"
                                fontSize="xl"
                            />
                        }
                        variant="ghost"
                        rounded="full"
                    /> */}
                    <MenuList>
                        <SaveTeamMenuItem
                            disabled={!canSaveTeam}
                            onSave={saveCurrentTeam}
                        />
                        <Link href="/saved-teams">
                            <MenuItem icon={<ExternalLinkIcon />}>
                                View Saved Teams
                            </MenuItem>
                        </Link>
                        <MenuDivider />
                        <MenuItem icon={<RepeatIcon />} onClick={resetTeam}>
                            Reset Team
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <VStack spacing={0}>
                {players.map((player, index) => (
                    <React.Fragment key={index}>
                        {player === null ? (
                            <EmptyPlayerSlot
                                key={index}
                                onClick={() => editPlayer(index)}
                            />
                        ) : (
                            <PlayerItem
                                player={player}
                                onEdit={() => editPlayer(index)}
                                onRemove={() => removePlayer(index)}
                            />
                        )}
                        {player != null || players[index + 1] != null ? (
                            <Divider />
                        ) : null}
                    </React.Fragment>
                ))}
            </VStack>
        </Box>
    );
}

const EmptyPlayerSlot = ({ onClick }: { onClick: () => any }) => {
    return (
        <Box w="100%">
            <Button
                onClick={onClick}
                variant="outline"
                rounded="xl"
                bg="gray.50"
                leftIcon={<AddIcon />}
                p={5}
                m={0}
                my={4}
                w="100%">
                Add Player
            </Button>
        </Box>
    );
};

const PlayerItem = ({
    player,
    onEdit,
    onRemove
}: {
    player: PlayerInfo;
    onEdit: () => any;
    onRemove: () => any;
}) => {
    return (
        <Grid
            templateColumns="20fr 60fr 20fr"
            py={2}
            w="100%"
            _hover={{ backgroundColor: "gray.50" }}>
            <VStack spacing={0} color="gray.600">
                <CustomTooltip label="Current position" placement="top">
                    <Box fontSize="sm" fontWeight="semibold">
                        {player.prefPosition}
                    </Box>
                </CustomTooltip>
                <CustomTooltip label="Alternative positions" placement="bottom">
                    <Box fontSize="sm">{player.altPositions.join(", ")}</Box>
                </CustomTooltip>
            </VStack>
            <Box overflow="hidden" fontSize="sm">
                <Truncated>{player.name}</Truncated>
                <Flex gap={2} alignItems="center" mt={2}>
                    <NationImage id={player.nationId} sizePx={25} />
                    <LeagueImage id={player.leagueId} sizePx={20} />
                    <ClubImage id={player.clubId} sizePx={20} />
                </Flex>
            </Box>
            <Box>
                <Flex justifyContent="flex-end">
                    <CustomTooltip label="Edit player">
                        <IconButton
                            rounded="full"
                            variant="ghost"
                            aria-label="Edit player"
                            size="lg"
                            icon={<EditIcon />}
                            onClick={onEdit}
                        />
                    </CustomTooltip>
                    <RemovePlayerBtn
                        playerName={player.name}
                        onRemove={onRemove}
                    />
                </Flex>
            </Box>
        </Grid>
    );
};

const RemovePlayerBtn = ({
    playerName,
    onRemove
}: {
    playerName: string;
    onRemove: () => any;
}) => {
    return (
        <Popover>
            {({ onClose }) => (
                <>
                    <CustomTooltip label="Remove player">
                        <Box display="inline-block">
                            <PopoverTrigger>
                                <IconButton
                                    rounded="full"
                                    variant="ghost"
                                    aria-label="Remove player"
                                    size="lg"
                                    icon={<SmallCloseIcon />}
                                />
                            </PopoverTrigger>
                        </Box>
                    </CustomTooltip>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody textAlign="center">
                            <Box mb={3}>
                                Are you sure you want to remove <br />
                                <strong>{playerName}</strong>?
                            </Box>
                            <ButtonGroup size="sm">
                                <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={() => {
                                        onRemove();
                                        onClose();
                                    }}>
                                    Remove
                                </Button>
                            </ButtonGroup>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};

const SaveTeamMenuItem = ({
    disabled,
    onSave
}: {
    disabled: boolean;
    onSave: (teamName: string) => any;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [teamName, setTeamName] = useState("");
    const initialRef = useRef(null);

    return (
        <>
            <MenuItem
                icon={<DownloadIcon />}
                disabled={disabled}
                pointerEvents={disabled ? "none" : undefined}
                color={disabled ? "gray.400" : undefined}
                title={disabled ? "Not enough players" : undefined}
                onClick={disabled ? undefined : onOpen}>
                Save Team
            </MenuItem>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Save Team</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSave(teamName);
                                onClose();
                            }}
                            id="teamNameForm">
                            <FormControl>
                                <FormLabel htmlFor="savedTeamName" hidden>
                                    Team Name
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        ref={initialRef}
                                        id="savedTeamName"
                                        name="savedTeamName"
                                        placeholder="Enter team name"
                                        onChange={(e) =>
                                            setTeamName(e.target.value)
                                        }
                                        required
                                        autoComplete="off"
                                    />
                                </InputGroup>
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="green"
                            leftIcon={<CheckIcon />}
                            type="submit"
                            form="teamNameForm">
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const Truncated = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            fontWeight="bold"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis">
            {children}
        </Box>
    );
};
