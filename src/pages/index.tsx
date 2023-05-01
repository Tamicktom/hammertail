//* Libraries imports
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

//* Components imports
import RainbowButton from "../components/specific/RainbowButton/RainbowButton";

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
      <div className="w-full h-screen flex justify-center items-center bg-neutral-950">
        <div className="w-full max-w-7xl flex justify-center items-center p-4 flex-col lg:flex-row">

          <div className="lg:w-1/2 flex flex-col justify-start items-start gap-8 w-full">
            <h1 className="text-neutral-100 sm:text-8xl font-black font-primary text-5xl">
              Where your worlds come to reality.
            </h1>
            <p className="text-neutral-300 text-xl font-normal font-primary">
              HammerTail is the ultimate worldbuilding tool, allowing you to build detailed and cohesive fictional worlds with ease and unlimited creativity.
            </p>
            <div className="w-full relative">
              <RainbowButton
                onPointerDown={() => signIn()}
                children="Get started"
              />
            </div>
          </div>
          <div className="lg:w-1/2 w-0 justify-end items-end hidden lg:flex">
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
