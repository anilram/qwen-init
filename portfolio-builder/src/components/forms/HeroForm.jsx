import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, Mail, Phone, MapPin, Link } from 'lucide-react';

export function HeroForm() {
  const { portfolioData, updateSection } = usePortfolio();
  const { hero } = portfolioData;
  
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('hero', { [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        updateSection('hero', { photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-section">
      <h2>Hero Section</h2>
      <p className="section-description">
        Make a great first impression with your professional introduction
      </p>

      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="fullName">
            <User size={18} />
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={hero.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Professional Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={hero.title}
            onChange={handleChange}
            placeholder="Senior Software Engineer"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tagline">Tagline</label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={hero.tagline}
            onChange={handleChange}
            placeholder="Building scalable solutions for complex problems"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="bio">Brief Introduction</label>
          <textarea
            id="bio"
            name="bio"
            value={hero.bio}
            onChange={handleChange}
            placeholder="A passionate developer with 5+ years of experience..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">
            <MapPin size={18} />
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={hero.location}
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <Mail size={18} />
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={hero.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            <Phone size={18} />
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={hero.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">
            <Link size={18} />
            Profile Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          {photoPreview && (
            <div className="photo-preview">
              <img src={photoPreview} alt="Preview" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
