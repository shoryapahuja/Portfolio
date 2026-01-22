"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { X, ExternalLink, ChevronLeft, ChevronRight, Laptop, Cpu, Box } from "lucide-react";

function getProjectDomainIcon(title: string) {
  if (title.toLowerCase().includes("air mouse")) return Laptop;
  if (title.toLowerCase().includes("sad lamp")) return Cpu;
  if (title.toLowerCase().includes("3d printer")) return Box;
  return Box;
}

// Simple image component using standard img tag for modal
function ProjectImage({
  src,
  alt,
  fit = "cover",
}: {
  src: string | null | undefined;
  alt: string;
  fit?: "cover" | "contain";
}) {
  const [hasError, setHasError] = useState(false);
  
  // Don't render if no src provided
  if (!src || hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/10">
        <span className="text-foreground/40 text-sm font-medium text-center px-4">{alt}</span>
      </div>
    );
  }
  
  return (
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full ${fit === "contain" ? "object-contain object-center" : "object-cover"}`}
      onError={() => setHasError(true)}
    />
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Scroll to expanded card when it opens
  useEffect(() => {
    if (selectedProject !== null) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const expandedCard = document.querySelector(`[data-expanded-project="${selectedProject}"]`);
        if (expandedCard) {
          expandedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }
  }, [selectedProject]);

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

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
                whileHover={selectedProject === null ? { y: -4 } : {}}
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
                      // Only reset image index if project has images
                      const project = profile.projects[index];
                      if (project.images || project.image) {
                        setCurrentImageIndex(0);
                      }
                    }}
                    className="text-accent hover:text-accent/80 font-medium text-sm flex items-center gap-1 transition-colors"
                  >
                    Read more <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {/* Expanded project detail card - appears as 4th card in grid */}
            {selectedProject !== null && (() => {
              const project = profile.projects[selectedProject];
              // Only get images if they exist - make images optional
              const hasImages = !!(project.images || project.image);
              const images = project.images || (project.image ? [project.image] : []);
              const currentImage = hasImages && images.length > 0 ? (images[currentImageIndex] || images[0] || project.image) : null;

              return (
                <motion.div
                  key={`expanded-${project.title}`}
                  data-expanded-project={selectedProject}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background border border-border rounded-xl overflow-hidden shadow-lg flex flex-col"
                >
                  {/* Image section - same as regular cards */}
                  {currentImage ? (
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <ProjectImage
                        src={currentImage}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        fit={project.imageFit || "cover"}
                      />
                      {images.length > 1 && currentImage && (
                        <>
                          <button
                            onClick={() => {
                              setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 text-white backdrop-blur-md rounded-full border-2 border-white/30 shadow-2xl hover:bg-black/90 transition-all z-10"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 text-white backdrop-blur-md rounded-full border-2 border-white/30 shadow-2xl hover:bg-black/90 transition-all z-10"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                            {images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`rounded-full transition-all ${
                                  currentImageIndex === idx 
                                    ? "bg-white w-6 h-2 shadow-lg" 
                                    : "bg-white/50 w-2 h-2 hover:bg-white/80"
                                }`}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
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
                  )}

                  {/* Content section - scrollable */}
                  <div className="p-6 flex flex-col flex-1 min-h-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                      <button
                        onClick={closeModal}
                        className="flex-shrink-0 p-1.5 bg-background/90 text-foreground rounded-full border border-border shadow-lg hover:bg-background transition-colors ml-2"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-foreground/60 mb-3">{project.period}</p>
                    
                    {project.achievement && (
                      <p className="text-sm text-accent font-medium mb-3">{project.achievement}</p>
                    )}

                    <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
                      <p className="text-foreground/70 text-sm leading-relaxed">{project.overview}</p>

                      <div>
                        <h4 className="text-xs font-semibold text-foreground mb-2">Highlights</h4>
                        <ul className="space-y-1.5">
                          {project.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="text-foreground/70 text-xs flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-foreground mb-2">Tech</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded border border-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
