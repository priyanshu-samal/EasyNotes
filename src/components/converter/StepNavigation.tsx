
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  canProceed,
  onBack,
  onNext
}) => {
  return (
    <div className="flex justify-between mt-4 sm:mt-6 gap-3">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1}
        className="flex items-center gap-2 border-gray-400 text-gray-700 hover:bg-gray-100 px-3 sm:px-4 text-sm sm:text-base"
        title="Go back to previous step"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>
      <Button
        onClick={onNext}
        disabled={currentStep === 5 || !canProceed}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 text-sm sm:text-base"
        title={currentStep === 5 ? 'Complete PDF conversion' : 'Continue to next step'}
      >
        <span className="hidden sm:inline">
          {currentStep === 5 ? 'Complete Conversion' : 'Continue Converting'}
        </span>
        <span className="sm:hidden">{currentStep === 5 ? 'Done' : 'Next'}</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default StepNavigation;
