import { siteContent, type SiteContent } from '@/content/siteContent';

export const useContent = (): SiteContent => {
  return siteContent;
};

// Helper function to get content by path (e.g., 'home.hero.title')
export const getContentByPath = (path: string): any => {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], siteContent);
}; 