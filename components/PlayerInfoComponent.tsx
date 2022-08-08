import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
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
                <Heading
                    as="h3"
                    size="sm"
                    color="gray.500"
                    cursor="default"
                    w="3rem"
                    textAlign="center">
                    {player.position}
                </Heading>
                <CustomTooltip
                    label={player.hasLoyalty ? "Has loyalty" : "No loyalty"}>
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
