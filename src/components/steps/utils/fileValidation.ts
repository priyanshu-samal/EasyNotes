
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFileSize = (
  files: File[], 
  existingFiles: File[], 
  maxFileSize: number, 
  maxTotalSize: number
): string => {
  // For single file uploads, allow up to maxTotalSize per file
  const effectiveMaxFileSize = files.length === 1 && existingFiles.length === 0 
    ? maxTotalSize 
    : maxFileSize;

  // Check individual file sizes
  for (const file of files) {
    if (file.size > effectiveMaxFileSize) {
      const maxSizeToShow = files.length === 1 && existingFiles.length === 0 
        ? maxTotalSize 
        : maxFileSize;
      return `File "${file.name}" is too large (${formatFileSize(file.size)}). Maximum allowed: ${formatFileSize(maxSizeToShow)}`;
    }
  }

  // Check total size including existing files
  const currentTotalSize = existingFiles.reduce((sum: number, file: File) => sum + file.size, 0);
  const newFilesSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalSize = currentTotalSize + newFilesSize;

  if (totalSize > maxTotalSize) {
    return `Total file size would exceed limit (${formatFileSize(totalSize)}). Maximum allowed: ${formatFileSize(maxTotalSize)}`;
  }

  return '';
};
