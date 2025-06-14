
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>By using our PDF Color Converter service, you agree to these terms.</p>

            <h2>Service Description</h2>
            <p>Our service allows you to:</p>
            <ul>
              <li>Upload and merge PDF files</li>
              <li>Convert color PDFs to black and white</li>
              <li>Split and reorganize PDF pages</li>
              <li>Download processed files</li>
            </ul>

            <h2>User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Only upload files you own or have permission to process</li>
              <li>Not upload files containing illegal, harmful, or copyrighted content</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not attempt to overload or disrupt our service</li>
            </ul>

            <h2>File Processing</h2>
            <ul>
              <li>Files are processed temporarily and deleted within 1 hour</li>
              <li>We are not responsible for lost or corrupted files</li>
              <li>Always keep backups of your original files</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>Our service is provided "as is" without warranties. We are not liable for any damages arising from your use of our service.</p>

            <h2>Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of our service constitutes acceptance of any changes.</p>

            <h2>Contact</h2>
            <p>Questions about these terms? Contact us at: samalpriyanshu966@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
