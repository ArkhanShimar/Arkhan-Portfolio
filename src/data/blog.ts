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
    slug: "why-student-projects-look-the-same",
    title: "Why Most Student Projects Look the Same (And How I Try to Avoid That)",
    description:
      "After a while in software engineering, you notice the same portfolios repeating. Here’s why it happens, and the small mindset shift that helped me.",
    date: "March 2026",
    readTime: "3 min",
    tags: ["Student Life", "Development"],
    content: [
      { type: "h2", text: "Something I noticed in university" },
      {
        type: "p",
        text: "After a while in software engineering, you start seeing the same types of projects again and again.",
      },
      {
        type: "ul",
        items: [
          "Library management systems",
          "Student management systems",
          "Basic CRUD apps with login pages",
        ],
      },
      {
        type: "p",
        text: "There’s nothing wrong with them. They help you understand the fundamentals. But after some time, every student portfolio starts looking identical. And if you’re trying to stand out, that becomes a problem.",
      },
      { type: "h2", text: "Why this happens" },
      {
        type: "p",
        text: "Most of the time it’s not because students lack ideas. It’s usually a few common reasons.",
      },
      {
        type: "ul",
        items: [
          "Assignments drive the projects: you build what’s required, submit it, and move on.",
          "Tutorials influence everyone: lots of people learn from the same YouTube videos and blogs.",
          "Safe ideas feel easier: when many people have done it, there are guides, solutions, and examples.",
        ],
      },
      {
        type: "p",
        text: "The downside is that it doesn’t show much originality. You might still learn a lot, but it’s harder for someone else to see what makes you different.",
      },
      { type: "h2", text: "How I try to approach projects differently" },
      {
        type: "p",
        text: "Instead of asking “What project should I build?”, I try asking “What problem do I personally want to solve?”. That small change makes a big difference.",
      },
      {
        type: "p",
        text: "For example, instead of building another basic note app just for practice, I tried building one that fits the way I like to organize notes.",
      },
      {
        type: "ul",
        items: [
          "Pinning important notes",
          "Collaborator sharing",
          "Folder protection with a PIN",
          "Auto-saving drafts",
        ],
      },
      {
        type: "p",
        text: "It started as practice, but it turned into something I would actually use.",
      },
      { type: "h2", text: "Another thing I started focusing on" },
      {
        type: "p",
        text: "Structure and presentation. Two students might build similar apps, but the difference often comes from how clean the UI is, how well the project is structured, and how clearly the features are explained in a portfolio.",
      },
      {
        type: "p",
        text: "Sometimes the way you present a project matters almost as much as the project itself.",
      },
    ],
  },
  {
    slug: "studying-software-engineering-feels-like",
    title: "What Studying Software Engineering Actually Feels Like (No One Talks About This)",
    description:
      "Expectation vs reality, the “nothing works” phase, and the moment things start clicking — from my undergrad perspective.",
    date: "March 2026",
    readTime: "4 min",
    tags: ["Student Life", "Software Engineering"],
    content: [
      { type: "h2", text: "The expectation vs reality" },
      {
        type: "p",
        text: "Before starting software engineering, I imagined building cool apps every week and learning advanced tech non-stop.",
      },
      {
        type: "p",
        text: "Reality: you do build things, but most days are about figuring things out slowly, breaking stuff, and fixing it.",
      },
      {
        type: "p",
        text: "That’s where a surprising amount of real learning happens.",
      },
      { type: "h2", text: "The “nothing works” phase" },
      {
        type: "ul",
        items: [
          "You write code → run it → it doesn’t work",
          "You change one thing → something else breaks",
          "You stare at an error for an hour… then finally spot a missing bracket",
        ],
      },
      {
        type: "p",
        text: "It’s frustrating, but debugging becomes part of your routine — and a small success after a long struggle feels great.",
      },
      { type: "h2", text: "Tutorials help… but only to a point" },
      {
        type: "p",
        text: "Tutorials are perfect for understanding concepts. But when you try to build without a step-by-step guide, the real challenge starts.",
      },
      {
        type: "ul",
        items: [
          "How should I structure this project?",
          "Where should this logic live?",
          "How do I keep things clean as it grows?",
        ],
      },
      { type: "h2", text: "The moment things start clicking" },
      {
        type: "ul",
        items: [
          "You see how parts of a system connect",
          "You debug faster",
          "You read other people’s code with less fear",
        ],
      },
      {
        type: "p",
        text: "You’re still learning, but you’re no longer completely lost — and that changes everything.",
      },
      { type: "h2", text: "Why I still enjoy it" },
      {
        type: "p",
        text: "Even with the rough days, software lets you build something from nothing. An idea becomes a tool someone can actually use.",
      },
      {
        type: "p",
        text: "That feeling is what keeps me interested in this field.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
