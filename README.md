# All-in-One Tools - Bun.js + TypeScript

A modern, atomic-structured web application built with Bun.js and TypeScript for managing games, tools, experiments, and blog posts.

## 🏗️ Atomic Architecture

The application follows an atomic design pattern with clear separation of concerns:

```
src/
├── config/          # Application configuration
├── routes/          # Route handlers (atomic route modules)
├── services/        # Business logic services
├── templates/       # HTML template generators
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app setup
└── index.ts         # Application entry point
```

## 🚀 Features

- **Atomic Structure**: Modular, maintainable codebase
- **TypeScript**: Full type safety
- **Bun.js Runtime**: Fast JavaScript runtime
- **Markdown Support**: Render .md files with LaTeX and Mermaid
- **Responsive Design**: Mobile-friendly interface
- **Hacker Theme**: Cool terminal-style theme toggle
- **File Management**: Automatic folder creation and organization

## 📋 Prerequisites

- [Bun.js](https://bun.sh/) installed on your system

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd All-in-one-tools-beta
```

2. Install dependencies:
```bash
bun install
```

3. Create required folders (or they'll be created automatically):
```bash
mkdir -p public game tools experiment blog
```

## 🎯 Usage

### Development
```bash
bun run dev
```

### Production
```bash
bun run start
```

### Type Checking
```bash
bun run type-check
```

### Build
```bash
bun run build
```

## 📁 File Organization

- **`/game`** - HTML games and game documentation (MD)
- **`/tools`** - Utility tools and their documentation
- **`/experiment`** - Experimental projects and demos
- **`/blog`** - Blog posts and articles (MD/HTML)
- **`/public`** - Static assets (CSS, JS, images)

## 🎮 Supported File Types

- **`.html`** - Interactive applications, games, tools
- **`.md`** - Documentation with LaTeX math and Mermaid diagrams

## 📊 Markdown Features

### LaTeX Math
```markdown
Inline: $E = mc^2$
Block: $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
```

### Mermaid Diagrams
```markdown
<div class="mermaid">
graph TD
    A[Start] --> B[Process]
    B --> C[End]
</div>
```

## 🏗️ Atomic Components

### Configuration (`src/config/`)
- `app.ts` - Application settings and constants

### Types (`src/types/`)
- `index.ts` - TypeScript interfaces and types

### Utilities (`src/utils/`)
- `fileSystem.ts` - File operations and folder management

### Services (`src/services/`)
- `markdownService.ts` - Markdown processing and rendering

### Templates (`src/templates/`)
- `htmlTemplate.ts` - HTML generation functions

### Routes (`src/routes/`)
- `homeRoutes.ts` - Main page routing
- `fileRoutes.ts` - File serving and processing

## 🔧 Development

The atomic structure makes it easy to:

1. **Add new features** - Create new atomic modules
2. **Modify functionality** - Edit specific atomic components
3. **Maintain code** - Clear separation of concerns
4. **Test components** - Each module is independently testable

## 🌐 Deployment

### Vercel
The project is configured for Vercel deployment with `vercel.json`.

### Other Platforms
Standard Node.js deployment process with Bun.js runtime.

## 🎨 Themes

- **Default Theme** - Clean, modern interface
- **Hacker Theme** - Terminal-style green-on-black aesthetic

## 📝 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Follow the atomic structure pattern
4. Add TypeScript types for new features
5. Test your changes
6. Submit a pull request

---

Built with ❤️ using Bun.js and TypeScript 