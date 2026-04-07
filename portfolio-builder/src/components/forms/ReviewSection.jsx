import { usePortfolio } from '../../context/PortfolioContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

export function ReviewSection() {
  const { portfolioData } = usePortfolio();
  const { hero, skills, experience, projects, contact } = portfolioData;

  const getCompletionStatus = () => {
    const checks = [
      { name: 'Hero Section', complete: hero.fullName && hero.title && hero.email },
      { name: 'Skills', complete: Object.values(skills).some(cat => cat.length > 0) },
      { name: 'Experience', complete: experience.length > 0 },
      { name: 'Projects', complete: projects.length > 0 },
      { name: 'Contact Info', complete: contact.email },
    ];
    return checks;
  };

  const status = getCompletionStatus();
  const allComplete = status.every(s => s.complete);

  return (
    <div className="form-section review-section">
      <h2>Review Your Portfolio</h2>
      <p className="section-description">
        Verify all information before generating your portfolio
      </p>

      <div className="completion-status">
        <h3>Completion Status</h3>
        {status.map((item, index) => (
          <div key={index} className={`status-item ${item.complete ? 'complete' : 'incomplete'}`}>
            {item.complete ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{item.name}</span>
          </div>
        ))}
        {allComplete && (
          <div className="all-complete">
            <CheckCircle size={24} />
            <span>All required sections complete!</span>
          </div>
        )}
      </div>

      <div className="review-content">
        <div className="review-card">
          <h3>Hero Information</h3>
          <p><strong>Name:</strong> {hero.fullName || 'Not provided'}</p>
          <p><strong>Title:</strong> {hero.title || 'Not provided'}</p>
          <p><strong>Tagline:</strong> {hero.tagline || 'Not provided'}</p>
          <p><strong>Email:</strong> {hero.email || 'Not provided'}</p>
        </div>

        <div className="review-card">
          <h3>Skills Summary</h3>
          {Object.entries(skills).map(([category, skillList]) => (
            skillList.length > 0 && (
              <div key={category} className="skill-summary">
                <strong>{category}:</strong> {skillList.join(', ')}
              </div>
            )
          ))}
        </div>

        <div className="review-card">
          <h3>Experience ({experience.length} positions)</h3>
          {experience.map((exp, index) => (
            <div key={index} className="exp-summary">
              <strong>{exp.role}</strong> at {exp.company}
            </div>
          ))}
        </div>

        <div className="review-card">
          <h3>Projects ({projects.length} projects)</h3>
          {projects.map((proj, index) => (
            <div key={index} className="project-summary">
              <strong>{proj.title}</strong>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>

        <div className="review-card">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {contact.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> {contact.phone || 'Not provided'}</p>
          <p><strong>Location:</strong> {contact.location || 'Not provided'}</p>
          {(contact.github || contact.linkedin || contact.twitter) && (
            <div className="social-summary">
              <strong>Social:</strong>
              {contact.github && <span> GitHub: {contact.github}</span>}
              {contact.linkedin && <span> LinkedIn</span>}
              {contact.twitter && <span> Twitter: {contact.twitter}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
