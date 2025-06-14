
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookiePolicy = () => {
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
            <CardTitle className="text-3xl">Cookie Policy</CardTitle>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit our website.</p>

            <h2>How We Use Cookies</h2>
            <p>We use cookies for:</p>
            <ul>
              <li><strong>Analytics:</strong> Google Analytics to understand website usage</li>
              <li><strong>Advertising:</strong> Google AdSense to display relevant ads</li>
              <li><strong>Functionality:</strong> Remember your preferences and settings</li>
            </ul>

            <h2>Types of Cookies</h2>
            <h3>Essential Cookies</h3>
            <p>Required for basic website functionality and cannot be disabled.</p>

            <h3>Analytics Cookies</h3>
            <p>Help us understand how visitors use our website to improve user experience.</p>

            <h3>Advertising Cookies</h3>
            <p>Used to show you relevant advertisements and measure ad effectiveness.</p>

            <h2>Managing Cookies</h2>
            <p>You can control cookies through your browser settings:</p>
            <ul>
              <li>Block all cookies</li>
              <li>Allow only essential cookies</li>
              <li>Delete existing cookies</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>We use services that may set their own cookies:</p>
            <ul>
              <li>Google Analytics</li>
              <li>Google AdSense</li>
            </ul>

            <h2>Contact</h2>
            <p>Questions about our cookie policy? Contact: samalpriyanshu966@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
