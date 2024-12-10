import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../../styles/globals.css";
import theme from "../theme";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();

  return (
    <AppCacheProvider>
      <Head>
        <title>Vivinopolet</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} key={router.asPath} />
      </ThemeProvider>
      <Analytics />
    </AppCacheProvider>
  );
};

export default MyApp;
