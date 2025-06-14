
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, FileText } from 'lucide-react';

interface StepThreeProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepThree: React.FC<StepThreeProps> = ({ pdfData, updatePdfData }) => {
  const [totalPages] = useState(12); // Mock total pages
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const handlePageSelection = (pageNumber: number, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageNumber]);
    } else {
      setSelectedPages(selectedPages.filter(p => p !== pageNumber));
    }
  };

  const handleSelectAll = () => {
    if (selectedPages.length === totalPages) {
      setSelectedPages([]);
    } else {
      setSelectedPages(Array.from({ length: totalPages }, (_, i) => i + 1));
    }
  };

  const handleDeletePages = () => {
    updatePdfData({ 
      selectedPages: selectedPages,
      processedPdf: new File(['processed'], 'processed.pdf', { type: 'application/pdf' })
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Select Pages to Delete</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedPages.length === totalPages ? 'Deselect All' : 'Select All'}
              </Button>
              <span className="text-sm text-gray-500">
                {selectedPages.length} of {totalPages} selected
              </span>
            </div>
          </div>

          {/* Page Grid */}
          <div className="grid grid-cols-6 gap-3 mb-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <div
                key={pageNumber}
                className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  selectedPages.includes(pageNumber)
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePageSelection(pageNumber, !selectedPages.includes(pageNumber))}
              >
                <div className="aspect-[3/4] bg-white rounded shadow-sm flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm font-medium">Page {pageNumber}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={selectedPages.includes(pageNumber)}
                    onCheckedChange={(checked) => handlePageSelection(pageNumber, checked as boolean)}
                  />
                </div>
                {selectedPages.includes(pageNumber) && (
                  <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Document Summary</p>
                <p className="text-sm text-gray-600">
                  Original: {totalPages} pages → Final: {totalPages - selectedPages.length} pages
                </p>
              </div>
              <Button
                onClick={handleDeletePages}
                disabled={selectedPages.length === 0}
                variant={selectedPages.length > 0 ? "destructive" : "outline"}
              >
                Delete Selected Pages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {pdfData.processedPdf && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-green-700">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="font-medium">Pages deleted successfully!</p>
                <p className="text-sm text-green-600">
                  {selectedPages.length} pages removed from your document.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepThree;
