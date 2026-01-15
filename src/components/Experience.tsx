"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { Briefcase } from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-accent" />
            Experience
          </h2>
          <div className="space-y-8">
            {profile.experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-border"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-2 border-background"></div>
                <div className="pb-6">
                  <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-accent font-medium">{exp.company}</p>
                  <p className="text-foreground/60 text-sm">{exp.location} • {exp.period}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-foreground/80 flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1 text-xs font-medium bg-muted text-foreground/70 rounded-full border border-border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
