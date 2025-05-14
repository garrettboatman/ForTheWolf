import { Suspense } from "react";
import { SearchProvider } from "@/components/SearchContext";
import ClientWrapper from "@/components/ClientWrapper";
import Image from "next/image";
import IntroImage from "../../public/jna-intro.jpg";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

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
            <InfoTooltip
              text={
                <>
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
                </>
              }
              className="relative top-[1px]"
            />
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
      </div>
    </main>
  );
}
