import { usePortfolio } from '../../context/PortfolioContext';

export function MultiStepProgress() {
  const { currentStep, goToStep } = usePortfolio();

  const steps = [
    { number: 0, title: 'Hero', icon: '👤' },
    { number: 1, title: 'Skills', icon: '⚡' },
    { number: 2, title: 'Experience', icon: '💼' },
    { number: 3, title: 'Projects', icon: '🚀' },
    { number: 4, title: 'Contact', icon: '📧' },
    { number: 5, title: 'Review', icon: '✅' },
    { number: 6, title: 'Deploy', icon: '☁️' },
  ];

  return (
    <div className="progress-container">
      <nav className="progress-nav">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => goToStep(step.number)}
            className={`progress-step ${currentStep === step.number ? 'active' : ''} ${
              currentStep > step.number ? 'completed' : ''
            }`}
            aria-label={`Go to ${step.title} step`}
          >
            <span className="step-icon">{step.icon}</span>
            <span className="step-title">{step.title}</span>
            {currentStep > step.number && (
              <span className="checkmark">✓</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
