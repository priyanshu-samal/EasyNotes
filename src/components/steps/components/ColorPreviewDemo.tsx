
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ColorPreviewDemo: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Color Inversion Preview</h3>
        </div>

        {/* Enhanced Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-2 text-center text-sm font-medium">
              Original Document (Dark Background)
            </div>
            <div className="h-80 bg-black p-4 relative">
              <div className="space-y-2">
                <div className="text-base font-bold text-yellow-400">
                  1. Higher Order Components
                </div>
                <div className="text-xs text-cyan-400 font-medium">
                  🔷 Definition
                </div>
                <div className="text-xs text-white leading-relaxed pr-2">
                  A Higher Order Component (HOC) is a function that takes a component and returns a new component.
                </div>
                <div className="space-y-1 pt-2">
                  <div className="text-xs text-cyan-400 font-medium">
                    🔷 Code Example
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-xs font-mono space-y-1">
                    <div className="text-blue-400">function withLoading(Component)</div>
                    <div className="text-green-300 ml-2">return Enhanced;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-2 text-center text-sm font-medium">
              Inverted Colors (Light Background)
            </div>
            <div className="h-80 bg-white p-4 relative border-2">
              <div className="space-y-2">
                <div className="text-base font-bold text-purple-800">
                  1. Higher Order Components
                </div>
                <div className="text-xs text-red-600 font-medium">
                  🔷 Definition
                </div>
                <div className="text-xs text-black leading-relaxed pr-2">
                  A Higher Order Component (HOC) is a function that takes a component and returns a new component.
                </div>
                <div className="space-y-1 pt-2">
                  <div className="text-xs text-red-600 font-medium">
                    🔷 Code Example
                  </div>
                  <div className="bg-gray-200 p-2 rounded text-xs font-mono space-y-1">
                    <div className="text-orange-600">function withLoading(Component)</div>
                    <div className="text-green-700 ml-2">return Enhanced;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPreviewDemo;
