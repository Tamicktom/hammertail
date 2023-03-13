//* Libraries imports
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const providerList = providers ? Object.values(providers) : [];
  console.log(providerList);

  return (
    <div className="w-full h-screen bg-tertiary-800">
      {
        providerList.map((provider) => (
          <div key={provider.name}>
            <button
              className="w-1/2 h-12 mx-auto my-4 text-white bg-primary-500 rounded-md"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))
      }
    </div>
  );
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