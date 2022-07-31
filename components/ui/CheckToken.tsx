import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function CheckToken({
    isChecked,
    onChange,
    label,
    centered,
    useUncheckedStyle
}: {
    isChecked: boolean;
    onChange: (newValue: boolean) => any;
    label: string;
    centered?: boolean;
    useUncheckedStyle?: boolean;
}) {
    return (
        <Button w="100%" rounded="full" onClick={() => onChange(!isChecked)}>
            <Flex
                w="100%"
                gap={4}
                justifyContent={centered ? "center" : undefined}>
                <Text
                    className={
                        isChecked
                            ? "bi bi-check-circle-fill green.500"
                            : "bi-circle-fill white"
                    }
                    color={isChecked ? "green.500" : "white"}
                />
                <Text
                    as={useUncheckedStyle && !isChecked ? "s" : undefined}
                    color={
                        useUncheckedStyle && !isChecked ? "gray.500" : undefined
                    }>
                    {label}
                </Text>
            </Flex>
        </Button>
    );
}
