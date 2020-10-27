import type { AppProps } from "next/app";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import "@/styles/styles.css";
import theme from "styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
    return <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
            <Component {...pageProps} />
        </ColorModeProvider>
    </ThemeProvider>;
}

export default App;