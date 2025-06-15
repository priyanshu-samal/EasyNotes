
import React, { useState } from 'react';
import { StepFourProps } from './types/layoutTypes';
import { processPdfLayout } from './utils/pdfLayoutProcessor';
import OrientationSelection from './components/OrientationSelection';
import PagesPerSheetSelection from './components/PagesPerSheetSelection';
import AlignmentSelection from './components/AlignmentSelection';
import LayoutPreview from './components/LayoutPreview';
import LayoutSuccessIndicator from './components/LayoutSuccessIndicator';
import LayoutApplyButton from './components/LayoutApplyButton';

const StepFour: React.FC<StepFourProps> = ({ pdfData, updatePdfData }) => {
  const [pagesPerSheet, setPagesPerSheet] = useState(1);
  const [alignment, setAlignment] = useState<'vertical' | 'horizontal'>('vertical');
  const [pageOrientation, setPageOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isApplied, setIsApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyLayout = async () => {
    console.log('Applying layout settings:', { pagesPerSheet, alignment, pageOrientation });
    
    // Use the existing PDF (either processedPdf or invertedPdf)
    const sourcePdf = pdfData.processedPdf || pdfData.invertedPdf;
    
    if (!sourcePdf) {
      alert('No PDF available to apply layout to');
      return;
    }

    if (pagesPerSheet === 1 && pageOrientation === 'portrait') {
      // No transformation needed, just pass through
      updatePdfData({
        pagesPerSheet,
        alignment,
        pageOrientation,
        processedPdf: sourcePdf
      });
      setIsApplied(true);
      return;
    }

    setIsProcessing(true);

    try {
      const processedFile = await processPdfLayout(
        sourcePdf,
        pagesPerSheet,
        alignment,
        pageOrientation
      );
      
      updatePdfData({
        pagesPerSheet,
        alignment,
        pageOrientation,
        processedPdf: processedFile
      });
      
      setIsApplied(true);
      console.log('Layout settings applied successfully');
    } catch (error) {
      console.error('Error applying layout:', error);
      alert('Error applying layout settings. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSettingsChange = () => {
    setIsApplied(false);
  };

  return (
    <div className="space-y-6">
      <LayoutSuccessIndicator
        isApplied={isApplied}
        pagesPerSheet={pagesPerSheet}
        pageOrientation={pageOrientation}
      />

      <OrientationSelection
        pageOrientation={pageOrientation}
        onOrientationChange={(value) => {
          setPageOrientation(value);
          handleSettingsChange();
        }}
      />

      <PagesPerSheetSelection
        pagesPerSheet={pagesPerSheet}
        onPagesPerSheetChange={(value) => {
          setPagesPerSheet(value);
          handleSettingsChange();
        }}
      />

      <AlignmentSelection
        alignment={alignment}
        onAlignmentChange={(value) => {
          setAlignment(value);
          handleSettingsChange();
        }}
        show={pagesPerSheet === 2}
      />

      <LayoutPreview
        pagesPerSheet={pagesPerSheet}
        alignment={alignment}
        pageOrientation={pageOrientation}
      />

      <LayoutApplyButton
        onApply={handleApplyLayout}
        isApplied={isApplied}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default StepFour;
