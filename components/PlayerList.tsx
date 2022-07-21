import { SmallCloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Flex,
    Heading,
    HStack,
    IconButton,
    Text,
    VStack
} from "@chakra-ui/react";
import ClubImage from "../components/ClubImage";
import LeagueImage from "../components/LeagueImage";
import NationImage from "../components/NationImage";
import { PlayerDto } from "../types/player-dto.interface";
import CustomTooltip from "./ui/CustomTooltip";

interface PlayerListProps {
    players: PlayerDto[];
    onEditPlayer: (index: number) => any;
    onRemovePlayer: (index: number) => any;
}

export default function PlayerList({
    players,
    onEditPlayer,
    onRemovePlayer
}: PlayerListProps) {
    return (
        <VStack align="stretch" spacing={0}>
            {players.map((player, i) => (
                <Box key={player.name + i} _hover={{ background: "gray.50" }}>
                    {i !== 0 && <Divider />}
                    <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        py={2}>
                        <Flex alignItems="center">
                            <VStack>
                                <Heading
                                    as="h3"
                                    size="sm"
                                    color="gray.500"
                                    cursor="default"
                                    w="3rem"
                                    textAlign="center">
                                    <CustomTooltip
                                        label="Position"
                                        placement="top">
                                        {player.position}
                                    </CustomTooltip>
                                </Heading>
                                <CustomTooltip
                                    label={
                                        player.hasLoyalty
                                            ? "Has loyalty"
                                            : "No loyalty"
                                    }>
                                    {player.hasLoyalty ? (
                                        <Text
                                            className="bi-shield-fill-check"
                                            color="green.600"
                                        />
                                    ) : (
                                        <Text
                                            className="bi-shield-slash-fill"
                                            color="gray.600"
                                        />
                                    )}
                                </CustomTooltip>
                            </VStack>
                            <Box ml={4}>
                                <Heading as="h3" size="sm">
                                    {player.name}
                                </Heading>
                                <HStack mt={2} spacing={2}>
                                    <NationImage
                                        id={player.nationId}
                                        sizePx={35}
                                    />
                                    <Box>
                                        <LeagueImage
                                            id={player.leagueId}
                                            sizePx={25}
                                        />
                                    </Box>
                                    <ClubImage id={player.clubId} sizePx={25} />
                                </HStack>
                            </Box>
                        </Flex>
                        <Box>
                            <CustomTooltip label="Edit player">
                                <IconButton
                                    variant="ghost"
                                    aria-label="Edit player"
                                    size="lg"
                                    icon={<Text className="bi-pencil-square" />}
                                    onClick={() => onEditPlayer(i)}
                                />
                            </CustomTooltip>
                            <CustomTooltip label="Remove player">
                                {/* TODO: add popover: are you sure? */}
                                <IconButton
                                    variant="ghost"
                                    aria-label="Remove player"
                                    title="Remove player"
                                    size="lg"
                                    icon={<SmallCloseIcon />}
                                    onClick={() => onRemovePlayer(i)}
                                />
                            </CustomTooltip>
                        </Box>
                    </Flex>
                </Box>
            ))}
        </VStack>
    );
}
