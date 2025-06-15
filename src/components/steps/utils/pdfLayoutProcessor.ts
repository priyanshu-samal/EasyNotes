
import { PDFDocument, PageSizes } from 'pdf-lib';

export const processPdfLayout = async (
  sourcePdf: File,
  pagesPerSheet: number,
  alignment: 'vertical' | 'horizontal',
  pageOrientation: 'portrait' | 'landscape'
): Promise<File> => {
  const fileBuffer = await sourcePdf.arrayBuffer();
  const sourcePdfDoc = await PDFDocument.load(fileBuffer);
  const newPdfDoc = await PDFDocument.create();
  
  const sourcePages = sourcePdfDoc.getPages();
  console.log('Processing', sourcePages.length, 'pages with layout:', pagesPerSheet, 'per sheet in', pageOrientation);

  // Determine target page size based on orientation
  const basePageSize = pageOrientation === 'landscape' ? 
    { width: PageSizes.A4[1], height: PageSizes.A4[0] } : 
    { width: PageSizes.A4[0], height: PageSizes.A4[1] };

  // Process pages in groups based on pagesPerSheet
  for (let i = 0; i < sourcePages.length; i += pagesPerSheet) {
    const newPage = newPdfDoc.addPage([basePageSize.width, basePageSize.height]);
    
    // Calculate layout dimensions
    let rows, cols;
    if (pagesPerSheet === 1) {
      rows = 1; cols = 1;
    } else if (pagesPerSheet === 2) {
      if (alignment === 'vertical') {
        rows = 2; cols = 1;
      } else {
        rows = 1; cols = 2;
      }
    } else if (pagesPerSheet === 3) {
      rows = 3; cols = 1;
    } else if (pagesPerSheet === 4) {
      rows = 2; cols = 2;
    }

    const cellWidth = basePageSize.width / cols;
    const cellHeight = basePageSize.height / rows;

    // Get the pages we need for this sheet and copy them properly
    const pagesToCopy = [];
    for (let j = 0; j < pagesPerSheet && (i + j) < sourcePages.length; j++) {
      pagesToCopy.push(i + j);
    }
    
    // Copy all pages at once to get embedded pages
    const embeddedPages = await newPdfDoc.copyPages(sourcePdfDoc, pagesToCopy);

    // Place embedded pages in the layout
    for (let j = 0; j < embeddedPages.length; j++) {
      const embeddedPage = embeddedPages[j];
      
      // Calculate position in grid
      const row = Math.floor(j / cols);
      const col = j % cols;
      
      // Get original page dimensions from the source page
      const originalPage = sourcePages[i + j];
      const { width: sourceWidth, height: sourceHeight } = originalPage.getSize();
      
      // Calculate scale to fit page in cell while maintaining aspect ratio
      const scaleX = cellWidth / sourceWidth;
      const scaleY = cellHeight / sourceHeight;
      const scale = Math.min(scaleX, scaleY) * 0.95; // 5% margin
      
      // Calculate position to center the page in its cell
      const scaledWidth = sourceWidth * scale;
      const scaledHeight = sourceHeight * scale;
      const x = col * cellWidth + (cellWidth - scaledWidth) / 2;
      const y = basePageSize.height - (row + 1) * cellHeight + (cellHeight - scaledHeight) / 2;
      
      // Draw the embedded page
      newPage.drawPage(embeddedPage, {
        x: x,
        y: y,
        width: scaledWidth,
        height: scaledHeight,
      });
    }
  }

  const processedPdfBytes = await newPdfDoc.save();
  return new File([processedPdfBytes], 'layout-applied.pdf', { type: 'application/pdf' });
};
