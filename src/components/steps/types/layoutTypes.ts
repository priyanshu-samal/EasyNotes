
export interface StepFourProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

export interface LayoutSettings {
  pagesPerSheet: number;
  alignment: 'vertical' | 'horizontal';
  pageOrientation: 'portrait' | 'landscape';
}

export interface LayoutPreviewProps {
  pagesPerSheet: number;
  alignment: 'vertical' | 'horizontal';
  pageOrientation: 'portrait' | 'landscape';
}
