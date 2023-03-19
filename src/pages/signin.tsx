//* Libraries imports
import Image from "next/image";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";
import { GoogleLogo, DiscordLogo, GithubLogo } from "phosphor-react";


export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const providerList = providers ? Object.values(providers) : [];
  console.log(providerList);

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center relative">
      <div className="w-full h-full absolute top-0 left-0">
        <div
          className="w-full h-full absolute top-0 left-0 z-10 backdrop-blur-2xl"
          style={{
            background: "radial-gradient(58.94% 58.94% at 50% 50%, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.5) 100%);"
          }}
        />
        <Image
          src="/login_screen_image.jpg"
          alt="Magical castle with a purple moon in the background, predominantly black and purple colors, giving a sense of creativity, in an anime style."
          width={1920}
          height={1080}
          className="object-cover w-full h-full absolute top-0 left-0"
        />
      </div>
      <div className="px-12 bg-tertiary-800 py-8 flex flex-col justify-center items-center z-10 border border-tertiary-600 rounded-lg gap-4">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-white mb-4 font-primary">Sign in</h1>
          <p className="text-white font-normal font-primary">Choose a platform to log in.</p>
        </div>
        <div className="flex flex-row w-full justify-center gap-4">
          {
            providerList.map((provider) => (
              <button
                key={provider.id}
                className="bg-gradient-to-b from-primary-500 to-primary-700 rounded-md flex flex-row gap-4 justify-center items-center p-2"
                onClick={() => signIn(provider.id)}
              >
                {getProviderLogo(provider.name)}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

function getProviderLogo(provider: string) {
  const size = 32;
  switch (provider) {
    case "Google":
      return <GoogleLogo size={size} className="text-tertiary-100" />;
    case "Discord":
      return <DiscordLogo size={size} className="text-tertiary-100" />;
    case "GitHub":
      return <GithubLogo size={size} className="text-tertiary-100" />;
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