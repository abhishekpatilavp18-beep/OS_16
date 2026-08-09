export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Your First Project",
    description:
      "A short description of your project goes here.",
    technologies: ["React", "Node.js"],
    github: "",
    live: "",
  },

  {
    id: "project-2",
    title: "Your Second Project",
    description:
      "A short description of your second project goes here.",
    technologies: ["C++", "Algorithms"],
    github: "",
    live: "",
  },
];