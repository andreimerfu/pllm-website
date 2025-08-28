<div align="center">

# 🚀 pLLM Website

[![Astro](https://img.shields.io/badge/Astro-5.13.4-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**Enterprise-grade marketing website for pLLM - High-Performance LLM Gateway**

[🌐 Live Site](https://pllm.dev) • [📖 Documentation](https://github.com/andreimerfu/pllm) • [🐛 Report Bug](https://github.com/andreimerfu/pllm/issues)

</div>

---

## ✨ About

This is the official marketing website for **pLLM** - an enterprise-grade LLM gateway built in Go. The site showcases pLLM's features, architecture, benchmarks, and provides comprehensive documentation links.

### 🎯 Key Features

- 🎨 **Modern Design** - Clean, professional interface with interactive components
- ⚡ **High Performance** - Static site generation with optimized loading
- 📱 **Responsive** - Mobile-first design that works on all devices  
- 🔍 **SEO Optimized** - Complete meta tags, Open Graph, and structured data
- 🎭 **Interactive** - Dynamic flow diagrams and architecture visualizations
- 🚀 **Fast Development** - Hot reload with Astro's dev server

## 🛠️ Tech Stack

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Astro](https://img.shields.io/badge/Astro-5.13.4-FF5D01?style=flat-square&logo=astro) | `5.13.4` | Static site generator & framework |
| ![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react) | `19.1.1` | Interactive components |
| ![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript) | Latest | Type safety |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?style=flat-square&logo=tailwind-css) | `4.1.12` | Utility-first CSS |
| ![Iconify](https://img.shields.io/badge/Iconify-6.0.0-FF6B6B?style=flat-square) | `6.0.0` | Icon system |
| ![XYFlow](https://img.shields.io/badge/XYFlow-12.8.4-9CA3AF?style=flat-square) | `12.8.4` | Flow diagrams |

</div>

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0+ 
- **npm** 8.0+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pllm-website

# Install dependencies
npm install

# Start development server
npm run dev
```

🎉 **That's it!** Open [http://localhost:4321](http://localhost:4321) in your browser.

## 📋 Available Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | 🔥 Start development server | Development |
| `npm run build` | 🏗️ Build for production | Deployment |
| `npm run preview` | 👀 Preview production build | Testing |
| `npm run astro` | 🛠️ Run Astro CLI commands | Maintenance |

## 🏗️ Project Structure

```text
📁 pllm-website/
├── 📁 public/                 # Static assets
│   └── favicon.svg
├── 📁 src/
│   ├── 📁 components/         # UI Components
│   │   ├── 📄 *.astro        # Server-side components  
│   │   └── 📄 *.tsx          # Client-side React components
│   ├── 📁 layouts/           # Page layouts
│   │   └── Layout.astro      # Main layout with SEO
│   ├── 📁 lib/              # Utilities
│   │   └── utils.ts         # Helper functions
│   ├── 📁 pages/            # Route pages
│   │   ├── index.astro      # Homepage
│   │   └── docs.astro       # Documentation page
│   └── 📁 styles/           # Global styles
├── 📄 astro.config.mjs      # Astro configuration
├── 📄 package.json          # Dependencies
├── 📄 tailwind.config.js    # Tailwind configuration
└── 📄 tsconfig.json         # TypeScript configuration
```

## 🎨 Components Architecture

### 🖥️ Astro Components (Server-side)
- **Navigation.astro** - Main navigation bar
- **Hero.astro** - Homepage hero section
- **Features.astro** - Feature showcase
- **Architecture.astro** - System architecture section
- **BenchmarkSection.astro** - Performance benchmarks
- **QuickStart.astro** - Getting started guide
- **Footer.astro** - Site footer

### ⚛️ React Components (Client-side)
- **HeroIllustration.tsx** - Animated hero graphics
- **ArchitectureDiagram.tsx** - Interactive system diagram
- **InteractiveFlowDiagram.tsx** - Request flow visualization
- **PerformanceChart.tsx** - Performance metrics charts
- **CustomIcons.tsx** - Custom SVG icon library

## 🎯 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| 🏠 **Homepage** | `/` | Main landing page with features, architecture, and quick start |
| 📚 **Documentation** | `/docs` | Documentation hub with links to GitHub docs |

## 🌐 SEO & Performance

- ✅ **Complete Meta Tags** - Title, description, keywords
- ✅ **Open Graph** - Social media sharing optimization  
- ✅ **Twitter Cards** - Enhanced Twitter sharing
- ✅ **Structured Data** - Schema.org JSON-LD markup
- ✅ **Sitemap Generation** - Automatic XML sitemap
- ✅ **Optimized Loading** - Font preloading, image optimization
- ✅ **Mobile-First** - Responsive design principles

## 🚀 Deployment

The site is configured for deployment at **https://pllm.dev**

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

Built files will be in the `dist/` directory, ready for deployment to any static hosting provider.

## 📝 Contributing

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)  
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is part of the pLLM ecosystem. See the [main repository](https://github.com/andreimerfu/pllm) for license information.

---

<div align="center">

**Built with ❤️ for the pLLM community**

[🌟 Star on GitHub](https://github.com/andreimerfu/pllm) • [🐛 Report Issues](https://github.com/andreimerfu/pllm/issues) • [💬 Discussions](https://github.com/andreimerfu/pllm/discussions)

</div>
