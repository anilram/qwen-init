import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, X, ExternalLink, Image as ImageIcon } from 'lucide-react';

export function ProjectsForm() {
  const { portfolioData, addProject, updateProject, removeProject } = usePortfolio();
  const { projects } = portfolioData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    problem: '',
    solution: '',
    thumbnail: null,
    technologies: [],
    liveDemo: '',
    githubRepo: '',
    caseStudy: '',
    featured: false,
  });
  const [techInput, setTechInput] = useState('');

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      addProject({ ...newProject });
      setNewProject({
        title: '',
        description: '',
        problem: '',
        solution: '',
        thumbnail: null,
        technologies: [],
        liveDemo: '',
        githubRepo: '',
        caseStudy: '',
        featured: false,
      });
      setTechInput('');
      setIsAdding(false);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject(prev => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !newProject.technologies.includes(techInput.trim())) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  return (
    <div className="form-section">
      <h2>Projects Portfolio</h2>
      <p className="section-description">
        Showcase your best work with detailed project descriptions
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
            <div className="project-header">
              <h3>{project.title}</h3>
              <button
                onClick={() => removeProject(index)}
                className="btn-remove"
                aria-label="Remove project"
              >
                <X size={18} />
              </button>
            </div>

            {project.thumbnail && (
              <div className="project-thumbnail">
                <img src={project.thumbnail} alt={project.title} />
              </div>
            )}

            <p className="project-description">{project.description}</p>

            {project.technologies.length > 0 && (
              <div className="project-tech-stack">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}

            <div className="project-links">
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.githubRepo && (
                <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="add-project-form">
          <h3>Add New Project</h3>
          
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">Project Title *</label>
              <input
                type="text"
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                placeholder="E-commerce Platform"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Short Description *</label>
              <textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                placeholder="A full-stack e-commerce solution with payment integration"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="problem">Problem Solved</label>
              <textarea
                id="problem"
                value={newProject.problem}
                onChange={(e) => setNewProject(prev => ({ ...prev, problem: e.target.value }))}
                placeholder="What challenge did this project address?"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="solution">Your Solution</label>
              <textarea
                id="solution"
                value={newProject.solution}
                onChange={(e) => setNewProject(prev => ({ ...prev, solution: e.target.value }))}
                placeholder="How did you solve it?"
                rows="2"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="thumbnail">
                <ImageIcon size={18} />
                Project Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
              {newProject.thumbnail && (
                <div className="photo-preview">
                  <img src={newProject.thumbnail} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-group full-width">
              <label>Technologies Used</label>
              <div className="tech-input-group">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                  placeholder="Add a technology"
                />
                <button onClick={handleAddTechnology} className="btn-add" type="button">
                  <Plus size={18} />
                </button>
              </div>
              {newProject.technologies.length > 0 && (
                <div className="skill-tags">
                  {newProject.technologies.map((tech, index) => (
                    <div key={index} className="skill-tag">
                      <span>{tech}</span>
                      <button
                        onClick={() => handleRemoveTechnology(tech)}
                        className="remove-skill"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="liveDemo">
                <ExternalLink size={16} />
                Live Demo URL
              </label>
              <input
                type="url"
                id="liveDemo"
                value={newProject.liveDemo}
                onChange={(e) => setNewProject(prev => ({ ...prev, liveDemo: e.target.value }))}
                placeholder="https://myproject.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubRepo">
                <ExternalLink size={16} />
                ExternalLink Repository
              </label>
              <input
                type="url"
                id="githubRepo"
                value={newProject.githubRepo}
                onChange={(e) => setNewProject(prev => ({ ...prev, githubRepo: e.target.value }))}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="form-group full-width checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={newProject.featured}
                  onChange={(e) => setNewProject(prev => ({ ...prev, featured: e.target.checked }))}
                />
                Feature this project (highlight on portfolio)
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button onClick={handleAddProject} className="btn-primary">
              <Plus size={18} />
              Add Project
            </button>
            <button onClick={() => setIsAdding(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="btn-add-experience">
          <Plus size={18} />
          Add Project
        </button>
      )}
    </div>
  );
}
