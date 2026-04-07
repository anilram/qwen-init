import { createContext, useContext, useState, useCallback } from 'react';

const PortfolioContext = createContext();

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

const initialData = {
  // Hero Section
  hero: {
    fullName: '',
    title: '',
    tagline: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
    photo: null,
  },
  // About Section
  about: {
    detailedBio: '',
    yearsExperience: '',
    projectsDelivered: '',
    workingStyle: '',
    photo: null,
  },
  // Skills Section
  skills: {
    backend: [],
    frontend: [],
    cloudDevops: [],
    databases: [],
    tools: [],
  },
  // Experience Section
  experience: [],
  // Projects Section
  projects: [],
  // Contact Section
  contact: {
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    calendlyLink: '',
  },
  // Optional Sections
  testimonials: [],
  certifications: [],
  openSource: {
    enabled: false,
    githubUsername: '',
  },
};

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedPortfolio, setGeneratedPortfolio] = useState(null);

  const updateSection = useCallback((section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data,
    }));
  }, []);

  const addExperience = useCallback((exp) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: [...prev.experience, exp],
    }));
  }, []);

  const updateExperience = useCallback((index, data) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, ...data } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((index) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }, []);

  const addProject = useCallback((project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  }, []);

  const updateProject = useCallback((index, data) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, ...data } : proj
      ),
    }));
  }, []);

  const removeProject = useCallback((index) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }, []);

  const addTestimonial = useCallback((testimonial) => {
    setPortfolioData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, testimonial],
    }));
  }, []);

  const addCertification = useCallback((cert) => {
    setPortfolioData(prev => ({
      ...prev,
      certifications: [...prev.certifications, cert],
    }));
  }, []);

  const addSkill = useCallback((category, skill) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], skill],
      },
    }));
  }, []);

  const removeSkill = useCallback((category, index) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  const resetForm = useCallback(() => {
    setPortfolioData(initialData);
    setCurrentStep(0);
    setGeneratedPortfolio(null);
  }, []);

  const value = {
    portfolioData,
    currentStep,
    generatedPortfolio,
    setGeneratedPortfolio,
    updateSection,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addTestimonial,
    addCertification,
    addSkill,
    removeSkill,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
