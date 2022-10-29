import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { PlayerInfo } from "../types/player-info.interface";
import ClubImage from "./image-icons/ClubImage";
import LeagueImage from "./image-icons/LeagueImage";
import NationImage from "./image-icons/NationImage";
import CustomTooltip from "./ui/CustomTooltip";

interface PlayerInfoComponentProps {
    player: PlayerInfo;
}

export default function PlayerInfoComponent({
    player
}: PlayerInfoComponentProps) {
    return (
        <Flex alignItems="center">
            <VStack>
                <CustomTooltip label="Current position" placement="top">
                    <Heading
                        as="h3"
                        size="md"
                        color="gray.500"
                        cursor="default"
                        w="4rem"
                        textAlign="center">
                        {player.prefPosition}
                    </Heading>
                </CustomTooltip>
                <CustomTooltip
                    label={
                        player.altPositions.length
                            ? "Alternative positions"
                            : undefined
                    }
                    placement="bottom">
                    <Heading
                        as="h4"
                        size="xs"
                        color="gray.500"
                        cursor="default"
                        w="4rem"
                        textAlign="center">
                        {player.altPositions.join(", ") || <wbr />}
                    </Heading>
                </CustomTooltip>
            </VStack>
            <Box ml={4}>
                <Heading as="h3" size="sm">
                    {player.name}
                </Heading>
                <HStack mt={2} spacing={2}>
                    <NationImage id={player.nationId} sizePx={35} />
                    <Box>
                        <LeagueImage id={player.leagueId} sizePx={25} />
                    </Box>
                    <ClubImage id={player.clubId} sizePx={25} />
                </HStack>
            </Box>
        </Flex>
    );
}
