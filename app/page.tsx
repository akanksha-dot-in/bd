"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LandingScreen      = dynamic(() => import("@/components/LandingScreen"),      { ssr: false });
const MessageSection     = dynamic(() => import("@/components/MessageSection"),     { ssr: false });
const InteractiveSection = dynamic(() => import("@/components/InteractiveSection"), { ssr: false });
const GameSection        = dynamic(() => import("@/components/GameSection"),        { ssr: false });
const EndingScreen       = dynamic(() => import("@/components/EndingScreen"),       { ssr: false });

type Section = "landing" | "message" | "interactive" | "game" | "ending";

export default function BirthdayPage() {
  const [section, setSection] = useState<Section>("landing");
  const go = (s: Section) => setSection(s);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {section === "landing"     && <LandingScreen      onNext={() => go("message")}     />}
      {section === "message"     && <MessageSection     onNext={() => go("interactive")} />}
      {section === "interactive" && <InteractiveSection onNext={() => go("game")}        />}
      {section === "game"        && <GameSection        onNext={() => go("ending")}      />}
      {section === "ending"      && <EndingScreen                                        />}
    </main>
  );
}