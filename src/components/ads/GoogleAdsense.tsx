
import React, { useEffect } from 'react';

interface GoogleAdsenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adLayout?: string;
  className?: string;
  style?: React.CSSProperties;
}

const GoogleAdsense: React.FC<GoogleAdsenseProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout,
  className = '',
  style = {}
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ads-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAdsense;
