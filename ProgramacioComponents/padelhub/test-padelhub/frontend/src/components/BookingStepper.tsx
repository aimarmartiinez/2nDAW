import '../styles/components/BookingStepper.css';

interface BookingStepperProps {
  currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  const steps = [
    { number: 1, icon: '📅', title: 'Fecha' },
    { number: 2, icon: '⏰', title: 'Hora' },
    { number: 3, icon: '🎾', title: 'Pista' },
    { number: 4, icon: '✅', title: 'Confirmar' },
  ];

  return (
    <div className="booking-stepper">
      {steps.map((step) => {
        const isActive = step.number === currentStep;
        const isPast = step.number < currentStep;
        
        let className = "step";
        if (isActive) className += " active";
        if (isPast) className += " past";

        return (
          <div 
            key={step.number} 
            className={className}
            title={step.title}
          >
            {isPast ? '✓' : step.icon}
          </div>
        );
      })}
    </div>
  );
}
