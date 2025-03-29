import { Article, SocialLink } from '@/types';
import projectsData from '@/data/projects.json';
import articlesData from '@/data/articles.json';
import socialLinksData from '@/data/social-links.json';
import experiencesData from '@/data/experiences.json';
import skillsData from '@/data/skills.json';
import educationData from '@/data/education.json';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: Skill[];
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  period: string;
  description: string;
  achievements?: string[];
  courses?: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string; // Added optional demo property
  category: string;
  coverImage: string;
  details: string[];
}

export class DataService {
  private static projects: Project[] = projectsData.projects;
  private static articles: Article[] = articlesData.articles;
  private static socialLinks: SocialLink[] = socialLinksData.socialLinks;
  private static experiences: Experience[] = experiencesData.experiences;
  private static skills: SkillCategory[] = skillsData.skills;
  private static education: Education[] = educationData.education;

  static getProjects(): Project[] {
    return this.projects;
  }

  static getFeaturedProjects(): Project[] {
    return this.projects.slice(0, 3);
  }

  static getArticles(): Article[] {
    return this.articles;
  }

  static getSocialLinks(): SocialLink[] {
    return this.socialLinks;
  }

  static getProjectById(id: number): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  static getArticleById(id: number): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  static getFeaturedArticles(): Article[] {
    return this.articles;
  }

  static getExperiences(): Experience[] {
    return this.experiences;
  }

  static getSkills(): SkillCategory[] {
    return this.skills;
  }

  static getEducation(): Education[] {
    return this.education;
  }
}