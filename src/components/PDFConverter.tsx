
import React, { useState, memo, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ErrorBoundary from './optimization/ErrorBoundary';
import GoogleAdsense from './ads/GoogleAdsense';

// Lazy load step components for better performance
const StepOne = lazy(() => import('./steps/StepOne'));
const StepTwo = lazy(() => import('./steps/StepTwo'));
const StepThree = lazy(() => import('./steps/StepThree'));
const StepFour = lazy(() => import('./steps/StepFour'));
const StepFive = lazy(() => import('./steps/StepFive'));

interface PDFData {
  files: File[];
  mergedPdf: File | null;
  invertedPdf: File | null;
  processedPdf: File | null;
  selectedPages: number[];
  pagesPerSheet: number;
  alignment: 'vertical' | 'horizontal';
}

// Memoized progress component
const ProgressSection = memo(({ currentStep, steps }: { currentStep: number; steps: any[] }) => (
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

const PDFConverter = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pdfData, setPdfData] = useState<PDFData>({
    files: [],
    mergedPdf: null,
    invertedPdf: null,
    processedPdf: null,
    selectedPages: [],
    pagesPerSheet: 1,
    alignment: 'vertical'
  });

  const steps = [
    { number: 1, title: 'Upload', description: 'Upload multiple PDFs' },
    { number: 2, title: 'Convert', description: 'Convert to black & white' },
    { number: 3, title: 'Edit', description: 'Remove unwanted pages' },
    { number: 4, title: 'Layout', description: 'Set layout preferences' },
    { number: 5, title: 'Download', description: 'Get your final PDF' }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePdfData = (updates: Partial<PDFData>) => {
    setPdfData(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    const stepProps = { pdfData, updatePdfData };
    
    switch (currentStep) {
      case 1:
        return <StepOne {...stepProps} />;
      case 2:
        return <StepTwo {...stepProps} />;
      case 3:
        return <StepThree {...stepProps} />;
      case 4:
        return <StepFour {...stepProps} />;
      case 5:
        return <StepFive {...stepProps} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return pdfData.files.length > 0;
      case 2:
        return pdfData.mergedPdf !== null;
      case 3:
        return pdfData.invertedPdf !== null;
      case 4:
        return true;
      case 5:
        return pdfData.processedPdf !== null;
      default:
        return false;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-2 sm:p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 px-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">EasyNotes</h1>
            <p className="text-sm sm:text-base text-gray-700">Convert your color PDFs to black and white in 5 simple steps</p>
          </div>

          {/* Progress Bar */}
          <ProgressSection currentStep={currentStep} steps={steps} />

          {/* Mobile Ad - Top */}
          <div className="block lg:hidden mb-4">
            <GoogleAdsense 
              adSlot="1122334455" 
              adFormat="auto"
              className="h-20 sm:h-24"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Card className="shadow-lg border-gray-300">
                <CardHeader className="bg-gray-50 border-b p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900">
                    Step {currentStep}: {steps[currentStep - 1].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white p-4 sm:p-6">
                  <Suspense fallback={
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      <span className="ml-2 text-sm sm:text-base">Loading...</span>
                    </div>
                  }>
                    {renderStep()}
                  </Suspense>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between mt-4 sm:mt-6 gap-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 border-gray-400 text-gray-700 hover:bg-gray-100 px-3 sm:px-4 text-sm sm:text-base"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 5 || !canProceed()}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">{currentStep === 5 ? 'Complete' : 'Next'}</span>
                  <span className="sm:hidden">{currentStep === 5 ? 'Done' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Desktop Ad Sidebar */}
            <div className="hidden lg:block w-80 xl:w-96 space-y-6 flex-shrink-0">
              <GoogleAdsense 
                adSlot="1234567890" 
                adFormat="rectangle"
                className="h-64"
              />
              <GoogleAdsense 
                adSlot="0987654321" 
                adFormat="rectangle"
                className="h-32"
              />
            </div>
          </div>

          {/* Tablet Ad - Between content and footer */}
          <div className="hidden sm:block lg:hidden mt-6">
            <GoogleAdsense 
              adSlot="1122334455" 
              adFormat="horizontal"
              className="h-24"
            />
          </div>

          {/* Footer Ad - Desktop only */}
          <div className="hidden lg:block mt-8">
            <GoogleAdsense 
              adSlot="1122334455" 
              adFormat="horizontal"
              className="h-24"
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(PDFConverter);
