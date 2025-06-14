
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface DocumentSummaryProps {
  totalPages: number;
  selectedPages: number[];
  isProcessing: boolean;
  onDeletePages: () => void;
}

const DocumentSummary: React.FC<DocumentSummaryProps> = ({
  totalPages,
  selectedPages,
  isProcessing,
  onDeletePages
}) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Document Summary</p>
          <p className="text-sm text-gray-600">
            Original: {totalPages} pages → Final: {totalPages - selectedPages.length} pages
          </p>
        </div>
        <Button
          onClick={onDeletePages}
          disabled={selectedPages.length === 0 || isProcessing}
          variant={selectedPages.length > 0 ? "destructive" : "outline"}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Delete Selected Pages'
          )}
        </Button>
      </div>
    </div>
  );
};

export default DocumentSummary;
