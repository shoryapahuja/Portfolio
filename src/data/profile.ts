export interface Skill {
  name: string;
  category: "Programming" | "Engineering Tools" | "PCB Design & Electronics";
}

// Used to make public asset URLs work on GitHub Pages (e.g. /Portfolio)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tools: string[];
}

export interface Project {
  title: string;
  period: string;
  overview: string;
  bullets: string[];
  tech: string[];
  image: string;
  images?: string[]; // Optional array for additional images
  imageFit?: "cover" | "contain";
  achievement?: string;
}

export interface Profile {
  name: string;
  title: string;
  school: string;
  graduation: string;
  location: string;
  scholarship: string;
  email: string;
  emailLabel?: string;
  linkedin: string;
  resume: string;
  headshot?: string;
  hero: {
    headline: string;
    subtext: string;
  };
  about: string[];
  valueCards: {
    title: string;
    description: string;
    tech?: string;
  }[];
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
}

export const profile: Profile = {
  name: "Shorya Pahuja",
  title: "Electrical & Computer Engineering Student",
  school: "Western University",
  graduation: "Expected Apr 2028",
  location: "Ontario, Canada",
  scholarship: "Dean's Entrance Scholarship (95%+ average)",
  email: "mailto:spahuja2@uwo.ca",
  emailLabel: "spahuja2@uwo.ca",
  linkedin: "https://linkedin.com/in/shorya-pahuja", // Update with actual LinkedIn
  resume: `${basePath}/resume.pdf`,
  headshot: `${basePath}/headshot.svg`,
  hero: {
    headline: "Electrical & Computer Engineering Student",
    subtext:
      "Seeking internships in software development and ECE-focused systems. Passionate about building practical, real-world engineering solutions.",
  },
  about: [
    "I'm an Electrical & Computer Engineering student at Western University with a strong foundation in both hardware and software development. Through hands-on internship experience and engineering projects, I've developed expertise in CAD design and embedded systems programming.",
    "I thrive on solving practical problems and building real-world systems—from designing 3D printer enclosures with HEPA filtration to programming Arduino-based control systems. My experience at Peacock Manufacturing has given me valuable exposure to precision manufacturing, quality assurance, and engineering documentation.",
    "I'm actively seeking internships where I can apply my skills in ECE, software development, and manufacturing. I bring a combination of technical knowledge, hands-on experience, and a commitment to engineering excellence.",
  ],
  valueCards: [
    {
      title: "CAD & Design",
      description:
        "Proficient in AutoCAD, Onshape, and SolidWorks for engineering design and 3D modeling.",
    },
    {
      title: "Arduino/C++",
      description:
        "Embedded systems programming with Arduino Uno, C++ control logic, and sensor integration.",
    },
    {
      title: "Digital Logic & FPGA Design",
      description:
        "Experience designing and verifying combinational and sequential logic using Boolean algebra, finite state machines, and digital system fundamentals.",
    },
  ],
  experiences: [
    {
      title: "Junior Engineering Intern",
      company: "Peacock Manufacturing Ltd",
      location: "Mississauga, ON",
      period: "May 2025 – August 2025",
      bullets: [
        "Supported engineering design validation by revising 20+ OnShape drawings, incorporating tolerances and customer-driven design changes",
        "Performed dimensional inspection on 40+ machined components using vernier calipers and micrometres to verify compliance and identify fit or tolerance issues",
        "Assisted with prototype and small-batch fabrication of 15+ metal and plastic components for fit checks, design iteration, and functional validation",
        "Designed and launched the company website to support technical visibility and the company's digital presence",
      ],
      tools: ["AutoCAD", "Precision Measurement Tools", "Machining", "Wix"],
    },
    {
      title: "Administrative Assistant",
      company: "Live Better Immigration",
      location: "Mississauga, ON",
      period: "May 2024 – Sep 2024",
      bullets: [
        "Coordinated client communications and meetings",
        "Processed 500+ documents and handled data entry to improve office efficiency",
      ],
      tools: ["Excel", "Word", "PowerPoint"],
    },
  ],
  projects: [
    {
      title: "Air Mouse & Gesture Controls",
      period: "Oct 2025 – Present",
      overview:
        "Real-time hand tracking application that maps hand gestures to cursor control and system shortcuts using computer vision. Implemented smoothing, dead zones, and gesture-triggered actions for stable, low-latency control.",
      bullets: [
        "Mapped hand gestures to cursor control and system shortcuts using computer vision",
        "Implemented smoothing and dead zones to reduce jitter and improve control stability",
        "Added gesture-triggered actions tuned for stable, low-latency interaction",
      ],
      tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
      image: `${basePath}/projects/air-mouse-gesture-controls.jpg`,
    },
    {
      title: "3D Printer Enclosure",
      period: "Jan 2025 – Apr 2025",
      overview:
        "Designed a custom 3D printer enclosure with HEPA filtration system for temperature stability and improved air quality.",
      bullets: [
        "Designed custom 3D printer enclosure with HEPA filtration for temperature stability and air quality",
        "Modeled airflow and insulation characteristics in Onshape",
        "Placed 3rd of 160 teams; 1st in 3D Printing category",
      ],
      tech: ["Onshape", "CAD Design", "HEPA Filtration", "Thermal Modeling"],
      image: `${basePath}/projects/3d-printer-enclosure-1.jpg`,
      images: [
        `${basePath}/projects/3d-printer-enclosure-1.jpg`,
        `${basePath}/projects/3d-printer-enclosure-2.jpg`,
        `${basePath}/projects/3d-printer-enclosure-3.jpg`,
        `${basePath}/projects/3d-printer-enclosure-5.jpg`,
      ],
      achievement: "3rd of 160 teams; 1st in 3D Printing category",
    },
    {
      title: "SAD Lamp Diffuser",
      period: "Sep 2024 – Dec 2024",
      overview:
        "Designed and built a 3D-printed diffuser with Arduino-controlled brightness and timing for improved light dispersion.",
      bullets: [
        "Designed 3D-printed diffuser with lofted form for improved light dispersion",
        "Implemented Arduino Uno control for brightness and timing",
        "Programmed in C++ for automated intensity presets",
        "Iterated CAD designs in Onshape to optimize dispersion",
      ],
      tech: ["Onshape", "Arduino Uno", "C++", "3D Printing", "LED Control"],
      image: `${basePath}/projects/sad-lamp-diffuser-1.jpg`,
      images: [`${basePath}/projects/sad-lamp-diffuser-1.jpg`],
      imageFit: "contain",
    },
  ],
  skills: [
    { name: "Java", category: "Programming" },
    { name: "Python", category: "Programming" },
    { name: "C++", category: "Programming" },
    { name: "AutoCAD", category: "Engineering Tools" },
    { name: "Onshape", category: "Engineering Tools" },
    { name: "SolidWorks", category: "Engineering Tools" },
    { name: "MATLAB", category: "Engineering Tools" },
    { name: "Arduino", category: "Engineering Tools" },
    { name: "Schematic Capture", category: "PCB Design & Electronics" },
    { name: "Circuit Analysis", category: "PCB Design & Electronics" },
    { name: "Introductory PCB Layout", category: "PCB Design & Electronics" },
    { name: "Design Rule Awareness", category: "PCB Design & Electronics" },
  ],
};
