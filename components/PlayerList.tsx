import {
    AddIcon,
    EditIcon,
    ExternalLinkIcon,
    RepeatIcon,
    SmallCloseIcon
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { DefaultEditorValues } from "../data/constants";
import { PlayerDto } from "../types/player-dto.interface";
import { PlayerEditorValues } from "../types/player-editor-values";
import PlayerEditorModal from "./PlayerEditorModal";
import PlayerInfo from "./PlayerInfo";
import CustomTooltip from "./ui/CustomTooltip";

interface PlayerListProps {
    players: (PlayerDto | null)[];
    onChange: (players: (PlayerDto | null)[]) => any;
}

export default function PlayerList({ players, onChange }: PlayerListProps) {
    const [editorPrefillValues, setEditorPrefillValues] =
        useState<PlayerEditorValues>(DefaultEditorValues);
    const [editIndex, setEditIndex] = useState(0);

    const {
        isOpen: isEditorOpen,
        onOpen: openEditor,
        onClose: closeEditor
    } = useDisclosure();

    const resetTeam = () => {
        onChange(new Array(players.length).fill(null));
    };

    const editPlayer = (index: number) => {
        const player = players[index];
        if (player === null) {
            setEditorPrefillValues(DefaultEditorValues);
        } else {
            setEditorPrefillValues({
                name: player.name,
                version: player.version,
                position: player.position,
                hasLoyalty: player.hasLoyalty,
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
            position,
            hasLoyalty,
            nationId,
            leagueId,
            clubId
        } = editorValues;
        players[editIndex] = {
            name,
            version,
            position,
            hasLoyalty,
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
                <Heading as="h2" size="lg" mb={5}>
                    <Text>Active Team</Text>
                </Heading>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<Text className="bi bi-three-dots-vertical" />}
                        variant="ghost"
                    />
                    <MenuList>
                        <MenuItem icon={<RepeatIcon />} onClick={resetTeam}>
                            Reset Team
                        </MenuItem>
                        <Link href="/saved-teams">
                            <MenuItem icon={<ExternalLinkIcon />}>
                                View Saved Teams
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Flex>
            <VStack align="stretch" spacing={2}>
                {players.map((player, i) => (
                    <Box
                        key={i}
                        bg={player !== null ? "gray.100" : undefined}
                        rounded="xl"
                        border={player !== null ? "1px" : undefined}
                        borderColor={player !== null ? "gray.200" : undefined}
                        _hover={{
                            backgroundColor:
                                player !== null ? "gray.200" : undefined
                        }}>
                        <Box>
                            {!!player ? (
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    w="100%"
                                    py={3}
                                    px={4}>
                                    <PlayerInfo player={player} />
                                    <Box>
                                        <CustomTooltip label="Edit player">
                                            <IconButton
                                                variant="ghost"
                                                aria-label="Edit player"
                                                size="lg"
                                                icon={<EditIcon />}
                                                onClick={() => editPlayer(i)}
                                            />
                                        </CustomTooltip>
                                        <RemovePlayerBtn
                                            playerName={player.name}
                                            onRemove={() => removePlayer(i)}
                                        />
                                    </Box>
                                </Flex>
                            ) : (
                                <EmptyPlayerSlot
                                    onClick={() => editPlayer(i)}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}

const EmptyPlayerSlot = ({ onClick }: { onClick: () => any }) => {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            rounded="xl"
            leftIcon={<AddIcon />}
            p={7}
            m={0}
            w="100%"
            h="100%">
            Add Player
        </Button>
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
                                <Button variant="outline" onClick={onClose}>
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
