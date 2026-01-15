"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { Code, Cpu, Wrench } from "lucide-react";

const categoryIcons = {
  Programming: Code,
  "Engineering Tools": Wrench,
  "PCB Design & Electronics": Cpu,
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillsByCategory = profile.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof profile.skills>,
  );

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Skills</h2>
          <div className="space-y-8">
            {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-accent" />
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground font-medium hover:bg-accent/10 hover:border-accent/20 transition-colors"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
