import { Suspense } from "react";
import { SearchProvider } from "@/components/SearchContext";
import ClientWrapper from "@/components/ClientWrapper";
import Image from "next/image";
import IntroImage from "../../public/jna-intro.jpg";

export default function Home() {
  return (
    <main className="bg-orange-50">
      <div className="min-h-screen p-4 max-w-4xl mx-auto">
        <div className="max-w-xl mt-2 mx-auto">
          <Image
            alt="Jake and Amir | Intro"
            src={IntroImage}
            sizes="(max-width: 600px) 100vw, 500px"
            className="rounded-3xl"
          />
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
