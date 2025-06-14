
import React, { useCallback, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import SizeLimitsInfo from './components/SizeLimitsInfo';
import FileUploadArea from './components/FileUploadArea';
import FileList from './components/FileList';
import MergeSection from './components/MergeSection';
import { validateFileSize } from './utils/fileValidation';

interface StepOneProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepOne: React.FC<StepOneProps> = ({ pdfData, updatePdfData }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [sizeError, setSizeError] = useState<string>('');

  // Device-aware size limits - increased for better user experience
  const isMobile = window.innerWidth < 768;
  const MAX_FILE_SIZE = isMobile ? 50 * 1024 * 1024 : 100 * 1024 * 1024; // 50MB mobile, 100MB desktop
  const MAX_TOTAL_SIZE = isMobile ? 150 * 1024 * 1024 : 400 * 1024 * 1024; // 150MB mobile, 400MB desktop

  const handleFileUpload = useCallback((files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    setSizeError('');
    
    if (pdfFiles.length !== files.length) {
      setSizeError('Please select only PDF files');
      return;
    }

    const sizeValidationError = validateFileSize(pdfFiles, pdfData.files, MAX_FILE_SIZE, MAX_TOTAL_SIZE);
    if (sizeValidationError) {
      setSizeError(sizeValidationError);
      return;
    }

    console.log('Files uploaded:', pdfFiles.length);
    updatePdfData({ files: [...pdfData.files, ...pdfFiles], mergedPdf: null });
  }, [pdfData.files, updatePdfData, MAX_FILE_SIZE, MAX_TOTAL_SIZE]);

  const removeFile = (index: number) => {
    const newFiles = pdfData.files.filter((_: any, i: number) => i !== index);
    updatePdfData({ files: newFiles, mergedPdf: null });
    setSizeError(''); // Clear any size errors when removing files
    console.log('File removed, remaining files:', newFiles.length);
  };

  const mergePDFs = async () => {
    if (pdfData.files.length === 0) {
      setSizeError('Please upload at least one PDF file');
      return;
    }

    setIsProcessing(true);
    setSizeError('');
    console.log('Starting PDF merge for', pdfData.files.length, 'files');
    
    try {
      if (pdfData.files.length === 1) {
        // If only one file, just use it as is
        const fileBuffer = await pdfData.files[0].arrayBuffer();
        const mergedFile = new File([fileBuffer], 'merged-document.pdf', { type: 'application/pdf' });
        updatePdfData({ mergedPdf: mergedFile });
        console.log('Single file processed successfully');
      } else {
        // Merge multiple PDFs
        const mergedPdf = await PDFDocument.create();
        
        for (const file of pdfData.files) {
          const fileBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(fileBuffer);
          const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          pages.forEach((page) => mergedPdf.addPage(page));
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        const mergedFile = new File([mergedPdfBytes], 'merged-document.pdf', { type: 'application/pdf' });
        
        updatePdfData({ mergedPdf: mergedFile });
        console.log('PDF merge completed successfully');
      }
    } catch (error) {
      console.error('Error merging PDFs:', error);
      setSizeError('Error processing PDFs. Files may be too large or corrupted. Please try smaller files.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <SizeLimitsInfo 
        maxFileSize={MAX_FILE_SIZE}
        maxTotalSize={MAX_TOTAL_SIZE}
        isMobile={isMobile}
      />

      {sizeError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{sizeError}</AlertDescription>
        </Alert>
      )}

      <FileUploadArea 
        onFileUpload={handleFileUpload}
        disabled={isProcessing}
      />

      <FileList 
        files={pdfData.files}
        onRemoveFile={removeFile}
        maxTotalSize={MAX_TOTAL_SIZE}
        disabled={isProcessing}
      />

      {pdfData.files.length > 0 && (
        <MergeSection 
          files={pdfData.files}
          mergedPdf={pdfData.mergedPdf}
          isProcessing={isProcessing}
          onMergePDFs={mergePDFs}
        />
      )}
    </div>
  );
};

export default StepOne;
