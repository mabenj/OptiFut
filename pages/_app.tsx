import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.scss";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
