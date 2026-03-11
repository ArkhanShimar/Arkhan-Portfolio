export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
  >;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "server-components-notes",
    title: "Server Components: what finally made it click for me",
    description:
      "My notes after breaking (and fixing) a Next.js app while trying to “optimize everything”.",
    date: "Feb 12, 2026",
    readTime: "7 min",
    tags: ["Next.js", "React"],
    content: [
      {
        type: "p",
        text: "I kept hearing “Server Components are the future” and I was like… cool, but WHY does my page still feel slow sometimes? I’m a student, so most of my learning is basically: build → break → google → fix → repeat.",
      },
      {
        type: "p",
        text: "The main thing that made it click: Server Components are not “faster React”. They’re a way to keep heavy work (fetching, formatting, rendering big trees) on the server so the client ships less JS. The client still matters a lot for animations, scroll, and anything interactive.",
      },
      { type: "h2", text: "My mental model" },
      {
        type: "ul",
        items: [
          "If it needs state, effects, handlers → it’s client.",
          "If it’s mostly data + markup → keep it server as long as possible.",
          "Don’t turn the whole page into a client component just to animate one button.",
        ],
      },
      {
        type: "p",
        text: "Also: hydration mismatches are so easy to accidentally create when you read window.location or Date at render time. If you ever see “HTML didn’t match”, it’s usually you (or a browser extension).",
      },
      { type: "h2", text: "What I’m trying to do now" },
      {
        type: "p",
        text: "I’m trying to build pages where the initial load is basically instant, and then only the interactive parts become client. It feels like a good habit for internships too, because nobody wants a 2MB client bundle just to show a profile section.",
      },
    ],
  },
  {
    slug: "node-api-habits",
    title: "Little habits that saved my Node.js APIs from chaos",
    description:
      "Not “enterprise patterns”… just the boring stuff that keeps small APIs stable.",
    date: "Jan 28, 2026",
    readTime: "6 min",
    tags: ["Node.js", "Backend"],
    content: [
      {
        type: "p",
        text: "I’ve built a few small APIs for projects and I used to treat them like: routes + controllers + pray. It worked… until I had to change something and everything started to feel fragile.",
      },
      { type: "h2", text: "The boring rules I follow now" },
      {
        type: "ul",
        items: [
          "Validate inputs at the edge (even if it feels repetitive).",
          "Return consistent error shapes so the frontend doesn’t guess.",
          "Log one line per request (method, path, status, timing).",
          "Keep secrets out of logs and out of the repo (obvious, but still).",
        ],
      },
      {
        type: "p",
        text: "My favorite quick win is adding a simple request-id header and passing it through logs. When something breaks, you can find the story of that request in 10 seconds instead of 10 minutes.",
      },
      { type: "h2", text: "What I still struggle with" },
      {
        type: "p",
        text: "Database migrations. Every time I think “I’ll remember what I changed”, I don’t. So I’m trying to be disciplined and write migrations even for small schema changes.",
      },
    ],
  },
  {
    slug: "mobile-dev-realities",
    title: "Mobile development realities (from an undergrad’s projects)",
    description:
      "My honest checklist after building Android apps that looked fine… until they didn’t.",
    date: "Dec 08, 2025",
    readTime: "5 min",
    tags: ["Android", "UX"],
    content: [
      {
        type: "p",
        text: "Mobile is funny because you can build something that looks perfect on your phone and then you run it on another device and suddenly your layout is doing parkour.",
      },
      { type: "h2", text: "Stuff I test now (even in small apps)" },
      {
        type: "ul",
        items: [
          "Small screen vs big screen (not just one emulator).",
          "Slow network (because real life is slow).",
          "Dark mode, because someone will use it.",
          "Long text (names, addresses, error messages).",
        ],
      },
      {
        type: "p",
        text: "The biggest lesson: if the UI depends on “perfect content”, it will break. So I try to design like the content is messy (because it is).",
      },
    ],
  },
  {
    slug: "html-css-small-things",
    title: "HTML/CSS small things that made my UI feel “more real”",
    description:
      "Not a tutorial — just the tiny fixes I kept ignoring until they mattered.",
    date: "Nov 22, 2025",
    readTime: "4 min",
    tags: ["HTML", "CSS"],
    content: [
      {
        type: "p",
        text: "When I started, I thought good UI was mostly colors and fonts. Then I spent an entire evening trying to align one button, and suddenly I respected CSS a lot more.",
      },
      { type: "h2", text: "My “tiny wins” list" },
      {
        type: "ul",
        items: [
          "Use consistent spacing (8px / 12px / 16px) instead of random numbers.",
          "Set line-height properly. Text looks weird when it’s too tight.",
          "Clamp long text (titles, descriptions) so cards don’t jump in height.",
          "Prefer flex/grid for alignment over margin hacks.",
        ],
      },
      {
        type: "p",
        text: "Also… mobile first is real. If it works on mobile, it’s usually fine on desktop. If it only works on desktop, it will definitely break on mobile.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

