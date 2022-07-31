import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.scss";
import type { AppProps } from "next/app";
import Layout from "../components/ui/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
