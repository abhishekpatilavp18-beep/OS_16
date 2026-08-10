import { Router } from "express";

const router = Router();

const projects = [
  {
    id: "project-1",
    title: "AbhishekOS",
    description: "A personal portfolio operating system built with React and TypeScript.",
    technologies: ["React", "TypeScript", "CSS"],
    github: "",
    live: "",
  },
];

router.get("/", (_req, res) => {
  res.json({
    success: true,
    projects,
  });
});

export default router;