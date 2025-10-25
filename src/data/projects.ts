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
    github: "https://github.com/ArkhanShimar",
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
  title: "Orchi Flora - Temperature Analyzing System",
  description:
    "C++ console application to record and analyze day/night temperatures, calculate fluctuations, and evaluate suitability for optimal orchid growth.",
  tech: ["C++"],
  github: "https://github.com/ArkhanShimar/Orchi-Flora",
  demo: "",
  image: "/images/orchiflora.png",
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
