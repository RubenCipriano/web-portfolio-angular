export interface Project {
  title: string;
  description: string;
  thumbnail?: string;   // e.g. 'assets/projects/portfolio.png' (optional)
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}
