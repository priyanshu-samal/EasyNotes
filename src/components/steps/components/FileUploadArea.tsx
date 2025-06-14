
import React, { useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploadAreaProps {
  onFileUpload: (files: File[]) => void;
  disabled?: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload, disabled = false }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onFileUpload(files);
    // Clear the input so same file can be selected again if needed
    event.target.value = '';
  }, [onFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    onFileUpload(files);
  }, [onFileUpload]);

  return (
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
          disabled={disabled}
        />
        <label htmlFor="pdf-upload">
          <Button asChild className="cursor-pointer bg-gray-800 hover:bg-gray-900" disabled={disabled}>
            <span>Choose Files</span>
          </Button>
        </label>
      </CardContent>
    </Card>
  );
};

export default FileUploadArea;
