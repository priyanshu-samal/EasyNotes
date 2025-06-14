
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Palette, Loader2, CheckCircle } from 'lucide-react';

interface ProcessingOptionsProps {
  pdfData: any;
  isProcessing: boolean;
  processingProgress: number;
  processingStatus: string;
  colorChoice: 'original' | 'inverted';
  onKeepOriginal: () => void;
  onInvertColors: () => void;
}

const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  pdfData,
  isProcessing,
  processingProgress,
  processingStatus,
  colorChoice,
  onKeepOriginal,
  onInvertColors
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Choose Your Processing Option</h3>
        </div>
        
        <div className="space-y-4">
          {/* Quick Options */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-2 hover:border-green-300 transition-colors">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-700 mb-2">Keep Original Colors</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Skip processing and keep your PDF as-is. Perfect if your PDF already has good contrast.
                </p>
                <Button
                  onClick={onKeepOriginal}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Keep Original (No Processing)
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-700 mb-2">Invert Colors</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Process your PDF to invert colors - dark becomes light, perfect for printing.
                </p>
                <Button
                  onClick={onInvertColors}
                  disabled={!pdfData.mergedPdf || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Invert Colors'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Processing Progress */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{processingStatus}</span>
                <span className="text-sm text-gray-500">{Math.round(processingProgress)}%</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
          )}

          {/* Success Message */}
          {pdfData.invertedPdf && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700 font-medium">
                  ✓ {colorChoice === 'original' ? 'Original PDF ready!' : 'Color inversion completed!'}
                </p>
              </div>
              <p className="text-sm text-green-600 mt-1">
                {colorChoice === 'original' 
                  ? 'Your PDF is ready for the next step - no processing was needed!'
                  : 'Your PDF has been properly inverted with real content processing!'}
              </p>
            </div>
          )}

          {/* Info for True Processing */}
          {colorChoice === 'inverted' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2 text-blue-800">✨ Real PDF Processing Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Processes actual PDF content (not fake shapes)</li>
                <li>• Inverts every pixel: dark becomes light, light becomes dark</li>
                <li>• Preserves all text, images, and graphics</li>
                <li>• Maintains readability and layout</li>
                <li>• Perfect pixel-level color inversion</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingOptions;
