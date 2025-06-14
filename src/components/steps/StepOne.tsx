
import React, { useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';

interface StepOneProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepOne: React.FC<StepOneProps> = ({ pdfData, updatePdfData }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== files.length) {
      alert('Please select only PDF files');
      return;
    }

    updatePdfData({ files: [...pdfData.files, ...pdfFiles] });
  }, [pdfData.files, updatePdfData]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== files.length) {
      alert('Please select only PDF files');
      return;
    }

    updatePdfData({ files: [...pdfData.files, ...pdfFiles] });
  }, [pdfData.files, updatePdfData]);

  const removeFile = (index: number) => {
    const newFiles = pdfData.files.filter((_: any, i: number) => i !== index);
    updatePdfData({ files: newFiles });
  };

  const simulateMerge = () => {
    if (pdfData.files.length > 0) {
      // Simulate merging process
      setTimeout(() => {
        updatePdfData({ mergedPdf: new File(['merged'], 'merged.pdf', { type: 'application/pdf' }) });
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card
        className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF Files</h3>
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
            <Button asChild className="cursor-pointer">
              <span>Choose Files</span>
            </Button>
          </label>
        </CardContent>
      </Card>

      {/* File List */}
      {pdfData.files.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Uploaded Files ({pdfData.files.length})</h3>
            <div className="space-y-2">
              {pdfData.files.map((file: File, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Merge Preview:</strong> Your {pdfData.files.length} PDF files will be combined into a single document.
              </p>
              <Button onClick={simulateMerge} className="mt-2" size="sm">
                Prepare Merge
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepOne;
