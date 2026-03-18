export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Notely Web App",
    description:
      "A modern note-taking platform with rich text formatting, folder organization, pinning, real-time collaboration, and search features, designed for seamless productivity.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/ArkhanShimar/Note-Taking-Website",
    demo: "",
    image: "/images/notely.png",
  },
  {
    title: "ToolHub Web App",
    description:
      "An e-commerce platform for buying and exploring hardware tools, featuring product categories, search, secure checkout, and a smooth user-friendly interface.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/ArkhanShimar/ToolHub",
    demo: "",
    image: "/images/toolhub.png",
  },
  {
    title: "LuxeVista Resort App",
    description:
      "Android app for hotel booking and service management built with Java and Firebase.",
    tech: ["Java", "Firebase"],
    github: "https://github.com/ArkhanShimar/LexeVista-Resort",
    demo: "",
    image: "/images/luxevista.png",
  },
  {
    title: "ShareLanka Web App",
    description:
      "Platform enabling donations of reusable goods built with a modern React and Node stack.",
    tech: ["React", "Node.js", "Tailwind CSS"],
    github: "",
    demo: "",
    image: "/images/sharelanka.png",
  },
  {
    title: "GreenLife Wellness Web App",
    description:
      "Dynamic booking and service management solution crafted with a responsive UI and PHP backend.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    github: "https://github.com/ArkhanShimar/Greenlife-Wellness",
    demo: "",
    image: "/images/greenlife.png",
  },
  {
    title: "The Gadget Hub Web App",
    description:
      "Smart gadget ordering platform aggregating distributor quotes, comparing prices, and automating best-order placements.",
    tech: ["HTML", "CSS", "JavaScript", "C# (.NET APIs)"],
    github: "https://github.com/ArkhanShimar/GadgetHub",
    demo: "",
    image: "/images/gadgethub.png",
  },
  {
    title: "Fitness Center Web App",
    description:
      "A gym website built for Fitness Sports Center. The site covers everything from services and membership plans to trainer profiles and a contact form.",
    tech: ["React.js", "TailwindCSS", "PostCSS"],
    github: "https://github.com/ArkhanShimar/Fitness-Sports-Center",
    demo: "",
    image: "/images/fitnesssports.png",
  },
  {
  title: "Orchi Flora - Temperature Analyzing System",
  description:
    "C++ console application to record and analyze day/night temperatures, calculate fluctuations, and evaluate suitability for optimal orchid growth.",
  tech: ["C++"],
  github: "https://github.com/ArkhanShimar/Orchi-Flora",
  demo: "",
  image: "/images/orchiflora.png",
  },
  {
  title: "Student Management System - Python",
  description:
    "A comprehensive student management application built with Python that helps educational institutions manage student records, track academic performance, and calculate GPAs.",
  tech: ["Python", "SQL"],
  github: "https://github.com/ArkhanShimar/Student-management-python",
  demo: "",
  image: "/images/studentmanagement.png",
  },
  {
  title: "The Paws Shop - Pet Supply Management System",
  description:
    "Java console application implementing OOP concepts to automate pet supply transactions with separate user levels for Cashier and Manager. Supports adding, viewing, and searching supplies, and managing cashier accounts.",
  tech: ["Java", "OOP", "Text File Storage"],
  github: "https://github.com/ArkhanShimar/The-PawShop",
  demo: "",
  image: "/images/thepawshop.png",
  },
];
