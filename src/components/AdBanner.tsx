
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Cloud, Shield, Star } from 'lucide-react';

interface AdBannerProps {
  type: 'sidebar' | 'footer' | 'small';
  title: string;
  description: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ type, title, description }) => {
  const getIcon = () => {
    switch (title) {
      case 'Premium PDF Tools':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'Cloud Storage':
        return <Cloud className="w-5 h-5 text-blue-500" />;
      case 'Sponsored Content':
        return <Star className="w-5 h-5 text-purple-500" />;
      default:
        return <Shield className="w-5 h-5 text-green-500" />;
    }
  };

  const getLayout = () => {
    switch (type) {
      case 'sidebar':
        return 'h-48 flex flex-col justify-center';
      case 'footer':
        return 'h-24 flex items-center justify-between';
      case 'small':
        return 'h-32 flex flex-col justify-center';
      default:
        return 'h-48 flex flex-col justify-center';
    }
  };

  return (
    <Card className={`bg-gradient-to-r from-gray-50 to-gray-100 border-dashed border-2 border-gray-300 ${getLayout()}`}>
      <CardContent className="p-4">
        <div className={`${type === 'footer' ? 'flex items-center gap-4' : 'text-center'}`}>
          <div className={`${type === 'footer' ? 'flex items-center gap-2' : 'flex justify-center mb-2'}`}>
            {getIcon()}
            <h3 className="font-semibold text-gray-700">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          {type !== 'footer' && (
            <Button size="sm" variant="outline" className="bg-white">
              Learn More
            </Button>
          )}
          {type === 'footer' && (
            <Button size="sm" variant="outline" className="bg-white ml-auto">
              Learn More
            </Button>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded">Ad</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
