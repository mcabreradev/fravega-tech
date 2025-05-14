# GitHub User Explorer

A modern web application built with Next.js that allows you to explore GitHub users, view their profiles, and manage your favorite users. The application features a clean, responsive design with dark mode support.

![GitHub User Explorer](https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🔍 Search GitHub users by username
- 👤 View detailed user profiles
- 📚 Browse user repositories
- ⭐ Save favorite users
- 🌓 Dark/Light theme support
- 📱 Responsive design
- ⚡ Fast and efficient with React Query

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **API Client**: Axios

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── components/         # React components
│   ├── layout/        # Layout components
│   ├── ui/           # UI components (shadcn/ui)
│   └── ...           # Feature components
├── lib/              # Utility functions and API
├── pages/            # Next.js pages
├── styles/           # Global styles
└── public/           # Static assets
```

## Features in Detail

### User Search
- Real-time search functionality
- Displays user cards with essential information
- Error handling for failed searches

### User Profiles
- Comprehensive user information
- Repository list with stats
- Social links and user metadata

### Favorites System
- Local storage-based favorites
- Add/remove favorites with one click
- Persistent across sessions

### Theme Support
- System-based theme detection
- Manual theme toggle
- Smooth theme transitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.