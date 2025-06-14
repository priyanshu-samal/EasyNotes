
import React, { memo } from 'react';
import { Progress } from '@/components/ui/progress';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProgressSectionProps {
  currentStep: number;
  steps: Step[];
}

const ProgressSection = memo(({ currentStep, steps }: ProgressSectionProps) => (
  <div className="mb-6 sm:mb-8">
    <Progress value={(currentStep / 5) * 100} className="h-2 mb-4" />
    <div className="grid grid-cols-5 gap-2 sm:flex sm:justify-between">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex flex-col items-center text-center ${
            currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
          }`}
        >
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
              currentStep >= step.number
                ? 'bg-gray-800 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {step.number}
          </div>
          <div className="text-center">
            <p className="font-medium text-xs sm:text-sm">{step.title}</p>
            <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
));

ProgressSection.displayName = 'ProgressSection';

export default ProgressSection;
