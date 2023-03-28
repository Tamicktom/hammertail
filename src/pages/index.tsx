//* Libraries imports
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

//* Assets imports
import logo from "../assets/logo.svg";

const Home: NextPage = () => {
  const { status } = useSession()

  if (status === "authenticated") {
    // Redirect to dashboard if user is logged in
    window.location.href = "/worlds"
  }

  return (
    <>
      <Head>
        <title>HammerTail</title>
        <meta name="description" content="The Worldbuilding tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen flex justify-center items-center bg-tertiary-800">
        <div className="w-full max-w-7xl flex flex-row justify-center items-center">
          <div className="w-1/2 flex flex-col justify-start items-start gap-8">
            <h1 className="text-tertiary-100 text-8xl font-black font-primary">
              Where your worlds come to life.
            </h1>
            <p className="text-tertiary-300 text-xl font-normal font-primary">
              HammerTail is the ultimate worldbuilding tool, allowing you to build detailed and cohesive fictional worlds with ease and unlimited creativity.
            </p>
            <button
              onClick={() => signIn()}
              className="uppercase flex justify-center items-center bg-gradient-to-b from-primary-500 to-primary-700 text-2xl font-bold font-primary text-tertiary-100 rounded-lg px-16 py-2"
            >
              Sign up
            </button>
          </div>
          <div className="w-1/2 flex justify-end items-end">
            <Image
              src={logo}
              alt="HammerTail Logo"
              width={481}
              height={516}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
