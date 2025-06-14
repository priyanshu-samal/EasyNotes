
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

interface PagePreviewProps {
  pageNumber: number;
  previewUrl?: string;
  isSelected: boolean;
  onSelectionChange: (pageNumber: number, checked: boolean) => void;
}

const PagePreview: React.FC<PagePreviewProps> = ({
  pageNumber,
  previewUrl,
  isSelected,
  onSelectionChange
}) => {
  return (
    <div
      className={`relative border-2 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelectionChange(pageNumber, !isSelected)}
    >
      <div className="aspect-[3/4] bg-white rounded shadow-sm overflow-hidden">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt={`Page ${pageNumber}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Page {pageNumber}</span>
          </div>
        )}
      </div>
      <div className="text-center mt-2 p-2">
        <span className="text-sm font-medium">Page {pageNumber}</span>
      </div>
      <div className="absolute top-2 right-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectionChange(pageNumber, checked as boolean)}
        />
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
          <Trash2 className="w-8 h-8 text-red-600" />
        </div>
      )}
    </div>
  );
};

export default PagePreview;
