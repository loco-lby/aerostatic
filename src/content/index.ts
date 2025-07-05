import { siteContent, type SiteContent } from './site';
import { navigationContent, type NavigationContent } from './navigation';
import { homeContent, type HomeContent } from './home';
import { aboutContent, type AboutContent } from './about';
import { footerContent, type FooterContent } from './footer';

export { siteContent, navigationContent, homeContent, aboutContent, footerContent };
export type { SiteContent, NavigationContent, HomeContent, AboutContent, FooterContent };

// Combined content type for the useContent hook
export type AllContent = {
  site: SiteContent;
  navigation: NavigationContent;
  home: HomeContent;
  about: AboutContent;
  footer: FooterContent;
};

// Combined content object
export const allContent: AllContent = {
  site: siteContent,
  navigation: navigationContent,
  home: homeContent,
  about: aboutContent,
  footer: footerContent,
}; 