"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import Image from "next/image";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">About</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            {profile.about.map((paragraph, index) => (
              <p key={index} className="text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-center gap-4">
              {profile.headshot && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                  <Image
                    src={profile.headshot}
                    alt={`${profile.name} headshot`}
                    fill
                    sizes="56px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div>
                <p className="text-foreground/80">
                  <span className="font-semibold text-foreground">{profile.school}</span> — {profile.title} ({profile.graduation})
                </p>
                <p className="text-foreground/70 text-sm mt-1">{profile.location} • {profile.scholarship}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
