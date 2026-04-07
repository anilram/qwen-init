import { PortfolioProvider } from './context/PortfolioContext';
import { MultiStepProgress } from './components/forms/MultiStepProgress';
import { HeroForm } from './components/forms/HeroForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { ProjectsForm } from './components/forms/ProjectsForm';
import { ContactForm } from './components/forms/ContactForm';
import { ReviewSection } from './components/forms/ReviewSection';
import { DeploySection } from './components/forms/DeploySection';
import { usePortfolio } from './context/PortfolioContext';
import { ArrowLeft, ArrowRight, Download, RefreshCw } from 'lucide-react';
import './App.css';

function PortfolioBuilder() {
  const { currentStep, nextStep, prevStep, resetForm, portfolioData } = usePortfolio();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <HeroForm />;
      case 1:
        return <SkillsForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <ProjectsForm />;
      case 4:
        return <ContactForm />;
      case 5:
        return <ReviewSection />;
      case 6:
        return <DeploySection />;
      default:
        return <HeroForm />;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return portfolioData.hero.fullName && portfolioData.hero.title && portfolioData.hero.email;
      case 1:
        return Object.values(portfolioData.skills).some(cat => cat.length > 0);
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return portfolioData.contact.email;
      default:
        return true;
    }
  };

  return (
    <div className="builder-container">
      <header className="builder-header">
        <div className="header-content">
          <h1>🚀 Portfolio Builder</h1>
          <p>Create your professional portfolio in minutes</p>
        </div>
        <button onClick={resetForm} className="btn-reset" title="Reset Form">
          <RefreshCw size={18} />
          Reset
        </button>
      </header>

      <MultiStepProgress />

      <main className="builder-main">
        {renderStep()}
      </main>

      <footer className="builder-footer">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="btn-nav"
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        {currentStep < 6 ? (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="btn-nav btn-primary"
          >
            Next
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => {
              const dataStr = JSON.stringify(portfolioData, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'portfolio-data.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="btn-nav btn-secondary"
          >
            <Download size={18} />
            Export Data
          </button>
        )}
      </footer>
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioBuilder />
    </PortfolioProvider>
  );
}

export default App;
