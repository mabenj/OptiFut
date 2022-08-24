import { Badge, Box, Flex, Tag, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { PositionNodeId } from "../types/position-node-id";
import CustomTooltip from "./ui/CustomTooltip";

const CARD_WIDTH = "65px";

interface LineupPlayer {
    name: string;
    chemistry: number;
    originalPosition: string;
    finalPosition: string;
    positionInFormation: string;
}

interface PlayerLineupProps {
    lineup: LineupPlayer[];
}

export default function PlayerLineup({ lineup }: PlayerLineupProps) {
    return (
        <Box
            bg="green.200"
            position="relative"
            display="flex"
            justifyContent="center">
            <PitchLines zIndex={1} />
            <VStack
                spacing={5}
                px={1}
                py={5}
                borderRadius="md"
                zIndex={2}
                position="relative"
                w="40rem">
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

                {/* MIDFIELD */}
                <LineupRow narrow>
                    {getPlayerCard(lineup, "LM")}
                    {getPlayerCard(lineup, "LCAM")}
                    {getPlayerCard(lineup, "LCM")}
                    {getPlayerCard(lineup, "LCDM")}
                    {getPlayerCard(lineup, "CAM")}
                    {getPlayerCard(lineup, "CM")}
                    {getPlayerCard(lineup, "CDM")}
                    {getPlayerCard(lineup, "RCAM")}
                    {getPlayerCard(lineup, "RCM")}
                    {getPlayerCard(lineup, "RCDM")}
                    {getPlayerCard(lineup, "RM")}
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
        </Box>
    );
}

function getPlayerCard(lineup: LineupPlayer[], nodeId: PositionNodeId) {
    // const player = lineup.find((p) => p.positionNode === nodeId);
    // if (!player) {
        return <></>;
    // }
    // return <PlayerCard player={player} />;
}

const PlayerCard = ({ player }: { player: LineupPlayer }) => {
    const NAME_MAX_LENGTH = 20;
    const isPosModded = player.finalPosition !== player.originalPosition;
    const chemColor =
        player.chemistry === 10
            ? "green.500"
            : player.chemistry > 6
            ? "yellow.500"
            : "red.500";
    return (
        <VStack>
            <Flex
                direction="column"
                fontSize={["xs", "small"]}
                justifyContent="center"
                alignItems="center"
                gap={0.5}>
                <Flex gap={1} cursor="default" userSelect="none">
                    <CustomTooltip
                        label={
                            isPosModded
                                ? `Position in card: ${player.originalPosition} → ${player.finalPosition}`
                                : "Position in card"
                        }
                        placement="top">
                        <Text
                            textDecoration={
                                isPosModded ? "underline" : undefined
                            }>
                            {player.finalPosition}
                        </Text>
                    </CustomTooltip>
                    <span>|</span>
                    <CustomTooltip label="Chemistry" placement="top">
                        <Text>{player.chemistry}</Text>
                    </CustomTooltip>
                </Flex>
                <Tag
                    fontSize="inherit"
                    textAlign="center"
                    fontWeight="semibold"
                    py={1}>
                    {player.name}
                </Tag>
            </Flex>
            <Badge
                colorScheme="green"
                variant="solid"
                cursor="default"
                userSelect="none">
                {PositionValue.toString(
                    PositionValue.fromNodeId(player.positionNode)
                )}
            </Badge>
        </VStack>
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
            justifyContent="space-around"
            alignItems="flex-end"
            w="100%"
            gap={1}
            _empty={{ display: "none" }}>
            {children}
        </Flex>
    );
};

const PitchLines = ({ zIndex }: { zIndex: number }) => {
    const LINE_COLOR = "whiteAlpha.600";
    return (
        <>
            {/* OUTER LINES */}
            <Box
                bg="transparent"
                position="absolute"
                left="0.7rem"
                right="0.7rem"
                top="0.7rem"
                bottom="0.7rem"
                border="solid 2px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
            />
            {/* MIDDLE LINE */}
            <Box
                bg="transparent"
                position="absolute"
                left="0.7rem"
                right="0.7rem"
                top="50%"
                bottom="50%"
                border="solid 1px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
            />
            {/* CENTER CIRCLE */}
            <Box
                bg="transparent"
                position="absolute"
                w="7rem"
                h="7rem"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                border="solid 2px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
                borderRadius="full"
            />
            {/* CENTER CIRCLE DOT */}
            <Box
                bg={LINE_COLOR}
                position="absolute"
                w="6px"
                h="6px"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                border="solid 2px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
                borderRadius="full"
            />

            {/* BOTTOM PENALTY BOX */}
            <Box
                bg="transparent"
                position="absolute"
                left="25%"
                right="25%"
                top="80%"
                bottom="0.7rem"
                border="solid 2px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
            />
            {/* BOTTOM 6 YARD BOX */}
            <Box
                bg="transparent"
                position="absolute"
                left="37%"
                right="37%"
                top="90%"
                bottom="0.7rem"
                border="solid 2px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
            />

            {/* TOP PENALTY BOX */}
            <Box
                bg="transparent"
                position="absolute"
                left="25%"
                right="25%"
                top="0.7rem"
                bottom="80%"
                border="solid 2px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
            />
            {/* TOP 6 YARD BOX */}
            <Box
                bg="transparent"
                position="absolute"
                left="37%"
                right="37%"
                top="0.7rem"
                bottom="90%"
                border="solid 2px"
                borderColor={LINE_COLOR}
                zIndex={zIndex}
            />
        </>
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
