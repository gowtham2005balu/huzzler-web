# Huzzler Unified Application

This is a merged React + Vite application combining all Huzzler frontend projects into a single, unified application with shared navigation and routing.

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Global shared navbar
│   ├── ErrorBoundary.tsx       # Error handling
│   ├── ManusDialog.tsx         # Dialog component
│   ├── Map.tsx                 # Maps integration
│   └── ui/                     # shadcn/ui components
├── layouts/
│   └── MainLayout.tsx          # Main layout wrapper with Navbar
├── pages/
│   ├── Home/                   # Home/FAQ page (from huzzler-frontend-main)
│   ├── DesignJS/               # Blog design page (from huzzler-frontend-design.js)
│   ├── HuzzlerAI/              # AI landing page (from huzzler-ai)
│   │   ├── components/         # Page-specific components
│   │   └── assets/             # Page-specific assets
│   ├── Component6/             # Dashboard page (from component-6)
│   └── NotFound.tsx            # 404 page
├── routes/
│   └── AppRoutes.tsx           # Route configuration
├── App.tsx                     # Main app component
└── main.tsx                    # Entry point
```

## Routes

The application includes the following routes:

- **`/`** - Home page (FAQ/Help Center)
- **`/design-js`** - Blog design page
- **`/huzzler-ai`** - AI landing page
- **`/component-6`** - Dashboard page
- **`/404`** - 404 Not Found page

## Key Features

### Shared Navbar
- Global navigation component extracted from `huzzler-frontend-design.js`
- Consistent branding across all pages
- Sticky positioning with navigation links

### Unified Routing
- Uses Wouter for lightweight client-side routing
- MainLayout wrapper ensures Navbar appears on all pages
- 404 fallback for undefined routes

### Preserved UI
- All original page designs preserved exactly as they were
- No UI redesign or modifications
- Each page maintains its original styling and functionality

### Merged Dependencies
- React 19.2.1
- Vite 7.1.7
- Tailwind CSS 4.1.14
- Recharts for charts
- Framer Motion for animations
- Radix UI components
- And many more...

## Installation & Development

### Install Dependencies
```bash
pnpm install
```

### Start Development Server
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### Build for Production
```bash
pnpm build
```

### Type Checking
```bash
pnpm check
```

## Merged Projects

1. **huzzler-frontend-main** → Home page
2. **huzzler-frontend-design.js** → Design JS page (navbar source)
3. **design.js** → Integrated components
4. **huzzler-ai** → HuzzlerAI page with all components
5. **huzzler-frontend-component-1** → Component dependencies
6. **component-6** → Dashboard page

## Notes

- All pages use the shared Navbar component
- Original navbars from individual pages have been removed
- Import paths have been fixed to work with the unified structure
- TypeScript configuration ensures type safety
- All assets are properly referenced

## Development Guidelines

### Adding New Pages
1. Create a new folder in `src/pages/`
2. Create an `index.tsx` file with your page component
3. Add a route in `src/routes/AppRoutes.tsx`
4. The MainLayout will automatically wrap it with the Navbar

### Styling
- Use Tailwind CSS utilities
- Global styles in `src/index.css`
- Component-specific styles can be added as inline styles or CSS modules

### Components
- Reusable components go in `src/components/`
- Page-specific components can live in their page folder
- Use shadcn/ui components from `@/components/ui/`

## Troubleshooting

### Build Issues
- Run `pnpm install` to ensure all dependencies are installed
- Run `pnpm check` to verify TypeScript types
- Clear `node_modules` and `pnpm-lock.yaml` if experiencing issues

### Runtime Issues
- Check browser console for errors
- Verify all import paths are correct
- Ensure all components are properly exported

## License

All original projects are merged into this unified application.
