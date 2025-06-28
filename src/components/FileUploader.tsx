import React, { useState } from 'react';

type Props = {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
};

const FileUploader: React.FC<Props> = ({ onFileSelect, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="slide-up">
      <div className="neu-card p-8">
        <h2 className="text-2xl font-semibold text-neutral-700 mb-6 text-center">
          Upload Media File
        </h2>
        
        <div
          className={`neu-file-input ${isDragOver ? 'border-primary-400 bg-primary-50' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="video/*,audio/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">
              {selectedFile ? '✅' : '📁'}
            </div>
            
            {selectedFile ? (
              <div className="space-y-2">
                <p className="font-semibold text-neutral-700">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-neutral-500">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type}
                </p>
                <p className="text-xs text-primary-600 font-medium">
                  Click to change file
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold text-neutral-700">
                  Drop your media file here
                </p>
                <p className="text-sm text-neutral-500">
                  or click to browse
                </p>
                <p className="text-xs text-neutral-400">
                  Supports video and audio files
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;