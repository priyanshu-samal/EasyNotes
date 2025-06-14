
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface SuccessSummaryProps {
  filesCount: number;
  pagesPerSheet: number;
}

const SuccessSummary: React.FC<SuccessSummaryProps> = ({ filesCount, pagesPerSheet }) => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-green-700 mb-2">Conversion Complete! 🎉</h2>
        <p className="text-gray-600 mb-6 text-lg">Your PDF has been successfully processed and is ready for download.</p>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-800">Files Processed</div>
            <div className="text-blue-600 text-lg">{filesCount} PDF{filesCount > 1 ? 's' : ''}</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="font-semibold text-green-800">Pages Layout</div>
            <div className="text-green-600 text-lg">{pagesPerSheet || 1} per sheet</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="font-semibold text-purple-800">Final Format</div>
            <div className="text-purple-600 text-lg">Inverted Colors</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessSummary;
