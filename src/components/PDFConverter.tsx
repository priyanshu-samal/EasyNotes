
import React, { useState, memo, lazy, useEffect } from 'react';
import ErrorBoundary from './optimization/ErrorBoundary';
import ProgressSection from './converter/ProgressSection';
import SEOHeader from './converter/SEOHeader';
import StepContent from './converter/StepContent';
import StepNavigation from './converter/StepNavigation';
import SEOFooter from './converter/SEOFooter';
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

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const steps = [
    { number: 1, title: 'Upload PDFs', description: 'Upload your colored PDF files' },
    { number: 2, title: 'Convert to Grayscale', description: 'Convert PDF to black & white' },
    { number: 3, title: 'Edit Pages', description: 'Remove unwanted pages' },
    { number: 4, title: 'Layout Settings', description: 'Set pages per sheet layout' },
    { number: 5, title: 'Download PDF', description: 'Download your black & white PDF' }
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
          <SEOHeader />
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
              <StepContent
                currentStep={currentStep}
                steps={steps}
                pdfData={pdfData}
                updatePdfData={updatePdfData}
                renderStep={renderStep}
              />

              <StepNavigation
                currentStep={currentStep}
                canProceed={canProceed()}
                onBack={handleBack}
                onNext={handleNext}
              />
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

          <SEOFooter />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(PDFConverter);
