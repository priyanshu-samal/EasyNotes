
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SizeLimitsInfoProps {
  maxFileSize: number;
  maxTotalSize: number;
  isMobile: boolean;
}

const SizeLimitsInfo: React.FC<SizeLimitsInfoProps> = ({ maxFileSize, maxTotalSize, isMobile }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">File Size Limits</p>
          <p>• Maximum per file: {formatFileSize(maxFileSize)}</p>
          <p>• Maximum total: {formatFileSize(maxTotalSize)}</p>
          {isMobile && <p className="text-xs mt-1 text-blue-600">Mobile limits applied for better performance</p>}
        </div>
      </div>
    </div>
  );
};

export default SizeLimitsInfo;
