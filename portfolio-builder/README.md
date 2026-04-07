# Portfolio Builder SaaS Platform

A React-based application that allows users to create professional portfolio websites through a multi-step form and deploy them to GitHub Pages.

## Features

- **Multi-Step Form**: Easy-to-use wizard-style interface for inputting portfolio details
- **Professional Templates**: Auto-generated responsive portfolio with modern design
- **Sections Included**:
  - Hero/Header with professional introduction
  - Skills & Expertise (categorized)
  - Work Experience timeline
  - Projects Portfolio showcase
  - Contact Information with social links
- **GitHub Pages Deployment**: Generate and download ready-to-deploy HTML
- **Data Export**: Save your portfolio data as JSON for backup

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Custom CSS with modern gradients and animations
- **Icons**: Lucide React
- **Deployment**: GitHub Pages ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/anilram/portfolio-builder.git
cd portfolio-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Usage Guide

### Building Your Portfolio

1. **Hero Section**: Enter your name, title, tagline, and contact info
2. **Skills**: Add your technical skills by category (Backend, Frontend, Cloud, etc.)
3. **Experience**: List your work history with achievements
4. **Projects**: Showcase your best projects with descriptions and links
5. **Contact**: Provide ways for visitors to reach you
6. **Review**: Verify all information
7. **Deploy**: Generate and download your portfolio HTML

### Deploying to GitHub Pages

After generating your portfolio:

1. Create a new repository on GitHub (e.g., `my-portfolio`)
2. Download the generated `index.html` file
3. Push to GitHub:
   ```bash
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   # Copy index.html to this folder
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```
4. Go to repository Settings → Pages
5. Select "main" branch as source and save
6. Your portfolio will be live at: `https://yourusername.github.io/my-portfolio`

## Project Structure

```
portfolio-builder/
├── src/
│   ├── components/
│   │   └── forms/
│   │       ├── HeroForm.jsx
│   │       ├── SkillsForm.jsx
│   │       ├── ExperienceForm.jsx
│   │       ├── ProjectsForm.jsx
│   │       ├── ContactForm.jsx
│   │       ├── ReviewSection.jsx
│   │       ├── DeploySection.jsx
│   │       └── MultiStepProgress.jsx
│   ├── context/
│   │   └── PortfolioContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Hosting the Builder App

To host the builder itself on GitHub Pages:

```bash
# Build the app
npm run build

# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npx gh-pages -d dist
```

This will deploy the builder to: `https://anilram.github.io/portfolio-builder`

## Customization

### Styling
Modify `src/App.css` to customize colors, fonts, and layout.

### Template
Edit the `generatePortfolioHTML` function in `DeploySection.jsx` to modify the generated portfolio template.

## License

MIT License - feel free to use this for personal or commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
