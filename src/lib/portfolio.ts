export const projects = [
  {
    id: "leetcode",
    title: "100 days. One challenge.",
    name: "100 Days LeetCode Challenge",
    category: "PROBLEM SOLVING",
    description:
      "A journey through 100 days of LeetCode questions. Building consistency, sharpening problem-solving skills, and learning one solution at a time.",
    tags: ["LeetCode", "Algorithms", "Problem solving"],
    github: "https://github.com/hritik4160-oss/100DaysLeetCodeChallange",
    number: "01",
  },
  {
    id: "portfolio",
    title: "A little corner of the internet.",
    name: "Personal Portfolio",
    category: "WEB DEVELOPMENT",
    description:
      "A personal portfolio built with HTML and CSS to showcase my skills, projects, and interests. A simple, responsive introduction to my work and learning journey.",
    tags: ["HTML", "CSS", "Responsive design"],
    github: "https://github.com/hritik4160-oss/html.portfolio",
    number: "02",
  },
];
export const skills = [
  {
    name: "C",
    label: "The foundations",
    description:
      "Learning how software works from the ground up, through structured programming and memory fundamentals.",
    stack: "C · Programming fundamentals",
    projects: "Coursework and practice",
    tone: "silver",
  },
  {
    name: "C++",
    label: "Problem solver",
    description:
      "Exploring algorithms, data structures, and efficient approaches to challenging problems.",
    stack: "C++ · Data structures · Algorithms",
    projects: "Problem-solving practice",
    tone: "blue",
  },
  {
    name: "Java",
    label: "Object oriented",
    description: "Building a foundation in object-oriented thinking and reusable software design.",
    stack: "Java · OOP",
    projects: "Coursework and practice",
    tone: "peach",
  },
  {
    name: "HTML/CSS",
    label: "The visual world",
    description: "Turning ideas into structured, responsive interfaces for the web.",
    stack: "HTML · CSS · Responsive layouts",
    projects: "Personal Portfolio",
    tone: "mint",
  },
  {
    name: "JavaScript",
    label: "Making it alive",
    description:
      "Exploring interactivity, browser behavior, and the building blocks of modern web development.",
    stack: "JavaScript · DOM · Web fundamentals",
    projects: "Learning and experiments",
    tone: "gold",
  },
];
export const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
export function makeEmailDraft(name: string, email: string, message: string) {
  return `mailto:hritik4160@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`)}`;
}
