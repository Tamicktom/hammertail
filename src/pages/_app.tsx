//* Libraries imports
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';

//* Styles
import "../styles/globals.css";

//* Types
import type { AppType } from "next/app";
import type { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
      />
      <Analytics />
    </SessionProvider>
  );
};

export default MyApp;
