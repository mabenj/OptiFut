import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    Flex,
    FormLabel,
    Heading,
    SimpleGrid,
    Stack,
    Switch,
    Text
} from "@chakra-ui/react";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Flex justifyContent="center" height="100%" my={5}>
            <Box width={["95%", "80%", "60%", "40%"]}>
                <Stack spacing={10}>
                    <Box textAlign="center">
                        <Heading as="h1">OptiFut</Heading>
                        <Text color="gray.500" mt={3}>
                            FIFA Ultimate Team Chemistry Optimizer
                        </Text>
                    </Box>
                    <main>{children}</main>
                </Stack>
            </Box>
        </Flex>
    );
}
