import { Box, Flex, Tag, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { PositionNodeId } from "../optimizer/types/position-node-id.type";
import { PositionValue } from "../optimizer/types/position-value.enum";
import CustomTooltip from "./ui/CustomTooltip";

const CARD_WIDTH = "65px";

interface LineupPlayer {
    name: string;
    chemistry: number;
    originalPosition: string;
    finalPosition: string;
    positionNode: PositionNodeId;
}

interface PlayerLineupProps {
    lineup: LineupPlayer[];
}

export default function PlayerLineup({ lineup }: PlayerLineupProps) {
    return (
        <VStack bg="green.200" spacing={5} p={5} borderRadius="md">
            {/* FORWARDS */}
            <LineupRow narrow>
                {getPlayerCard(lineup, "LW")}
                {getPlayerCard(lineup, "LF")}

                {getPlayerCard(lineup, "LST")}
                {getPlayerCard(lineup, "ST")}
                {getPlayerCard(lineup, "RST")}

                {getPlayerCard(lineup, "RF")}
                {getPlayerCard(lineup, "RW")}
            </LineupRow>

            {/* CF*/}
            <LineupRow narrow>{getPlayerCard(lineup, "CF")}</LineupRow>

            {/* UPPER MIDFIELD */}
            <LineupRow narrow>
                {getPlayerCard(lineup, "LCAM")}
                {getPlayerCard(lineup, "CAM")}
                {getPlayerCard(lineup, "RCAM")}
            </LineupRow>

            {/* MIDFIELD */}
            <LineupRow narrow>
                {getPlayerCard(lineup, "LM")}
                {getPlayerCard(lineup, "LCM")}
                {getPlayerCard(lineup, "CM")}
                {getPlayerCard(lineup, "RCM")}
                {getPlayerCard(lineup, "RM")}
            </LineupRow>

            {/* LOWER MIDFIELD */}
            <LineupRow narrow>
                {getPlayerCard(lineup, "LCDM")}
                {getPlayerCard(lineup, "CDM")}
                {getPlayerCard(lineup, "RCDM")}
            </LineupRow>

            {/* DEFENDERS */}
            <LineupRow narrow>
                {getPlayerCard(lineup, "LWB")}
                {getPlayerCard(lineup, "LB")}

                {getPlayerCard(lineup, "LCB")}
                {getPlayerCard(lineup, "CB")}
                {getPlayerCard(lineup, "RCB")}

                {getPlayerCard(lineup, "RB")}
                {getPlayerCard(lineup, "RWB")}
            </LineupRow>

            {/* KEEPER */}
            <LineupRow narrow>{getPlayerCard(lineup, "GK")}</LineupRow>
        </VStack>
    );
}

function getPlayerCard(lineup: LineupPlayer[], nodeId: PositionNodeId) {
    const player = lineup.find((p) => p.positionNode === nodeId);
    if (!player) {
        return <></>;
    }
    return <PlayerCard player={player} />;
}

const PlayerCard = ({ player }: { player: LineupPlayer }) => {
    const NAME_MAX_LENGTH = 15;
    const isPosModded = player.finalPosition !== player.originalPosition;
    const chemColor =
        player.chemistry === 10
            ? "green.500"
            : player.chemistry > 6
            ? "yellow.500"
            : "red.500";
    return (
        <Box w={CARD_WIDTH} textAlign="center" fontSize="sm" color="gray.700">
            <Flex
                direction="column"
                justifyContent="flex-end"
                gap={1}
                bg="gray.100"
                h="100%"
                borderRadius="md"
                p={1}>
                <CustomTooltip label={player.name} placement="top">
                    <Text fontWeight="medium" lineHeight="3">
                        {truncate(player.name, NAME_MAX_LENGTH)}
                    </Text>
                </CustomTooltip>

                <Flex
                    justifyContent="space-between"
                    borderTop="1px solid"
                    borderColor="gray.300">
                    <CustomTooltip
                        label={
                            isPosModded
                                ? `${player.originalPosition} → ${player.finalPosition}`
                                : undefined
                        }>
                        <Text
                            fontSize="xs"
                            textDecoration={
                                isPosModded ? "underline" : undefined
                            }
                            fontWeight={isPosModded ? "medium" : undefined}>
                            {player.finalPosition}
                        </Text>
                    </CustomTooltip>

                    <CustomTooltip label="Chemistry">
                        <Text fontSize="xs">{player.chemistry}</Text>
                    </CustomTooltip>
                </Flex>
            </Flex>
            <Flex w="100%" justifyContent="center" mt={1}>
                <Tag bg="whiteAlpha.900">
                    {PositionValue.toString(
                        PositionValue.fromNodeId(player.positionNode)
                    )}
                </Tag>
            </Flex>
        </Box>
    );
};

const LineupRow = ({
    children,
    narrow
}: {
    children: React.ReactNode[] | React.ReactNode;
    narrow?: boolean;
}) => {
    return (
        <Flex
            justifyContent={narrow ? "center" : "space-between"}
            alignItems="flex-end"
            w="100%"
            gap={2}
            _empty={{ display: "none" }}>
            {children}
        </Flex>
    );
};

function truncate(str: string, n: number, useWordBoundary: boolean = true) {
    if (str.length <= n) {
        return str;
    }
    const subString = str.slice(0, n - 1);
    return (
        <>
            {useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString}
            &hellip;
        </>
    );
}
