
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AdBannerProps {
  type: 'sidebar' | 'footer' | 'small';
}

const AdBanner: React.FC<AdBannerProps> = ({ type }) => {
  const getLayout = () => {
    switch (type) {
      case 'sidebar':
        return 'h-48 flex flex-col justify-center';
      case 'footer':
        return 'h-24 flex items-center justify-center';
      case 'small':
        return 'h-32 flex flex-col justify-center';
      default:
        return 'h-48 flex flex-col justify-center';
    }
  };

  const getSize = () => {
    switch (type) {
      case 'sidebar':
        return '320x240';
      case 'footer':
        return '728x90';
      case 'small':
        return '320x120';
      default:
        return '320x240';
    }
  };

  return (
    <Card className={`bg-gray-100 border-2 border-gray-300 ${getLayout()}`}>
      <CardContent className="p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-sm mb-2">Advertisement</div>
          <div className="text-gray-400 text-xs">Google Ads Space</div>
          <div className="text-gray-400 text-xs">{getSize()}</div>
        </div>
        <div className="absolute top-2 right-2">
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">Ad</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
