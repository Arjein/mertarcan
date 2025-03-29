import { ReactNode } from 'react';

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

export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: number;
  link: string;
  category: string;
  author: string;
  authorImage: string;
  coverImage: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
}