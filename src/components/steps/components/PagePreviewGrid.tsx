
import React from 'react';
import { Button } from '@/components/ui/button';
import PagePreview from './PagePreview';

interface PagePreviewGridProps {
  totalPages: number;
  selectedPages: number[];
  pagePreviewUrls: string[];
  onPageSelection: (pageNumber: number, checked: boolean) => void;
  onSelectAll: () => void;
}

const PagePreviewGrid: React.FC<PagePreviewGridProps> = ({
  totalPages,
  selectedPages,
  pagePreviewUrls,
  onPageSelection,
  onSelectAll
}) => {
  // Get remaining pages (pages that haven't been deleted)
  const remainingPages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(pageNumber => !selectedPages.includes(pageNumber));

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Review and Select Pages to Delete</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
          >
            {selectedPages.length === totalPages ? 'Deselect All' : 'Select All'}
          </Button>
          <span className="text-sm text-gray-500">
            {selectedPages.length} of {totalPages} selected for deletion
          </span>
        </div>
      </div>

      {/* Show remaining pages preview */}
      {remainingPages.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-green-700 mb-2">
            Remaining Pages Preview ({remainingPages.length} pages)
          </h4>
          <div className="grid grid-cols-6 gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            {remainingPages.map((pageNumber, index) => (
              <div key={pageNumber} className="text-center">
                <div className="aspect-[3/4] bg-white rounded shadow-sm overflow-hidden border">
                  {pagePreviewUrls[pageNumber - 1] ? (
                    <img 
                      src={pagePreviewUrls[pageNumber - 1]} 
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">{index + 1}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-green-700 font-medium">Page {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Original grid for page selection */}
      <div className="grid grid-cols-4 gap-4 mb-6 max-h-96 overflow-y-auto">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <PagePreview
            key={pageNumber}
            pageNumber={pageNumber}
            previewUrl={pagePreviewUrls[pageNumber - 1]}
            isSelected={selectedPages.includes(pageNumber)}
            onSelectionChange={onPageSelection}
          />
        ))}
      </div>
    </>
  );
};

export default PagePreviewGrid;
