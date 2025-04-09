import React from "react";
import { Navbar } from "@/components/navbar";
import { GlobeDemo } from "@/components/Globe";
import { CanvasRevealEffectDemo2 } from "@/components/Canvas";
import { HeroScrollDemo } from "@/components/scroll";
import { Spotlight } from "@/components/ui/Spotlight";
import { VortexDemo } from "@/components/Vortex";
import { InfiniteMovingCardsDemo } from "@/components/loop";
import { BackgroundBeamsDemo } from "@/components/futter";
import Globe from "@/components/magicui/globe";
import { AnimatedBeamMultipleOutputDemo } from "@/components/ui/inputs";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import BoxReveal from "@/components/magicui/box-reveal";
import ShinyButton from "@/components/magicui/shiny-button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="pt-10 pb-10 bg-black">
        <GradualSpacing
          className="font-display text-center text-2xl font-bold tracking-[-0.1em]  text-violet-500 border-b-2 mb-8  dark:text-white md:text-7xl md:leading-[5rem]"
          text=" QuizVerse"
        />

        <div className="flex justify-center items-center">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-white text-[3.5rem] font-semibold">
              Democratizing Quizzes for a Smarter
              <span className="text-[#5046e6]">.</span>
            </p>
          </BoxReveal>
        </div>

        <div className="flex justify-center items-center">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="mt-[.5rem] text-white  text-[2rem]">
              and Decentralized Tomorrow!{" "}
              <span className="text-[#5046e6]">Design Engineers</span>
            </h2>
          </BoxReveal>
        </div>
      </div>

      <div className="flex-col bg-black justify-center items-center">
        <div className="  flex justify-center items-center">
          <div className="   flex h-full w-full max-w-[36rem] items-center justify-center  overflow-hidden rounded-lg  bg-transparent px-40 pb-30 pt-8 md:pb-60 md:shadow-xl">
            <span className=" z-10  pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-blue to-gray-300/80 bg-clip-text text-center text-9xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              ........... ......
            </span>

            <Globe className="top-80" />
            <div className="pointer-events-none inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
          </div>
        </div>

        <AnimatedBeamMultipleOutputDemo />

        <div className="flex justify-center items-center pb-10">
          <Link href="/dashboard">
            {" "}
            <ShinyButton text="Dashboard" className="bg-white py-4" />
          </Link>
        </div>

        <div className=" w-full pb-14 flex justify-center items-center">
          <InfiniteMovingCardsDemo />
        </div>

        <BackgroundBeamsDemo />
      </div>
    </>
  );
};

export default page;
