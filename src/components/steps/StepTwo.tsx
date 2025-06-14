
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import ColorPreviewDemo from './components/ColorPreviewDemo';
import ProcessingOptions from './components/ProcessingOptions';
import { useColorInversion } from './hooks/useColorInversion';

interface StepTwoProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ pdfData, updatePdfData }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    isProcessing,
    processingProgress,
    processingStatus,
    colorChoice,
    handleKeepOriginal,
    handleInvertColors
  } = useColorInversion(updatePdfData);

  React.useEffect(() => {
    if (pdfData.mergedPdf && !pdfData.invertedPdf) {
      setIsLoading(true);
      // Simulate loading time for UI
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pdfData.mergedPdf, pdfData.invertedPdf]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Loading color inversion options and generating preview...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ColorPreviewDemo />

      <ProcessingOptions
        pdfData={pdfData}
        isProcessing={isProcessing}
        processingProgress={processingProgress}
        processingStatus={processingStatus}
        colorChoice={colorChoice}
        onKeepOriginal={() => handleKeepOriginal(pdfData)}
        onInvertColors={() => handleInvertColors(pdfData)}
      />
    </div>
  );
};

export default StepTwo;
