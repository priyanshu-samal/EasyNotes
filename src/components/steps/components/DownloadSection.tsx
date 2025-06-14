
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Share } from 'lucide-react';

interface DownloadSectionProps {
  pdfData: any;
  onDownload: () => void;
  onEmailSend: () => void;
  onShare: () => void;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  pdfData, 
  onDownload, 
  onEmailSend, 
  onShare 
}) => {
  return (
    <Card className="border-4 border-green-300 bg-gradient-to-br from-green-50 to-green-100 shadow-xl">
      <CardContent className="p-10">
        <div className="text-center mb-8">
          <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Download className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-green-800 mb-3">Download Your PDF</h3>
          <p className="text-green-700 text-lg">Your converted PDF is ready with inverted colors for better printing</p>
        </div>
        
        <div className="space-y-6">
          <Button 
            onClick={onDownload}
            className="w-full justify-center gap-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-6 shadow-lg hover:shadow-xl transition-all" 
            size="lg"
          >
            <Download className="w-6 h-6" />
            Download Converted PDF
            <span className="ml-auto px-4 py-2 bg-green-500 rounded-full text-sm animate-pulse">Ready!</span>
          </Button>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={onEmailSend}
              className="justify-center gap-3 border-2 border-green-400 text-green-700 hover:bg-green-50 py-4"
              size="lg"
            >
              <Mail className="w-5 h-5" />
              Email PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={onShare}
              className="justify-center gap-3 border-2 border-green-400 text-green-700 hover:bg-green-50 py-4"
              size="lg"
            >
              <Share className="w-5 h-5" />
              Share PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadSection;
