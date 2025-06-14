
import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PDFData {
  files: File[];
  mergedPdf: File | null;
  invertedPdf: File | null;
  processedPdf: File | null;
  selectedPages: number[];
  pagesPerSheet: number;
  alignment: 'vertical' | 'horizontal';
}

interface StepContentProps {
  currentStep: number;
  steps: any[];
  pdfData: PDFData;
  updatePdfData: (updates: Partial<PDFData>) => void;
  renderStep: () => React.ReactNode;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  steps,
  renderStep
}) => {
  return (
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
            <span className="ml-2 text-sm sm:text-base">Converting PDF to black and white...</span>
          </div>
        }>
          {renderStep()}
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default StepContent;
