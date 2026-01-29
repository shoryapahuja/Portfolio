export interface Skill {
  name: string;
  category: "Programming" | "Engineering Tools" | "PCB Design & Electronics";
}



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
  image?: string; // Optional - projects may not have images yet
  images?: string[]; // Optional array for additional images
  imageFit?: "cover" | "contain";
  achievement?: string;
}

export interface Research {
  title: string;
  period: string;
  overview: string;
  bullets: string[];
  tag?: string;
  link?: string;
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
  research?: Research[];
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
  resume: "/resume.pdf",
  headshot: "/headshot.svg",
  hero: {
    headline: "Electrical & Computer Engineering Student",
    subtext:
      "Seeking internships in software development and ECE-focused systems. Passionate about building practical, real-world engineering solutions.",
  },
  about: [
    "I'm an Electrical & Computer Engineering student at Western University with a strong foundation in both hardware and software development. Through hands-on internship experience and engineering projects, I've developed expertise in CAD design and embedded systems programming.",
    "I thrive on solving practical problems and building real-world systems, from designing 3D printer enclosures with HEPA filtration to programming Arduino-based control systems. My experience at Peacock Manufacturing has given me valuable exposure to precision manufacturing, quality assurance, and engineering documentation.",
    "I'm actively seeking internships where I can apply my skills in ECE and software development, especially embedded systems, computer vision, and digital design.",
  ],
  valueCards: [
    {
      title: "CAD & Design",
      description:
        "Proficient in AutoCAD, Onshape, and SolidWorks for engineering design and 3D modeling.",
    },
    {
      title: "Arduino Prototyping",
      description:
        "Sensor interfacing, signal handling, and basic control logic in Arduino-based projects.",
    },
    {
      title: "Digital Logic & FPGA Design",
      description:
        "Designed and verified combinational and sequential logic using Boolean algebra and FSMs.",
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
      image: "/projects/3d-printer-enclosure-1.jpg",
      images: [
        "/projects/3d-printer-enclosure-1.jpg",
        "/projects/3d-printer-enclosure-2.jpg",
        "/projects/3d-printer-enclosure-3.jpg",
        "/projects/3d-printer-enclosure-5.jpg",
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
      image: "/projects/sad-lamp-diffuser-1.jpg",
      images: ["/projects/sad-lamp-diffuser-1.jpg"],
      imageFit: "contain",
    },
  ],
  research: [
    {
      title: "Autonomous Vehicles in Canada",
      period: "Dec 2025",
      overview:
        "This essay argues that Canada is not ready for widespread autonomous vehicle adoption due to poor sensor performance in winter conditions and the absence of clear liability laws. It concludes that both engineering improvements and legal reform are required before AVs can be safely deployed nationwide.",
      bullets: [
        "Explained how LiDAR, cameras, and radar struggle in Canadian winter conditions such as snow, slush, fog, and salt spray",
        "Showed that AV systems trained in warmer regions perform unpredictably on Canadian roads",
        "Analyzed how current Canadian liability laws fail to address Level 3 and higher autonomous driving",
        "Demonstrated that unclear responsibility discourages manufacturers from testing and deploying AVs in Canada",
        "Proposed technical solutions like winter-specific datasets and legal solutions like clarified liability frameworks",
      ],
      tag: "Course essay / Independent research",
      link: "/research/autonomous-vehicles-in-canada.pdf",
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
    { name: "Circuit Analysis", category: "PCB Design & Electronics" },
    { name: "Introductory PCB Layout", category: "PCB Design & Electronics" },
    { name: "Hardware & Software Integration", category: "PCB Design & Electronics" },
    { name: "Electronic Circuit Design", category: "PCB Design & Electronics" },
  ],
};
