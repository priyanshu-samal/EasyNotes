
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';

interface MergeSectionProps {
  files: File[];
  mergedPdf: File | null;
  isProcessing: boolean;
  onMergePDFs: () => void;
}

const MergeSection: React.FC<MergeSectionProps> = ({ 
  files, 
  mergedPdf, 
  isProcessing, 
  onMergePDFs 
}) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      {!mergedPdf ? (
        <>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Ready to merge:</strong> Your {files.length} PDF file{files.length > 1 ? 's' : ''} will be combined into a single document.
          </p>
          <Button 
            onClick={onMergePDFs} 
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
  );
};

export default MergeSection;
