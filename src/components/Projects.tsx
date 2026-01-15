"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { profile } from "@/data/profile";
import Image from "next/image";
import { X, ExternalLink, ChevronLeft, ChevronRight, Laptop, Cpu, Box } from "lucide-react";

function getProjectDomainIcon(title: string) {
  if (title.toLowerCase().includes("air mouse")) return Laptop;
  if (title.toLowerCase().includes("sad lamp")) return Cpu;
  if (title.toLowerCase().includes("3d printer")) return Box;
  return Box;
}

// Placeholder component for missing images
function ProjectImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fit = "cover",
}: {
  src: string;
  alt: string;
  sizes?: string;
  fit?: "cover" | "contain";
}) {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/10">
        <span className="text-foreground/40 text-sm font-medium text-center px-4">{alt}</span>
      </div>
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={fit === "contain" ? "object-contain" : "object-cover"}
      sizes={sizes}
      onError={() => setHasError(true)}
    />
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {profile.projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-muted flex items-center justify-center">
                  {(() => {
                    const Icon = getProjectDomainIcon(project.title);
                    return (
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-border bg-background/60 backdrop-blur-sm">
                        <Icon className="w-8 h-8 text-accent" aria-hidden="true" />
                        <span className="sr-only">{project.title} project icon</span>
                      </div>
                    );
                  })()}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                    <span className="text-sm text-foreground/60 whitespace-nowrap ml-2">{project.period}</span>
                  </div>
                  {project.achievement && (
                    <p className="text-sm text-accent font-medium mb-3">{project.achievement}</p>
                  )}
                  <p className="text-foreground/70 mb-4">{project.overview}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(index);
                      setCurrentImageIndex(0);
                    }}
                    className="text-accent hover:text-accent/80 font-medium text-sm flex items-center gap-1 transition-colors"
                  >
                    Read more <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject !== null && (() => {
        const project = profile.projects[selectedProject];
        const images = project.images || [project.image];
        const currentImage = images[currentImageIndex] || project.image;
        
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setSelectedProject(null);
              setCurrentImageIndex(0);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64 bg-muted">
                <ProjectImage
                  src={currentImage}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  sizes="100vw"
                  fit={project.imageFit}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === idx
                              ? "bg-accent w-6"
                              : "bg-background/50 hover:bg-background/70"
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setCurrentImageIndex(0);
                  }}
                  className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-foreground/60 text-sm mb-4">{project.period}</p>
                {project.achievement && (
                  <p className="text-accent font-medium mb-4">{project.achievement}</p>
                )}
                <p className="text-foreground/80 mb-4">{project.overview}</p>
                <ul className="space-y-2 mb-4">
                  {project.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="text-foreground/80 flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        );
      })()}
    </section>
  );
}
