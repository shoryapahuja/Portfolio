"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {profile.headshot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mx-auto relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-border bg-muted"
              aria-label={`${profile.name} headshot`}
            >
              <Image
                src={profile.headshot}
                alt={`${profile.name} headshot`}
                fill
                sizes="112px"
                className="object-cover"
                priority
                unoptimized
              />
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance"
          >
            {profile.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto text-balance"
          >
            {profile.hero.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </Link>
          </motion.div>
        </motion.div>

        {/* Value Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto"
        >
          {profile.valueCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-foreground/70 text-sm">{card.description}</p>
              {card.tech && <p className="text-foreground/60 text-xs mt-2">Tech: {card.tech}</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
