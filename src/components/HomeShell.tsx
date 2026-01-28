"use client";

import { useState } from "react";
import { BootScreen } from "@/components/BootScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export function HomeShell() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Boot Screen */}
      <div
        className={[
          "transition-all duration-500 ease-out",
          booted ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0",
        ].join(" ")}
        aria-hidden={booted}
      >
        {!booted && <BootScreen onBootComplete={() => setBooted(true)} />}
      </div>

      {/* Portfolio */}
      <div
        className={[
          "transition-all duration-500 ease-out",
          booted ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2",
        ].join(" ")}
        aria-hidden={!booted}
      >
        {booted && (
          <>
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Research />
            <Skills />
            <Contact />
          </>
        )}
      </div>
    </main>
  );
}

