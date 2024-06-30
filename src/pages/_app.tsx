import AuthContextProvider from "@/contexts/AuthContext";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@emotion/react";
import { maxaTheme } from "@/themes/maxaTheme";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={maxaTheme}>
      <CssBaseline />
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          {getLayout(
            <>
              <Component {...pageProps} />
              <ToastContainer />
            </>
          )}
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
