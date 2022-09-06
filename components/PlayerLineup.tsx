import { Badge, Box, Center, Flex, Tag, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { PositionNodeId } from "../optimizer/types/position-node-id.type";
import { PositionValue } from "../optimizer/types/position-value.enum";
import CustomTooltip from "./ui/CustomTooltip";

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
        <Box
            bg="green.200"
            position="relative"
            display="flex"
            justifyContent="center">
            <PitchLines zIndex={1} />
            <VStack
                spacing={1}
                px={1}
                py={5}
                borderRadius="md"
                zIndex={2}
                position="relative"
                w="40rem">
                {/* STRIKERS */}
                <LineupRow justifyContent="center" gap={2}>
                    {getPlayerCard(lineup, "LST")}
                    {getPlayerCard(lineup, "ST")}
                    {getPlayerCard(lineup, "RST")}
                </LineupRow>

                {/* WINGERS */}
                <LineupRow justifyContent="space-between">
                    {getPlayerCard(lineup, "LW")}
                    {getPlayerCard(lineup, "LF")}
                    {getPlayerCard(lineup, "RF")}
                    {getPlayerCard(lineup, "RW")}
                </LineupRow>

                {/* CF */}
                <LineupRow>{getPlayerCard(lineup, "CF")}</LineupRow>

                {/* ATTACKING MIDS */}
                <LineupRow justifyContent="space-around">
                    {getPlayerCard(lineup, "LCAM")}
                    {getPlayerCard(lineup, "CAM")}
                    {getPlayerCard(lineup, "RCAM")}
                </LineupRow>

                {/* MIDS */}
                <LineupRow justifyContent="space-between">
                    <Center>{getPlayerCard(lineup, "LM")}</Center>
                    <Flex justifyContent="space-around">
                        {getPlayerCard(lineup, "LCM")}
                        {getPlayerCard(lineup, "CM")}
                        {getPlayerCard(lineup, "RCM")}
                    </Flex>
                    <Center>{getPlayerCard(lineup, "RM")}</Center>
                </LineupRow>

                {/* DEFENSIVE MIDS */}
                <LineupRow justifyContent="center" gap={4}>
                    {getPlayerCard(lineup, "LCDM")}
                    {getPlayerCard(lineup, "CDM")}
                    {getPlayerCard(lineup, "RCDM")}
                </LineupRow>

                {/* WINGBACKS */}
                <LineupRow justifyContent="space-between">
                    {getPlayerCard(lineup, "LWB")}
                    {getPlayerCard(lineup, "RWB")}
                </LineupRow>

                {/* DEFENDERS */}
                <LineupRow justifyContent="space-between">
                    <Center>{getPlayerCard(lineup, "LB")}</Center>
                    <Flex justifyContent="space-around">
                        {getPlayerCard(lineup, "LCB")}
                        {getPlayerCard(lineup, "CB")}
                        {getPlayerCard(lineup, "RCB")}
                    </Flex>
                    <Center>{getPlayerCard(lineup, "RB")}</Center>
                </LineupRow>

                {/* KEEPER */}
                <LineupRow>{getPlayerCard(lineup, "GK")}</LineupRow>
            </VStack>
        </Box>
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
    const isPosModded = player.finalPosition !== player.originalPosition;
    return (
        <VStack w="23%" justifyContent="flex-end">
            <Flex
                direction="column"
                fontSize={["xs", "small"]}
                justifyContent="center"
                alignItems="center"
                gap={0.5}
                h="100%">
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
                    flexGrow={1}
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
    justifyContent = "center",
    gap = 1
}: {
    children: React.ReactNode[] | React.ReactNode;
    justifyContent?: "center" | "space-between" | "space-around";
    gap?: number;
}) => {
    return (
        <Flex justifyContent={justifyContent} gap={gap} w="100%" py={1}>
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
