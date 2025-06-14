
import React, { useState } from 'react';
import ColorPreviewDemo from './components/ColorPreviewDemo';
import ProcessingOptions from './components/ProcessingOptions';
import { useColorInversion } from './hooks/useColorInversion';

interface StepTwoProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ pdfData, updatePdfData }) => {
  const [previewMode, setPreviewMode] = useState<'original' | 'inverted'>('inverted');
  
  const {
    isProcessing,
    processingProgress,
    processingStatus,
    colorChoice,
    handleKeepOriginal,
    handleInvertColors
  } = useColorInversion(updatePdfData);

  return (
    <div className="space-y-6">
      <ColorPreviewDemo
        previewMode={previewMode}
        onPreviewModeChange={setPreviewMode}
      />

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
