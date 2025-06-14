
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatusCardProps {
  isSuccess: boolean;
  selectedPagesCount: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ isSuccess, selectedPagesCount }) => {
  if (!isSuccess) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 text-green-700">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            ✓
          </div>
          <div>
            <p className="font-medium">Pages deleted successfully!</p>
            <p className="text-sm text-green-600">
              {selectedPagesCount} pages removed from your document.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
