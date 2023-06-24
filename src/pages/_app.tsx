//* Libraries imports
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//* Styles
import "../styles/globals.css";

//* Types
import type { AppType } from "next/app";
import type { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    console.log();
  }, []);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={new QueryClient()}>
        <Component {...pageProps} />
        <Toaster
          position="top-center"
        />
        <Analytics />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
