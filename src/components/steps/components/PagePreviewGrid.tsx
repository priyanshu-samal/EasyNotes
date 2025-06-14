
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
