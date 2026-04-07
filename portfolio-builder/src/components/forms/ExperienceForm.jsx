import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, X, Briefcase, Calendar, MapPin } from 'lucide-react';

export function ExperienceForm() {
  const { portfolioData, addExperience, updateExperience, removeExperience } = usePortfolio();
  const { experience } = portfolioData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [newExp, setNewExp] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    achievements: ['', '', ''],
    technologies: '',
  });

  const handleAddExperience = () => {
    if (newExp.company && newExp.role) {
      addExperience({ ...newExp });
      setNewExp({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        current: false,
        location: '',
        achievements: ['', '', ''],
        technologies: '',
      });
      setIsAdding(false);
    }
  };

  const handleAchievementChange = (index, value) => {
    const updated = [...newExp.achievements];
    updated[index] = value;
    setNewExp(prev => ({ ...prev, achievements: updated }));
  };

  return (
    <div className="form-section">
      <h2>Work Experience</h2>
      <p className="section-description">
        Highlight your professional journey and key accomplishments
      </p>

      <div className="experience-list">
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <h3>{exp.role}</h3>
                <p className="company">{exp.company}</p>
              </div>
              <button
                onClick={() => removeExperience(index)}
                className="btn-remove"
                aria-label="Remove experience"
              >
                <X size={18} />
              </button>
            </div>

            <div className="experience-details">
              <div className="detail">
                <Briefcase size={16} />
                <span>{exp.location}</span>
              </div>
              <div className="detail">
                <Calendar size={16} />
                <span>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
            </div>

            {exp.achievements?.filter(a => a).length > 0 && (
              <ul className="achievements">
                {exp.achievements.filter(a => a).map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            )}

            {exp.technologies && (
              <div className="technologies">
                <strong>Tech Stack:</strong> {exp.technologies}
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="add-experience-form">
          <h3>Add New Position</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="role">Role *</label>
              <input
                type="text"
                id="role"
                value={newExp.role}
                onChange={(e) => setNewExp(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Senior Software Engineer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                value={newExp.company}
                onChange={(e) => setNewExp(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Tech Company Inc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                <MapPin size={16} />
                Location
              </label>
              <input
                type="text"
                id="location"
                value={newExp.location}
                onChange={(e) => setNewExp(prev => ({ ...prev, location: e.target.value }))}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={newExp.current}
                  onChange={(e) => setNewExp(prev => ({ ...prev, current: e.target.checked }))}
                />
                I currently work here
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="month"
                id="startDate"
                value={newExp.startDate}
                onChange={(e) => setNewExp(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>

            {!newExp.current && (
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="month"
                  id="endDate"
                  value={newExp.endDate}
                  onChange={(e) => setNewExp(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            )}

            <div className="form-group full-width">
              <label>Achievements</label>
              <p className="helper-text">Quantify your impact where possible</p>
              {newExp.achievements.map((achievement, index) => (
                <input
                  key={index}
                  type="text"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  placeholder={`Achievement ${index + 1} (e.g., "Improved performance by 40%")`}
                  className="achievement-input"
                />
              ))}
            </div>

            <div className="form-group full-width">
              <label htmlFor="technologies">Technologies Used</label>
              <input
                type="text"
                id="technologies"
                value={newExp.technologies}
                onChange={(e) => setNewExp(prev => ({ ...prev, technologies: e.target.value }))}
                placeholder="React, Node.js, AWS, PostgreSQL"
              />
            </div>
          </div>

          <div className="form-actions">
            <button onClick={handleAddExperience} className="btn-primary">
              <Plus size={18} />
              Add Experience
            </button>
            <button onClick={() => setIsAdding(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="btn-add-experience">
          <Plus size={18} />
          Add Work Experience
        </button>
      )}
    </div>
  );
}
