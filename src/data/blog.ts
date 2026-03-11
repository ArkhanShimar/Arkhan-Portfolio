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
  {
    slug: "how-i-use-ai-tools-without-letting-them-do-everything",
    title: "How I Use AI Tools Without Letting Them Do Everything",
    description:
      "AI is everywhere in coding. Here’s how I use it to learn faster without skipping the thinking process.",
    date: "March 2026",
    readTime: "3 min",
    tags: ["Development", "AI"],
    content: [
      { type: "h2", text: "AI is everywhere in coding now" },
      {
        type: "p",
        text: "If you’re studying software engineering today, AI tools are almost impossible to ignore. From code suggestions to full function generation, they can speed up a lot of things.",
      },
      {
        type: "p",
        text: "At first, I was excited about it. You type a prompt, and suddenly there’s code on the screen. It feels powerful.",
      },
      {
        type: "p",
        text: "But after using it for a while, I realized something important.",
      },
      {
        type: "p",
        text: "If you rely on it too much, you stop thinking through the problem yourself.",
      },
      {
        type: "p",
        text: "And that’s where learning starts to slow down.",
      },
      { type: "h2", text: "The mistake I made at the beginning" },
      {
        type: "p",
        text: "When I first started using AI tools while coding, I used them for almost everything.",
      },
      {
        type: "ul",
        items: [
          "Stuck on a bug? Ask AI.",
          "Need a function? Ask AI.",
          "Not sure about syntax? Ask AI.",
        ],
      },
      {
        type: "p",
        text: "It worked, but something felt off.",
      },
      {
        type: "p",
        text: "I could get solutions quickly, but sometimes I didn’t fully understand why the solution worked.",
      },
      {
        type: "p",
        text: "That’s when I realized AI should be more like an assistant, not the person writing the whole project for you.",
      },
      { type: "h2", text: "How I use AI now" },
      {
        type: "p",
        text: "Over time I started using AI in a slightly different way.",
      },
      {
        type: "p",
        text: "Instead of asking it to solve everything, I try to use it for things like:",
      },
      {
        type: "ul",
        items: [
          "Explaining concepts I don’t fully understand",
          "Getting suggestions when I’m stuck for too long",
          "Improving or optimizing code I already wrote",
          "Debugging errors after I’ve tried solving them myself",
        ],
      },
      {
        type: "p",
        text: "This way I still go through the thinking process first.",
      },
      {
        type: "p",
        text: "AI just helps when I reach a point where I need another perspective.",
      },
      { type: "h2", text: "The biggest advantage" },
      {
        type: "p",
        text: "One thing I really like about AI tools is how fast they can explain things.",
      },
      {
        type: "p",
        text: "Sometimes documentation or tutorials take a while to go through. AI can break something down quickly and give examples that make it easier to understand.",
      },
      {
        type: "p",
        text: "But again, the important part is not skipping the thinking process.",
      },
      { type: "h2", text: "The balance that works for me" },
      {
        type: "p",
        text: "For me, the best way to use AI while learning programming is simple.",
      },
      {
        type: "ul",
        items: [
          "First try solving the problem yourself.",
          "If you’re stuck for a long time, then use AI as a guide.",
        ],
      },
      {
        type: "p",
        text: "That way you still build the problem solving skills that actually matter in software development.",
      },
      {
        type: "p",
        text: "Because at the end of the day, knowing how to think through problems is more valuable than just generating code quickly.",
      },
    ],
  },
  {
    slug: "lessons-i-learned-building-my-own-projects",
    title: "Lessons I Learned While Building My Own Projects",
    description:
      "Because at the end of the day, the experience of building something on your own sticks with you far longer than any assignment ever will.",
    date: "March 2026",
    readTime: "5 min",
    tags: ["Development", "Projects"],
    content: [
      { type: "h2", text: "Starting my own projects" },
      {
        type: "p",
        text: "When I first started studying software engineering, I mostly worked on assignments and tutorials. Everything was structured, step by step. It helped me learn the basics, but it didn’t feel like I was building anything real.",
      },
      {
        type: "p",
        text: "So I decided to start my own small projects—just things I wanted to try out. At first, they were simple: small apps, mini websites, tiny scripts. Nothing fancy. But what I learned from them ended up being way more valuable than any assignment.",
      },
      { type: "h2", text: "What I realized while building" },
      { type: "h2", text: "Planning matters more than coding" },
      {
        type: "p",
        text: "At first, I would just start coding. Open VS Code, start typing, and figure things out as I go. Most of the time, I ended up confused or rewriting a lot. Once I started planning even a little—sketching layouts, outlining features—the work became faster and smoother.",
      },
      { type: "h2", text: "Mistakes are inevitable" },
      {
        type: "p",
        text: "Every project I started had bugs I didn’t expect. Sometimes tiny syntax errors, sometimes logic mistakes that completely broke the app. Early on, I would get frustrated, but I learned that every mistake is an opportunity to understand how things work.",
      },
      { type: "h2", text: "Features vs simplicity" },
      {
        type: "p",
        text: "It’s easy to get carried away and add too many features. But the more I experimented, the more I realized that a small, working feature is better than a half-baked big idea. Simplicity matters.",
      },
      { type: "h2", text: "Skills I actually improved" },
      {
        type: "ul",
        items: [
          "Debugging mindset: learning to read errors carefully, understand stack traces, and isolate issues.",
          "UI/UX thinking: figuring out how the app looks and feels, not just if it works.",
          "Project structure: organizing files, code, and logic in a clean way.",
          "Time management: balancing coding, debugging, and learning new things efficiently.",
        ],
      },
      {
        type: "p",
        text: "All these came naturally while working on personal projects rather than just completing assignments.",
      },
      { type: "h2", text: "Why personal projects are worth it" },
      {
        type: "p",
        text: "They force you to think beyond instructions. You’re the one deciding how the app should behave, how it should look, and how it should handle mistakes. That’s a kind of problem-solving that tutorials can’t teach you.",
      },
      {
        type: "p",
        text: "And even if the project isn’t perfect, you’ve learned so much just by trying, failing, and fixing it. That’s exactly what makes your portfolio stand out.",
      },
      { type: "h2", text: "A tip for fellow students" },
      {
        type: "p",
        text: "Start small. Don’t aim to build the next big app. Even a tiny script, a small tool, or a mini web project will teach you more than hours of tutorials. Focus on learning while building, not just completing a checklist.",
      },
      {
        type: "p",
        text: "Because at the end of the day, the experience of building something on your own sticks with you far longer than any assignment ever will.",
      },
    ],
  },
  {
    slug: "the-day-i-spent-hours-debugging-a-one-line-mistake",
    title: "The Day I Spent Hours Debugging a One Line Mistake",
    description:
      "The thing is If you haven’t lost hours to a single typo, you haven’t truly debugged yet.",
    date: "March 2026",
    readTime: "4 min",
    tags: ["Student Life", "Debugging"],
    content: [
      { type: "h2", text: "That early diploma moment" },
      {
        type: "p",
        text: "Back when I was in the early stages of my Higher Diploma, I was still figuring out the basics. Everything felt like a challenge, and every little mistake felt huge.",
      },
      {
        type: "p",
        text: "One day, I spent hours debugging a project, convinced something was seriously wrong with my logic. My brain was full of panic and “why isn’t this working” energy.",
      },
      {
        type: "p",
        text: "Turns out… it was just a tiny syntax error. One missing semicolon. One lowercase letter. One character. That’s it.",
      },
      { type: "h2", text: "How it unfolded" },
      {
        type: "p",
        text: "I had been staring at my code for so long that I started questioning everything.",
      },
      {
        type: "ul",
        items: [
          "Was my logic wrong?",
          "Was my environment broken?",
          "Did I misunderstand the concept entirely?",
        ],
      },
      {
        type: "p",
        text: "I tried almost everything: rewriting functions, reinstalling packages, checking tutorials. Nothing worked.",
      },
      {
        type: "p",
        text: "Finally, when I took a short break and looked carefully, I noticed it: a single typo in my variable name. That was causing the whole thing to fail.",
      },
      { type: "h2", text: "What I learned from this “simple” mistake" },
      {
        type: "p",
        text: "Attention to detail matters. Sometimes the problem isn’t complex—it’s tiny, easy to overlook, but completely critical. Debugging is as much about patience as skill.",
      },
      {
        type: "p",
        text: "Step away and come back. Taking a break helped me see the error immediately. When you’re stuck, staring longer doesn’t always help.",
      },
      {
        type: "p",
        text: "Errors aren’t failures. Early on, it felt like I had failed. Later I realized that debugging is learning. Every mistake teaches you something—even a one-character mistake.",
      },
      {
        type: "p",
        text: "Develop a systematic approach. After that day, I started using small steps to debug: checking console logs, reviewing code line by line, and testing small sections separately. It saved me countless hours later.",
      },
      { type: "h2", text: "The funny side" },
      {
        type: "p",
        text: "Looking back, it’s actually kind of hilarious. I spent half a day panicking over one character, and yet that moment helped me grow more as a developer than many “perfectly working” assignments.",
      },
      {
        type: "p",
        text: "The thing is If you haven’t lost hours to a single typo, you haven’t truly debugged yet.",
      },
      {
        type: "p",
        text: "Debugging is part of coding. Sometimes the biggest lessons come from the smallest mistakes. That early experience taught me patience, attention to detail, and a better debugging mindset  skills I still use today.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
