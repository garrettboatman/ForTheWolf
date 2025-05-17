import { Suspense } from "react";
import { SearchProvider } from "@/components/SearchContext";
import ClientWrapper from "@/components/ClientWrapper";
import Image from "next/image";
import IntroImage from "../../public/jna-intro.jpg";
import { Tip } from "@/components/Tooltip";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-orange-50">
      <div className="min-h-screen p-4 max-w-4xl mx-auto">
        <div className="max-w-xl mt-2 mx-auto relative">
          <Image
            alt="Jake and Amir | Intro"
            src={IntroImage}
            sizes="(max-width: 600px) 100vw, 500px"
            className="rounded-3xl"
          />
          <div className="absolute bottom-0 right-0">
            <Tip
              className={
                "relative top-[1px] p-4 block width items-center focus:outline-none"
              }
              content={
                <div className="max-w-[300px] p-4">
                  Developed by{" "}
                  <a
                    className="text-medium underline"
                    target="_blank"
                    href="http://www.garrettboatman.com"
                  >
                    Garrett Boatman
                  </a>
                  <br /> with the help of Amir, Christopher Chu, and{" "}
                  <a
                    className="underline"
                    target="_blank"
                    href="http://www.reddit.com/r/jakeandamir"
                  >
                    /r/JakeandAmir
                  </a>{" "}
                  for our V1 back in 2012.
                  <br /> <br />
                  See some issues, have ideas, or want to help? <br /> Join us
                  at our{" "}
                  <a
                    className="underline text-bold"
                    target="_blank"
                    href="https://github.com/users/garrettboatman/projects/2"
                  >
                    Github Project
                  </a>
                </div>
              }
            >
              <InfoIcon
                size={40}
                fill="white"
                className="text-orange-500 hover:text-orange-600"
              />
            </Tip>
          </div>
        </div>
        <h1 className="text-3xl mt-6 font-bold text-center mb-16 font-['Anonymous_Pro']">
          Episode Archive
        </h1>

        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <SearchProvider>
            <ClientWrapper />
          </SearchProvider>
        </Suspense>

        <h3 className="text-center mt-8"><Link href={"/allEpisodes"}>Full list of episodes {">"}</Link></h3>
      </div>
    </main>
  );
}
