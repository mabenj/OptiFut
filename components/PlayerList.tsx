import {
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
    StackDivider,
    Text,
    VStack
} from "@chakra-ui/react";
import Link from "next/link";
import { PlayerDto } from "../types/player-dto.interface";
import PlayerInfo from "./PlayerInfo";
import CustomTooltip from "./ui/CustomTooltip";

interface PlayerListProps {
    players: PlayerDto[];
    onEditPlayer: (index: number) => any;
    onRemovePlayer: (index: number) => any;
    onResetTeam: () => any;
}

export default function PlayerList({
    players,
    onEditPlayer,
    onRemovePlayer,
    onResetTeam
}: PlayerListProps) {
    return (
        <Box>
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
                        <MenuItem icon={<RepeatIcon />} onClick={onResetTeam}>
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
            <VStack align="stretch" spacing={0} divider={<StackDivider />}>
                {players.map((player, i) => (
                    <Box
                        key={player.name + i}
                        _hover={{ background: "gray.50" }}>
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            py={3}>
                            <PlayerInfo player={player} />
                            <Box>
                                <CustomTooltip label="Edit player">
                                    <IconButton
                                        variant="ghost"
                                        aria-label="Edit player"
                                        size="lg"
                                        icon={<EditIcon />}
                                        onClick={() => onEditPlayer(i)}
                                    />
                                </CustomTooltip>
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
                                                            icon={
                                                                <SmallCloseIcon />
                                                            }
                                                        />
                                                    </PopoverTrigger>
                                                </Box>
                                            </CustomTooltip>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverBody textAlign="center">
                                                    <Box mb={3}>
                                                        Are you sure you want to
                                                        remove <br />
                                                        <strong>
                                                            {players[i].name}
                                                        </strong>
                                                        ?
                                                    </Box>
                                                    <ButtonGroup size="sm">
                                                        <Button
                                                            variant="outline"
                                                            onClick={onClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            colorScheme="red"
                                                            onClick={() =>
                                                                onRemovePlayer(
                                                                    i
                                                                )
                                                            }>
                                                            Remove
                                                        </Button>
                                                    </ButtonGroup>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </>
                                    )}
                                </Popover>
                            </Box>
                        </Flex>
                    </Box>
                ))}
                {!players.length && (
                    <Text as="em" textAlign="center">
                        No players in the team.
                    </Text>
                )}
            </VStack>
        </Box>
    );
}
