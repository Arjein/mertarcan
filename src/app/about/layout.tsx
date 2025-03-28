import { Metadata } from 'next';
import AboutPage from './page';

export const metadata: Metadata = {
  title: 'About Me | Mert Arcan',
  description: 'Learn more about my background, experience, and skills in machine learning and software development.',
};

export default function AboutLayout() {
  return <AboutPage />;
} 