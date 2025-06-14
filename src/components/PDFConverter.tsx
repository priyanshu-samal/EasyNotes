
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import StepFive from './steps/StepFive';
import AdBanner from './AdBanner';

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

  const steps = [
    { number: 1, title: 'Upload & Merge', description: 'Upload multiple PDFs' },
    { number: 2, title: 'Invert Colors', description: 'Convert to black & white' },
    { number: 3, title: 'Split & Delete', description: 'Remove unwanted pages' },
    { number: 4, title: 'Align Pages', description: 'Set layout preferences' },
    { number: 5, title: 'Review & Download', description: 'Get your final PDF' }
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
    switch (currentStep) {
      case 1:
        return <StepOne pdfData={pdfData} updatePdfData={updatePdfData} />;
      case 2:
        return <StepTwo pdfData={pdfData} updatePdfData={updatePdfData} />;
      case 3:
        return <StepThree pdfData={pdfData} updatePdfData={updatePdfData} />;
      case 4:
        return <StepFour pdfData={pdfData} updatePdfData={updatePdfData} />;
      case 5:
        return <StepFive pdfData={pdfData} updatePdfData={updatePdfData} />;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PDF Color Converter</h1>
          <p className="text-gray-700">Convert your color PDFs to black and white in 5 simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={(currentStep / 5) * 100} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                    currentStep >= step.number
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{step.title}</p>
                  <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <Card className="shadow-lg border-gray-300">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-2xl text-gray-900">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                {renderStep()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === 5 || !canProceed()}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white"
              >
                {currentStep === 5 ? 'Complete' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Ad Space Sidebar */}
          <div className="w-80 hidden lg:block">
            <AdBanner type="sidebar" />
            <div className="mt-6">
              <AdBanner type="small" />
            </div>
          </div>
        </div>

        {/* Footer Ad Space */}
        <div className="mt-8">
          <AdBanner type="footer" />
        </div>
      </div>
    </div>
  );
};

export default PDFConverter;
