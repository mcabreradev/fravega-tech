# GitHub User Explorer

A modern web application built with Next.js that allows you to explore GitHub users, view their profiles, and manage your favorite users. The application features a clean, responsive design with dark mode support.

## Features

- 🔍 Search GitHub users by username
- 👤 View detailed user profiles
- 📚 Browse user repositories
- ⭐ Save favorite users
- 🌓 Dark/Light theme support
- 📱 Responsive design
- ⚡ Fast and efficient with React Query

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- pnpm (v8.0.0 or higher)
- Git

## Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:
   ```env
   GITHUB_ACCESS_TOKEN=your_github_personal_access_token
   ```
   > Note: While the app works without a token, you'll have limited API requests. Create a token at: GitHub Settings > Developer Settings > Personal Access Tokens

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **API Client**: Axios

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/mcabreradev/fravega-tech.git
   cd fravega-tech
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## Project Structure

```
├── components/       # React components
│   ├── layout/      # Layout components
│   ├── ui/          # UI components (shadcn/ui)
│   └── ...          # Feature components
├── lib/             # Utility functions and API
├── pages/           # Next.js pages
├── styles/          # Global styles
├── types/           # TypeScript types
├── hooks/           # Custom React hooks
└── public/          # Static assets
```

## Features in Detail

### User Search

- Real-time search with debouncing
- Displays user cards with essential information
- Error handling for failed searches
- Pagination support for search results

### User Profiles

- Comprehensive user information display
- Repository list with sorting and filtering
- Social links and user metadata
- Repository statistics and language breakdown

### Favorites System

- Local storage-based favorites management
- Add/remove favorites with one click
- Persistent across sessions
- Sync state across tabs

### Theme Support

- System-based theme detection
- Manual theme toggle
- Smooth theme transitions
- Persisted theme preference

## API Rate Limiting

The GitHub API has rate limiting:

- Unauthenticated requests: 60 requests per hour
- Authenticated requests: 5,000 requests per hour

To avoid rate limiting, set up your GitHub token as described in the Environment Setup section.

## Performance Optimizations

- React Query for efficient data fetching and caching
- Image optimization with Next.js Image component
- Debounced search to minimize API calls
- Incremental Static Regeneration for user profiles
- Code splitting and lazy loading

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow

1. Pick an issue to work on
2. Create a new branch
3. Write your code
4. Add tests if applicable
5. Ensure all tests pass
6. Submit a pull request

## Troubleshooting

### Common Issues

1. **Rate Limiting**

   - Error: "API rate limit exceeded"
   - Solution: Set up a GitHub token as described in Environment Setup

2. **Build Errors**

   - Error: "Module not found"
   - Solution: Run `pnpm install` to ensure all dependencies are installed

3. **Type Errors**
   - Run `pnpm type-check` to identify type issues
   - Ensure your TypeScript version matches the project's

## TypeScript Type Checking

The project uses TypeScript for type safety. To check for type errors:

```bash
pnpm type-check
```

This command:

- Runs the TypeScript compiler in type-checking mode
- Checks all TypeScript files in the project
- Reports any type errors found
- Does not generate any JavaScript output files

It's recommended to:

- Run type checking before committing changes
- Include type checking in your CI/CD pipeline
- Fix any type errors before merging code

### Common Type Issues

1. Missing type declarations for imported modules

   - Solution: Install appropriate `@types/*` packages

2. Incompatible prop types in React components

   - Solution: Check component prop interfaces and make sure they match usage

3. Incorrect generic type parameters
   - Solution: Verify generic type arguments match expected types

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [GitHub API](https://docs.github.com/en/rest) for the data
- [Next.js](https://nextjs.org/) team for the amazing framework
