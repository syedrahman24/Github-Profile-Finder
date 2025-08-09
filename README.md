# GitHub Profile Finder 🔍

A modern, responsive web application built with ReactJS that allows users to search for GitHub profiles and explore their public information, repositories, and statistics.

![GitHub Profile Finder](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### Basic Features
- **Profile Search**: Enter any GitHub username to fetch their profile
- **Profile Information**: Display avatar, name, username, bio, location, and website
- **Statistics**: Show followers, following, and public repository counts
- **Top Repositories**: Display the top 5 repositories sorted by stars
- **Repository Details**: Show repo name, description, language, stars, forks, and last update
- **Error Handling**: User-friendly error messages for invalid usernames

### Advanced Features
- **🌙 Dark/Light Theme**: Toggle between themes with localStorage persistence
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **🔄 Loading States**: Beautiful loading spinners and animations
- **📝 Search History**: Keep track of the last 5 searched usernames
- **🎨 Modern UI**: Glassmorphism design with smooth animations
- **♿ Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd "Github Finder"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
Github Finder/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── api/
│   │   └── github.js          # GitHub API helper functions
│   ├── components/
│   │   ├── SearchBar.jsx      # Search input component
│   │   ├── ProfileCard.jsx    # User profile display
│   │   ├── RepoList.jsx       # Repository list component
│   │   ├── ThemeToggle.jsx    # Dark/light mode toggle
│   │   ├── SearchHistory.jsx  # Recent searches component
│   │   └── LoadingSpinner.jsx # Loading animation
│   ├── utils/
│   │   ├── storage.js         # localStorage utilities
│   │   └── theme.js           # Theme management utilities
│   ├── App.js                 # Main application component
│   ├── App.css                # Global styles and Tailwind imports
│   └── index.js               # Application entry point
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Design Features

### Glassmorphism UI
- Translucent backgrounds with backdrop blur effects
- Soft shadows and rounded corners
- Smooth hover animations and transitions

### Responsive Layout
- Mobile-first design approach
- Flexible grid and flexbox layouts
- Optimized for all screen sizes

### Accessibility
- Proper semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color schemes

## 🔧 Technologies Used

- **React 18.2.0** - Modern React with Hooks
- **TailwindCSS 3.3.0** - Utility-first CSS framework
- **GitHub REST API** - Public API for fetching user data
- **LocalStorage** - Browser storage for themes and history
- **ES6+** - Modern JavaScript features

## 📱 Screenshots

### Light Mode
- Clean, bright interface with blue and purple accents
- Easy-to-read typography and clear visual hierarchy

### Dark Mode
- Elegant dark theme with proper contrast
- Consistent styling across all components

### Mobile Responsive
- Touch-friendly interface
- Optimized layouts for small screens
- Smooth scrolling and interactions

## 🌟 Key Components

### SearchBar
- Real-time input validation
- Loading states during API calls
- Quick search suggestions
- Enter key support

### ProfileCard
- Comprehensive user information display
- Social statistics with visual indicators
- External links to GitHub profile and website
- Join date and location information

### RepoList
- Top 5 repositories sorted by stars
- Language indicators with color coding
- Repository statistics (stars, forks, updates)
- Direct links to GitHub repositories

### ThemeToggle
- Smooth theme switching animation
- System preference detection
- Persistent theme storage

### SearchHistory
- Last 5 searched usernames
- Expandable/collapsible interface
- One-click re-search functionality
- Clear history option

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load only when needed
- **Memoization**: Prevent unnecessary re-renders
- **Optimized Images**: Efficient avatar loading
- **Minimal Bundle**: Tree-shaking and code splitting
- **Caching**: LocalStorage for themes and history

## 🔮 Future Enhancements

- [ ] User repository filtering and sorting
- [ ] GitHub organization support
- [ ] Advanced search filters
- [ ] Export profile data functionality
- [ ] Social sharing features
- [ ] PWA (Progressive Web App) support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Syed Rahman** - Full Stack Developer
- Portfolio: [syedrahman.dev](https://syedrahman.dev)
- GitHub: [@syedrahman](https://github.com/syedrahman)
- LinkedIn: [Syed Rahman](https://linkedin.com/in/syedrahman)

## 🙏 Acknowledgments

- GitHub API for providing public user data
- TailwindCSS for the amazing utility classes
- React team for the excellent framework
- Inter font family for beautiful typography

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

**Made with ❤️ and React by Syed Rahman**

Enjoy exploring GitHub profiles! 🚀
