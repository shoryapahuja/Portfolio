"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { FileText } from "lucide-react";

export function Research() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = profile.research ?? [];
  if (items.length === 0) return null;

  return (
    <section id="research" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-10 flex items-center gap-3">
            <FileText className="w-8 h-8 text-accent" />
            Research
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {items.map((paper, index) => (
              <motion.article
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-foreground">{paper.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-foreground/60">{paper.period}</span>
                      {paper.tag && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-accent/10 text-accent border border-accent/30">
                          {paper.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-foreground/70 text-sm leading-relaxed mb-3">{paper.overview}</p>

                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 mb-4 underline underline-offset-2"
                  >
                    Read paper (PDF)
                  </a>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-2">Key points</h4>
                  <ul className="space-y-1.5">
                    {paper.bullets.map((bullet, i) => (
                      <li key={i} className="text-foreground/80 text-xs flex items-start">
                        <span className="text-accent mr-2 mt-[1px]">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

