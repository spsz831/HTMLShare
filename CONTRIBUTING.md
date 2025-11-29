# Contributing to HTMLShare

Thank you for your interest in contributing to HTMLShare! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/HTMLShare.git
   cd HTMLShare
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Visit** `http://localhost:4321`

## 🛠️ Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow conventional commits format:
- `feat: add new sharing feature`
- `fix: resolve upload issue`
- `docs: update README`
- `style: format code`
- `refactor: optimize database queries`

### Code Style
- Use TypeScript for type safety
- Follow existing code formatting
- Add comments for complex logic
- Ensure responsive design

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build project
npm run build

# Clean build artifacts
npm run clean
```

## 📝 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: your descriptive message"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit Pull Request**
   - Use the PR template
   - Provide clear description
   - Link related issues
   - Add screenshots if UI changes

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Check existing issues first
- Provide clear use case
- Explain expected behavior
- Consider implementation complexity

## 📚 Project Structure

```
HTMLShare/
├── src/
│   ├── pages/          # Astro pages and API routes
│   ├── layouts/        # Page layouts
│   ├── lib/           # Utility libraries
│   └── env.d.ts       # Type definitions
├── public/            # Static assets
├── scripts/           # Build and deployment scripts
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run clean` - Clean build artifacts

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

## 📞 Getting Help

- 📧 Create an issue for bugs/features
- 💬 Start a discussion for questions
- 📖 Check existing documentation

Thank you for contributing to HTMLShare! 🎉