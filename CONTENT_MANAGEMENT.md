# Content Management System

This project now includes a centralized content management system that allows you to easily update all copy and text content across the entire website from a single configuration file.

## Overview

All text content is now managed through the `src/content/siteContent.ts` file. This includes:
- Site metadata (name, description, email, etc.)
- Navigation menu items
- Page content (hero sections, about text, services, etc.)
- Footer content
- Form labels and UI text
- Button text and messages

## How to Use

### 1. Updating Content

To change any text on the website, edit the `src/content/siteContent.ts` file:

```typescript
export const siteContent = {
  site: {
    name: "Aerostatic",
    tagline: "Your new tagline here",
    description: "Updated description here",
    // ...
  },
  
  home: {
    hero: {
      title: "Your new hero title",
      primaryButton: "New CTA text",
      // ...
    }
  }
  // ...
}
```

### 2. Using Content in Components

Components can access the content using the `useContent` hook:

```typescript
import { useContent } from '@/hooks/useContent';

export default function MyComponent() {
  const content = useContent();
  
  return (
    <div>
      <h1>{content.site.name}</h1>
      <p>{content.home.hero.title}</p>
    </div>
  );
}
```

### 3. Helper Functions

You can also use the helper function for deep access:

```typescript
import { getContentByPath } from '@/hooks/useContent';

// Get content by dot notation path
const title = getContentByPath('home.hero.title');
```

## Content Structure

The content is organized into logical sections:

### Site Metadata
```typescript
site: {
  name: string,
  tagline: string,
  description: string,
  email: string,
  baseUrl: string
}
```

### Navigation
```typescript
navigation: {
  menuItems: Array<{
    name: string,
    href: string,
    isSection?: boolean
  }>,
  cta: string
}
```

### Page Content
Each page has its own section:
- `home` - Homepage content
- `about` - About page content  
- `hireUs` - Hire Us page content
- `merch` - Merchandise page content

### Footer
```typescript
footer: {
  description: string,
  sections: {
    services: { title: string, links: Array<...> },
    connect: { title: string, socialLinks: Array<...> }
  },
  newsletter: { title: string, placeholder: string, ... },
  legal: { copyright: string, links: Array<...> }
}
```

### UI Elements
```typescript
ui: {
  buttons: {
    learnMore: string,
    getStarted: string,
    // ...
  },
  messages: {
    loading: string,
    error: string,
    success: string
  }
}
```

## Examples

### Updating Homepage Hero Section

```typescript
// In src/content/siteContent.ts
home: {
  hero: {
    title: "Your new hero message here",
    primaryButton: "New CTA text",
    secondaryButton: "Secondary action"
  }
}
```

### Adding New Services

```typescript
// In src/content/siteContent.ts
home: {
  services: {
    items: [
      {
        title: "New Service",
        description: "Description of your new service offering"
      }
      // ... existing services
    ]
  }
}
```

### Updating Footer Links

```typescript
// In src/content/siteContent.ts
footer: {
  sections: {
    services: {
      links: [
        { name: "New Link", href: "/new-page" },
        { name: "Existing Link", href: "/existing", disabled: false }
      ]
    }
  }
}
```

## Already Updated Components

The following components have been updated to use the centralized content:

- ✅ `Header.tsx` - Navigation menu and branding
- ✅ `Footer.tsx` - All footer sections and links  
- ✅ `HomePage` (partial) - Hero and mission sections

## Components to Update

The following components still need to be updated:

- ❌ `HomePage` - Services section and other content
- ❌ `AboutPage` - All content sections
- ❌ `HireUsPage` - Form labels and service descriptions
- ❌ `MerchPage` - Product and story content
- ❌ Other page components

## Migration Guide

To update a component to use the content system:

1. Import the hook:
```typescript
import { useContent } from '@/hooks/useContent';
```

2. Get the content in your component:
```typescript
const content = useContent();
```

3. Replace hardcoded strings:
```typescript
// Before
<h1>Hardcoded Title</h1>

// After  
<h1>{content.section.title}</h1>
```

4. Update the content structure in `siteContent.ts` if needed

## Benefits

- **Centralized Management**: All content in one place
- **Type Safety**: TypeScript ensures content structure consistency
- **Easy Updates**: Change text without touching component code
- **Consistency**: Ensures consistent messaging across the site
- **Internationalization Ready**: Structure supports future i18n implementation

## Best Practices

1. **Use descriptive keys**: Make content paths self-documenting
2. **Group related content**: Keep similar content together
3. **Maintain structure**: Don't break existing content paths
4. **Add new sections**: Extend the structure as needed
5. **Use HTML sparingly**: Only when formatting is needed

## Future Enhancements

- Content versioning
- A/B testing support
- CMS integration
- Internationalization (i18n)
- Content validation
- Dynamic content loading 