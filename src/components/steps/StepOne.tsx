import React, { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PDFDocument } from 'pdf-lib';

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFileSize = (files: File[]) => {
    // Check individual file sizes
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return `File "${file.name}" is too large (${formatFileSize(file.size)}). Maximum allowed: ${formatFileSize(MAX_FILE_SIZE)}`;
      }
    }

    // Check total size including existing files
    const currentTotalSize = pdfData.files.reduce((sum: number, file: File) => sum + file.size, 0);
    const newFilesSize = files.reduce((sum, file) => sum + file.size, 0);
    const totalSize = currentTotalSize + newFilesSize;

    if (totalSize > MAX_TOTAL_SIZE) {
      return `Total file size would exceed limit (${formatFileSize(totalSize)}). Maximum allowed: ${formatFileSize(MAX_TOTAL_SIZE)}`;
    }

    return '';
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    setSizeError('');
    
    if (pdfFiles.length !== files.length) {
      setSizeError('Please select only PDF files');
      return;
    }

    const sizeValidationError = validateFileSize(pdfFiles);
    if (sizeValidationError) {
      setSizeError(sizeValidationError);
      return;
    }

    console.log('Files uploaded:', pdfFiles.length);
    updatePdfData({ files: [...pdfData.files, ...pdfFiles], mergedPdf: null });
    
    // Clear the input so same file can be selected again if needed
    event.target.value = '';
  }, [pdfData.files, updatePdfData, MAX_FILE_SIZE, MAX_TOTAL_SIZE]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    setSizeError('');
    
    if (pdfFiles.length !== files.length) {
      setSizeError('Please select only PDF files');
      return;
    }

    const sizeValidationError = validateFileSize(pdfFiles);
    if (sizeValidationError) {
      setSizeError(sizeValidationError);
      return;
    }

    console.log('Files dropped:', pdfFiles.length);
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

  // Calculate current total size
  const currentTotalSize = pdfData.files.reduce((sum: number, file: File) => sum + file.size, 0);

  return (
    <div className="space-y-6">
      {/* Size Limits Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">File Size Limits</p>
            <p>• Maximum per file: {formatFileSize(MAX_FILE_SIZE)}</p>
            <p>• Maximum total: {formatFileSize(MAX_TOTAL_SIZE)}</p>
            {isMobile && <p className="text-xs mt-1 text-blue-600">Mobile limits applied for better performance</p>}
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {sizeError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{sizeError}</AlertDescription>
        </Alert>
      )}

      {/* Upload Area */}
      <Card
        className="border-2 border-dashed border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Upload PDF Files</h3>
          <p className="text-gray-600 mb-4">Drag and drop your PDF files here or click to browse</p>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload">
            <Button asChild className="cursor-pointer bg-gray-800 hover:bg-gray-900">
              <span>Choose Files</span>
            </Button>
          </label>
        </CardContent>
      </Card>

      {/* File List */}
      {pdfData.files.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Uploaded Files ({pdfData.files.length})</h3>
              <div className="text-sm text-gray-600">
                Total: {formatFileSize(currentTotalSize)} / {formatFileSize(MAX_TOTAL_SIZE)}
              </div>
            </div>
            <div className="space-y-2">
              {pdfData.files.map((file: File, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isProcessing}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Merge Status */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              {!pdfData.mergedPdf ? (
                <>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Ready to merge:</strong> Your {pdfData.files.length} PDF file{pdfData.files.length > 1 ? 's' : ''} will be combined into a single document.
                  </p>
                  <Button 
                    onClick={mergePDFs} 
                    className="bg-gray-800 hover:bg-gray-900" 
                    size="sm"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Merging...
                      </>
                    ) : (
                      'Merge PDFs'
                    )}
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <p className="text-sm">
                    <strong>Merge completed!</strong> Your files are ready for processing. Click Next to continue.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepOne;
