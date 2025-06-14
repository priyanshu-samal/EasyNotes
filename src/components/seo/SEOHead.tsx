
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Convert PDF to Black and White Online Free | EasyNotes PDF Color Converter',
  description = 'Free online PDF color converter tool. Convert colored PDFs to black and white (grayscale) instantly. Upload your PDF, convert to black and white, and download instantly. No registration required.',
  keywords = 'convert PDF to black and white, PDF color converter, grayscale PDF converter, color PDF to black white, online PDF converter, PDF black and white tool, change PDF color to grayscale, free PDF converter',
  image = '/preview-image.jpg',
  url = 'https://easynotes.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags - SEO Optimized */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="EasyNotes" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Additional SEO Meta Tags */}
      <meta name="subject" content="PDF Color Converter Tool" />
      <meta name="topic" content="Convert PDF to Black and White Online" />
      <meta name="summary" content="Free online tool to convert colored PDFs to black and white grayscale format" />
      <meta name="classification" content="Education, Tools, PDF Converter" />
      <meta name="designer" content="EasyNotes Team" />
      <meta name="owner" content="EasyNotes" />
      <meta name="url" content={url} />
      <meta name="identifier-URL" content={url} />
      <meta name="coverage" content="Worldwide" />

      {/* Open Graph / Facebook - Enhanced */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="EasyNotes PDF Color to Black and White Converter Tool" />
      <meta property="og:site_name" content="EasyNotes" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card - Enhanced */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content="Convert PDF to Black and White Online - EasyNotes" />
      <meta property="twitter:creator" content="@EasyNotes" />
      <meta property="twitter:site" content="@EasyNotes" />

      {/* Additional SEO and PWA Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="EasyNotes PDF Converter" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="EasyNotes" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-tooltip" content="Convert PDF to Black and White Online" />

      {/* Enhanced Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "EasyNotes - PDF Color to Black and White Converter",
          "alternateName": "EasyNotes PDF Converter",
          "description": "Free online tool to convert colored PDFs to black and white (grayscale). Upload your PDF files, convert them to black and white format, and download instantly.",
          "url": url,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Any",
          "browserRequirements": "Requires HTML5 support",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": [
            "Convert PDF to black and white",
            "Grayscale PDF conversion",
            "Batch PDF processing",
            "Free online tool",
            "No registration required",
            "Instant download"
          ],
          "screenshot": image,
          "creator": {
            "@type": "Organization",
            "name": "EasyNotes",
            "url": url
          },
          "keywords": "PDF converter, black and white PDF, grayscale PDF, color to black white converter, online PDF tools",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        })}
      </script>

      {/* FAQ Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How to convert PDF to black and white online?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply upload your colored PDF file to EasyNotes, click convert to black and white, and download your grayscale PDF instantly. No registration required."
              }
            },
            {
              "@type": "Question", 
              "name": "Is it free to convert PDF to black and white?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, EasyNotes PDF color converter is completely free. Convert unlimited PDFs to black and white without any cost."
              }
            },
            {
              "@type": "Question",
              "name": "Can I convert multiple PDFs to black and white at once?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can upload multiple PDF files and convert them all to black and white in one batch process."
              }
            }
          ]
        })}
      </script>

      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": url
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "PDF Converter",
              "item": url
            },
            {
              "@type": "ListItem",
              "position": 3, 
              "name": "Convert PDF to Black and White",
              "item": url
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
