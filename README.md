# Aerostatic - Adventure is in the Air

Reviving the spirit of true adventure in a world addicted to comfort. Share your journey, inspire others, and get rewarded for your boldness.

## 🎈 About Aerostatic

Aerostatic is a platform that celebrates and rewards authentic adventure. Whether you're planning an epic journey or sharing a completed expedition, our community encourages bold exploration and meaningful experiences.

### Key Features

- **Adventure Sharing**: Post ideas for future adventures or document completed journeys
- **Interactive Globe**: Explore adventures from around the world on an interactive 3D globe
- **Community Encouragement**: Support fellow adventurers with encouragements and contributions
- **Reward System**: Get rewarded for sharing inspiring adventures and supporting others
- **Dark Aesthetic**: Immersive dark theme that captures the spirit of adventure

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn
- Supabase account (for database)
- Mapbox account (for maps)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aerostatic
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

### Typography
- **Gelica**: Primary display font for headings and branding
- **Gin**: Secondary serif font for elegant text
- **Inter**: System font for body text and UI elements

### Color Palette
- **Background**: Deep slate tones for immersive experience
- **Accent**: Blue to purple gradients for adventure elements
- **Text**: High contrast whites and grays for readability

### Components
- Glass morphism effects for modern UI elements
- Responsive design for all device sizes
- Accessible color contrasts and interactions

## 🗺️ Adventure Types

### Ideas
Adventures that are planned but not yet completed. These can receive:
- Community encouragements
- Financial contributions
- Collaborative planning input

### Completed
Adventures that have been successfully completed with:
- Photo/video evidence
- Detailed journey documentation
- Success metrics verification

## 🏗️ Technical Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Database**: Supabase (PostgreSQL)
- **Maps**: Mapbox GL JS
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (buttons, cards, etc.)
│   ├── Header.tsx         # Main navigation
│   ├── Footer.tsx         # Site footer
│   └── GlobeComponent.tsx # Interactive 3D globe
├── lib/                   # Utility functions and configurations
│   ├── supabase.ts       # Database types and client
│   ├── utils.ts          # General utilities
│   └── sample-data.ts    # Sample adventure data
└── styles/               # Global styles and themes
```

## 🌍 Contributing

We welcome contributions that align with the spirit of authentic adventure! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Adventure submission and moderation
- [ ] Payment integration for contributions
- [ ] Mobile app development
- [ ] Community features and messaging
- [ ] Adventure verification system

---

*Adventure is in the air. What's your next journey?*