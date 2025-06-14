
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const SEOHead = ({ 
  title = "EasyNotes - PDF Color Inverter for Students | Convert Dark PDFs to Print-Friendly",
  description = "Convert colorful PDF notes to black and white for affordable printing. EasyNotes inverts colors, making dark backgrounds light while keeping text readable. Perfect for students!",
  keywords = "PDF color inverter, PDF converter, student notes, print friendly PDF, dark to light PDF, PDF tools, study materials, cost effective printing",
  canonicalUrl = "https://easynotes.app",
  ogImage = "https://easynotes.app/og-image.png"
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="EasyNotes Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "EasyNotes",
          "description": description,
          "url": canonicalUrl,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "EasyNotes Team"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
