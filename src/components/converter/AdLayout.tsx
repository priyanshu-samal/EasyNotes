
import React from 'react';
import GoogleAdsense from '../ads/GoogleAdsense';

const AdLayout: React.FC = () => {
  return (
    <>
      {/* Mobile Ad - Top */}
      <div className="block lg:hidden mb-4">
        <GoogleAdsense 
          adSlot="1122334455" 
          adFormat="auto"
          className="h-20 sm:h-24"
        />
      </div>

      {/* Desktop Ad Sidebar */}
      <div className="hidden lg:block w-80 xl:w-96 space-y-6 flex-shrink-0">
        <GoogleAdsense 
          adSlot="1234567890" 
          adFormat="rectangle"
          className="h-64"
        />
        <GoogleAdsense 
          adSlot="0987654321" 
          adFormat="rectangle"
          className="h-32"
        />
      </div>

      {/* Tablet Ad - Between content and footer */}
      <div className="hidden sm:block lg:hidden mt-6">
        <GoogleAdsense 
          adSlot="1122334455" 
          adFormat="horizontal"
          className="h-24"
        />
      </div>

      {/* Footer Ad - Desktop only */}
      <div className="hidden lg:block mt-8">
        <GoogleAdsense 
          adSlot="1122334455" 
          adFormat="horizontal"
          className="h-24"
        />
      </div>
    </>
  );
};

export default AdLayout;
