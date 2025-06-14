
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you use our PDF conversion service.</p>
            
            <h3>File Processing</h3>
            <ul>
              <li>PDF files you upload are processed temporarily and automatically deleted within 1 hour</li>
              <li>We do not store, access, or retain your files after processing</li>
              <li>All file processing happens securely in your browser</li>
            </ul>

            <h3>Analytics and Advertising</h3>
            <ul>
              <li>We use Google Analytics to understand how our service is used</li>
              <li>We display Google AdSense ads to support our free service</li>
              <li>These services may collect anonymous usage data</li>
            </ul>

            <h2>How We Use Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our PDF conversion service</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Display relevant advertisements</li>
            </ul>

            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your information:</p>
            <ul>
              <li>All connections are encrypted with SSL/TLS</li>
              <li>Files are processed locally in your browser when possible</li>
              <li>Temporary files are automatically deleted</li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at:</p>
            <p>Email: samalpriyanshu966@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
