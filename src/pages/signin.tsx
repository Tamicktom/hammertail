//* Libraries imports
import Head from "next/head";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";
import { GoogleLogo, DiscordLogo, GithubLogo } from "@phosphor-icons/react";

//* Components imports
import RainbowBorders from "../components/common/RainbowBorders/RainbowBorders";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const providerList = providers ? Object.values(providers) : [];

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="relative flex flex-row items-center justify-center w-full h-screen bg-left-top bg-repeat bg-noise bg-neutral-950 bg-30 md:bg-20 lg:bg-10">
        <div className="flex items-center justify-center w-full ssm:w-5/6 sm:w-4/5 lg:w-full">
          <RainbowBorders>
            <main className="flex flex-row items-center justify-center w-full h-full sm:h-[512px] overflow-hidden rounded-lg bg-repeat bg-light-noise bg-neutral-950 bg-30 md:bg-20 lg:bg-10">

              <div className="flex-col items-center justify-start hidden w-full h-full px-8 py-12 text-center md:flex backdrop-blur-xl">
                <p className="text-6xl font-black text-left text-white font-secondary">
                  Join and make your worlds come to <span className="rainbowText">reality.</span>
                </p>
              </div>

              <div className="flex flex-col items-center justify-center w-full h-full gap-12 px-8 py-12 sm:justify-between sm:gap-4 bg-neutral-950/70 backdrop-blur-xl">
                <div className="flex items-start justify-start w-full">
                  <h1 className="text-5xl font-black text-left text-white font-secondary">Login</h1>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                  {
                    providerList.map((provider) => (
                      <button
                        key={provider.id}
                        className="flex flex-row items-center justify-center w-full gap-4 p-2 rounded-md bg-gradient-to-br from-primary-600 to-primary-800"
                        onClick={() => signIn(provider.id)}
                      >
                        {getProviderLogo(provider.name)}
                        <span className="text-base font-bold text-white uppercase font-primary">
                          Sign in with {provider.name}
                        </span>
                      </button>
                    ))
                  }
                </div>
                <div className="flex items-start justify-start w-full pt-2 border-t border-neutral-700">
                  <p className="text-xs text-left font-primary text-neutral-300">
                    By logging in to HammerTail, I confirm that I have read and agree to the HammerTail Terms of Service. Privacy. Policy, and to receive emails and updates.
                  </p>
                </div>
              </div>

            </main>
          </RainbowBorders>
        </div>
      </div>
    </>
  );
}

function getProviderLogo(provider: string) {
  const size = 20;
  switch (provider) {
    case "Google":
      return <GoogleLogo size={size} className="text-neutral-100" />;
    case "Discord":
      return <DiscordLogo size={size} className="text-neutral-100" />;
    case "GitHub":
      return <GithubLogo size={size} className="text-neutral-100" />;
    default:
      return <></>;
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
}