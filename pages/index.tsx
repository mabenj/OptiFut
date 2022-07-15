import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import AddPlayerModal from "../components/AddPlayerModal";
import { db } from "../utils/db";

const Home: NextPage = () => {
    useEffect(() => {
        db.open();
    }, []);

    return (
        <Flex justifyContent="center" height="100vh">
            <Box width="80%">
                <Stack spacing={10}>
                    <Heading>OptiFut</Heading>
                    <AddPlayerModal />
                </Stack>
            </Box>
        </Flex>
    );
};
export default Home;
