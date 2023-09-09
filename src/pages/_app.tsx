//* Libraries imports
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "jotai";

//* Styles
import "../styles/globals.css";

//* Types
import type { AppType } from "next/app";
import type { Session } from "next-auth";

//* Local imports
import { queryClient } from "../utils/queryClient";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Component {...pageProps} />
          <Toaster
            position="top-center"
          />
          <Analytics />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
