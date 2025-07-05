import { allContent, type AllContent } from '@/content';

export const useContent = (): AllContent => {
  return allContent;
};

// Helper function to get content by path (e.g., 'home.hero.title')
export const getContentByPath = (path: string): any => {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], allContent);
}; 