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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
