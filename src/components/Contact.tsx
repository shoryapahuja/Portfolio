"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
                <p className="text-foreground/70 mb-6">
                  I’m actively seeking ECE and software development internships. Feel free to reach out!
                </p>
              </div>
              <div className="space-y-4">
                <a
                  href={profile.email}
                  className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors group"
                >
                  <div className="p-2 bg-muted rounded-lg group-hover:bg-accent/10 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <span>{profile.emailLabel ?? "Email me"}</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors group"
                >
                  <div className="p-2 bg-muted rounded-lg group-hover:bg-accent/10 transition-colors">
                    <Linkedin className="w-5 h-5 text-accent" />
                  </div>
                  <span>LinkedIn</span>
                </a>

                <div className="flex items-center gap-3 text-foreground/80">
                  <div className="p-2 bg-muted rounded-lg">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
