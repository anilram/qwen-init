import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExternalLink, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export function DeploySection() {
  const { portfolioData, setGeneratedPortfolio } = usePortfolio();
  const [githubUsername, setExternalLinkUsername] = useState('');
  const [repoName, setRepoName] = useState('portfolio');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState(null);
  const [deployError, setDeployError] = useState(null);

  const handleGenerateAndDeploy = async () => {
    if (!githubUsername.trim()) {
      setDeployError('ExternalLink username is required');
      return;
    }

    setIsDeploying(true);
    setDeployStatus('generating');
    setDeployError(null);

    try {
      // Step 1: Generate portfolio HTML
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeployStatus('preparing');

      // Generate the portfolio HTML content
      const portfolioHTML = generatePortfolioHTML(portfolioData);
      
      // Store generated portfolio
      setGeneratedPortfolio({
        html: portfolioHTML,
        username: githubUsername,
        repoName,
        deployUrl: `https://${githubUsername}.github.io/${repoName}`,
      });

      setDeployStatus('instructions');
    } catch (error) {
      setDeployError('Failed to generate portfolio. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  const generatePortfolioHTML = (data) => {
    const { hero, skills, experience, projects, contact } = data;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${hero.fullName} - ${hero.title}</title>
  <style>
    :root {
      --primary: #6366f1;
      --secondary: #8b5cf6;
      --dark: #1e293b;
      --light: #f8fafc;
      --gray: #64748b;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: var(--dark); }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    
    /* Hero Section */
    .hero { 
      min-height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      text-align: center;
    }
    .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.5rem; opacity: 0.9; margin-bottom: 2rem; }
    .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn { 
      padding: 12px 32px; 
      border-radius: 8px; 
      text-decoration: none; 
      font-weight: 600;
      transition: transform 0.2s;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary { background: white; color: var(--primary); }
    .btn-outline { border: 2px solid white; color: white; }
    
    /* Sections */
    section { padding: 80px 0; }
    section:nth-child(even) { background: var(--light); }
    h2 { font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: var(--dark); }
    
    /* Skills */
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .skill-category { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .skill-category h3 { color: var(--primary); margin-bottom: 1rem; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .skill-tag { background: var(--light); padding: 6px 12px; border-radius: 20px; font-size: 0.9rem; }
    
    /* Experience */
    .timeline { position: relative; max-width: 800px; margin: 0 auto; }
    .timeline-item { padding: 2rem; background: white; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .timeline-item h3 { color: var(--primary); }
    .timeline-item .company { color: var(--gray); margin-bottom: 1rem; }
    .timeline-item ul { margin-left: 1.5rem; }
    .timeline-item li { margin-bottom: 0.5rem; }
    
    /* Projects */
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .project-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; }
    .project-card:hover { transform: translateY(-4px); }
    .project-card img { width: 100%; height: 200px; object-fit: cover; }
    .project-card-content { padding: 1.5rem; }
    .project-card h3 { margin-bottom: 0.5rem; }
    .project-tech { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
    .project-links { display: flex; gap: 1rem; margin-top: 1rem; }
    .project-links a { color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
    
    /* Contact */
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center; }
    .contact-item { padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .contact-item a { color: var(--primary); text-decoration: none; }
    .social-links { display: flex; justify-content: center; gap: 2rem; margin-top: 3rem; }
    .social-links a { color: var(--dark); font-size: 1.5rem; text-decoration: none; }
    
    /* Footer */
    footer { background: var(--dark); color: white; text-align: center; padding: 2rem 0; }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .hero p { font-size: 1.2rem; }
      h2 { font-size: 2rem; }
    }
  </style>
</head>
<body>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1>${hero.fullName}</h1>
      <p>${hero.title}${hero.tagline ? ' | ' + hero.tagline : ''}</p>
      ${hero.bio ? `<p style="max-width: 600px; margin: 0 auto 2rem;">${hero.bio}</p>` : ''}
      <div class="hero-buttons">
        <a href="#projects" class="btn btn-primary">View Work</a>
        <a href="#contact" class="btn btn-outline">Contact Me</a>
        ${contact.github ? `<a href="https://github.com/${contact.github}" target="_blank" class="btn btn-outline">ExternalLink</a>` : ''}
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills">
    <div class="container">
      <h2>Skills & Expertise</h2>
      <div class="skills-grid">
        ${Object.entries(skills).map(([category, skillList]) => 
          skillList.length > 0 ? `
          <div class="skill-category">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="skill-tags">
              ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>` : ''
        ).join('')}
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section id="experience">
    <div class="container">
      <h2>Work Experience</h2>
      <div class="timeline">
        ${experience.map(exp => `
        <div class="timeline-item">
          <h3>${exp.role}</h3>
          <p class="company">${exp.company} ${exp.location ? '| ' + exp.location : ''}</p>
          <p style="color: var(--gray); margin-bottom: 1rem;">
            ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
          </p>
          ${exp.achievements ? `<ul>${exp.achievements.filter(a => a).map(a => `<li>${a}</li>`).join('')}</ul>` : ''}
          ${exp.technologies ? `<p><strong>Tech:</strong> ${exp.technologies}</p>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects">
    <div class="container">
      <h2>Featured Projects</h2>
      <div class="projects-grid">
        ${projects.map(proj => `
        <div class="project-card">
          ${proj.thumbnail ? `<img src="${proj.thumbnail}" alt="${proj.title}">` : ''}
          <div class="project-card-content">
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            ${proj.technologies.length > 0 ? `
            <div class="project-tech">
              ${proj.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
            </div>` : ''}
            <div class="project-links">
              ${proj.liveDemo ? `<a href="${proj.liveDemo}" target="_blank">Live Demo →</a>` : ''}
              ${proj.githubRepo ? `<a href="${proj.githubRepo}" target="_blank">ExternalLink ↗</a>` : ''}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact">
    <div class="container">
      <h2>Get In Touch</h2>
      <div class="contact-grid">
        ${contact.email ? `
        <div class="contact-item">
          <h3>Email</h3>
          <a href="mailto:${contact.email}">${contact.email}</a>
        </div>` : ''}
        ${contact.phone ? `
        <div class="contact-item">
          <h3>Phone</h3>
          <a href="tel:${contact.phone}">${contact.phone}</a>
        </div>` : ''}
        ${contact.location ? `
        <div class="contact-item">
          <h3>Location</h3>
          <p>${contact.location}</p>
        </div>` : ''}
      </div>
      ${(contact.github || contact.linkedin || contact.twitter) && `
      <div class="social-links">
        ${contact.github ? `<a href="https://github.com/${contact.github}" target="_blank">ExternalLink</a>` : ''}
        ${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank">LinkedIn</a>` : ''}
        ${contact.twitter ? `<a href="https://twitter.com/${contact.twitter.replace('@', '')}" target="_blank">X</a>` : ''}
      </div>`}
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${hero.fullName}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
  };

  return (
    <div className="form-section deploy-section">
      <h2>Deploy to ExternalLink Pages</h2>
      <p className="section-description">
        Generate your portfolio and deploy it to ExternalLink Pages
      </p>

      <div className="deploy-form">
        <div className="form-group">
          <label htmlFor="githubUsername">
            <ExternalLink size={18} />
            ExternalLink Username *
          </label>
          <input
            type="text"
            id="githubUsername"
            value={githubUsername}
            onChange={(e) => setExternalLinkUsername(e.target.value)}
            placeholder="yourusername"
          />
        </div>

        <div className="form-group">
          <label htmlFor="repoName">Repository Name</label>
          <input
            type="text"
            id="repoName"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="portfolio"
          />
        </div>

        <button
          onClick={handleGenerateAndDeploy}
          disabled={isDeploying || !githubUsername.trim()}
          className="btn-primary btn-generate"
        >
          {isDeploying ? (
            <>
              <Loader2 className="spin" size={18} />
              Generating...
            </>
          ) : (
            <>
              <ExternalLink size={18} />
              Generate & Deploy
            </>
          )}
        </button>
      </div>

      {deployError && (
        <div className="deploy-error">
          <AlertCircle size={20} />
          <span>{deployError}</span>
        </div>
      )}

      {deployStatus === 'instructions' && (
        <div className="deploy-instructions">
          <CheckCircle size={24} className="success-icon" />
          <h3>Portfolio Generated Successfully!</h3>
          
          <div className="instructions-steps">
            <h4>Next Steps to Deploy:</h4>
            <ol>
              <li>
                Create a new repository on ExternalLink named <code>{repoName}</code>
              </li>
              <li>
                Download the generated HTML file below
              </li>
              <li>
                Push the file to your repository:
                <pre>{`git clone https://github.com/${githubUsername}/${repoName}.git
cd ${repoName}
# Copy index.html to the folder
git add .
git commit -m "Initial portfolio commit"
git push origin main`}</pre>
              </li>
              <li>
                Go to repository Settings → Pages
              </li>
              <li>
                Select source as "main" branch and save
              </li>
              <li>
                Your portfolio will be live at:{' '}
                <a href={`https://${githubUsername}.github.io/${repoName}`} target="_blank" rel="noopener noreferrer">
                  https://{githubUsername}.github.io/{repoName}
                </a>
              </li>
            </ol>
          </div>

          <div className="generated-preview">
            <h4>Preview:</h4>
            <iframe
              srcDoc={portfolioData.generatedPortfolio?.html}
              title="Portfolio Preview"
              style={{ width: '100%', height: '600px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          <button
            onClick={() => {
              const blob = new Blob([generatePortfolioHTML(portfolioData)], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'index.html';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="btn-primary"
          >
            Download index.html
          </button>
        </div>
      )}
    </div>
  );
}
