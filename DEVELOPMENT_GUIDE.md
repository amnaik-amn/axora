# AXORA - Development Guide

A modern educational platform prototype built with React and Tailwind CSS, featuring AI-guided learning paths, real-world challenges, and community features.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.js       # Button with variants and sizes
│   │   ├── Card.js         # Card with header/content/footer
│   │   ├── Badge.js        # Status badges
│   │   ├── ProgressBar.js  # Progress indicators
│   │   ├── Tab.js          # Tabbed interfaces
│   │   └── index.js        # UI components export
│   ├── layout/             # Layout components
│   │   ├── Container.js    # Responsive containers
│   │   ├── Section.js      # Page sections
│   │   └── index.js        # Layout components export
│   ├── AppShell.js         # Main app navigation
│   └── Footer.js           # Site footer
├── pages/                  # Page components
│   ├── Landing.js          # Marketing landing page
│   ├── Login.js            # Authentication page
│   ├── Home.js             # Dashboard
│   ├── Study.js            # Study hub
│   ├── Challenges.js       # Challenge browser
│   ├── Community.js        # Community features
│   └── Profile.js          # User profile
├── hooks/                  # Custom React hooks
│   ├── useAuth.js          # Authentication state
│   ├── useScrollPosition.js# Scroll tracking
│   └── index.js            # Hooks export
├── constants/              # Static data and configs
│   ├── navigation.js       # Navigation items
│   ├── content.js          # Landing page content
│   └── mockData.js         # Demo data
├── auth/                   # Authentication logic
│   └── config.js           # Auth helpers
├── utils/                  # Utility functions
│   └── helpers.js          # Common helpers
└── App.js                  # Main app component
```

## 🎨 UI Components

### Button Component
```jsx
import { Button } from '../components/ui';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// As different elements
<Button as={Link} to="/login">Login</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card Component
```jsx
import { Card } from '../components/ui';

<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Content>
    <p>Content goes here</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Layout Components
```jsx
import { Container, Section } from '../components/layout';

<Section background="bg-gray-50" padding="py-20">
  <Section.Header 
    title="Section Title"
    subtitle="Section description"
  />
  <Container size="lg">
    {/* Content */}
  </Container>
</Section>
```

## 🎯 Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional interface with hover effects and animations
- **Component Library**: Reusable, well-structured components
- **Mock Data**: Realistic demo data for all features
- **Authentication**: Preset demo login system
- **Navigation**: Responsive nav with mobile bottom bar
- **Theming**: Consistent brand colors and typography

## 🔧 Development Guidelines

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route to `src/App.js`
3. Update navigation in `src/constants/navigation.js`

### Creating Components
- Use functional components with hooks
- Follow the existing component patterns
- Place reusable components in `src/components/ui/`
- Add proper prop destructuring and defaults

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the established design system:
  - Brand color: `text-brand`, `bg-brand`
  - Typography: `font-serif` for headings, `font-sans` for body
  - Spacing: Consistent padding/margins using Tailwind scale
  - Shadows: `shadow-lg`, `shadow-xl` for depth

### Data Management
- Mock data in `src/constants/mockData.js`
- Static content in `src/constants/content.js`
- Keep components pure and stateless when possible

## 🎨 Design System

### Colors
- **Brand**: #A55858 (warm brown/terracotta)
- **Ink**: #1E1E1E (dark text)
- **Paper**: #FFFFFF (white backgrounds)
- **Muted**: #ECECEC (subtle backgrounds)

### Typography
- **Headings**: Serif font (Georgia fallback)
- **Body**: Sans-serif font (system font stack)
- **Code**: Monospace for demo credentials

### Component Variants
- Primary actions use brand color
- Secondary actions use outline/ghost styles
- Danger/success use semantic colors
- AI features use purple accents

## 📱 Demo Credentials

**Email**: student@demo.com  
**Password**: demo123

## 🚦 Routing

- `/` - Landing page (marketing)
- `/login` - Authentication
- `/app` - Dashboard (protected)
- `/app/study` - Study hub (protected)
- `/app/challenges` - Challenges (protected)
- `/app/community` - Community (protected)
- `/app/profile` - User profile (protected)

## 🔄 Next Steps

This codebase is well-structured for continued development:

1. **Backend Integration**: Replace mock data with API calls
2. **Real Authentication**: Implement proper auth system
3. **User Management**: Add profile editing, preferences
4. **Content Management**: Add admin panel for content
5. **Analytics**: Track user engagement and progress
6. **Testing**: Add unit and integration tests

## 📝 Notes

- All components are fully responsive
- Uses React Router for navigation
- Authentication state managed with custom hook
- Footer matches Klorah design patterns
- No external dependencies beyond React basics