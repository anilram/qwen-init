import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, X, Code, Cloud, Database, Terminal, Layout } from 'lucide-react';

const categoryIcons = {
  backend: Code,
  frontend: Layout,
  cloudDevops: Cloud,
  databases: Database,
  tools: Terminal,
};

const categoryLabels = {
  backend: 'Backend Development',
  frontend: 'Frontend Development',
  cloudDevops: 'Cloud & DevOps',
  databases: 'Databases',
  tools: 'Tools & Technologies',
};

export function SkillsForm() {
  const { portfolioData, addSkill, removeSkill } = usePortfolio();
  const { skills } = portfolioData;
  const [newSkills, setNewSkills] = useState({
    backend: '',
    frontend: '',
    cloudDevops: '',
    databases: '',
    tools: '',
  });

  const handleAddSkill = (category) => {
    const skill = newSkills[category].trim();
    if (skill) {
      addSkill(category, skill);
      setNewSkills(prev => ({ ...prev, [category]: '' }));
    }
  };

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(category);
    }
  };

  return (
    <div className="form-section">
      <h2>Skills & Expertise</h2>
      <p className="section-description">
        Showcase your technical skills across different categories
      </p>

      {Object.entries(skills).map(([category, skillList]) => {
        const Icon = categoryIcons[category];
        return (
          <div key={category} className="skill-category">
            <div className="category-header">
              <Icon size={20} />
              <h3>{categoryLabels[category]}</h3>
            </div>

            <div className="skill-input-group">
              <input
                type="text"
                value={newSkills[category]}
                onChange={(e) =>
                  setNewSkills(prev => ({ ...prev, [category]: e.target.value }))
                }
                onKeyPress={(e) => handleKeyPress(e, category)}
                placeholder={`Add a ${categoryLabels[category].toLowerCase()} skill`}
                className="skill-input"
              />
              <button
                onClick={() => handleAddSkill(category)}
                className="btn-add"
                disabled={!newSkills[category].trim()}
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="skill-tags">
              {skillList.map((skill, index) => (
                <div key={index} className="skill-tag">
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(category, index)}
                    className="remove-skill"
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
