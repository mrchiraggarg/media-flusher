import React from 'react';

type Props = {
  onFileSelect: (file: File) => void;
};

const FileUploader: React.FC<Props> = ({ onFileSelect }) => {
  return (
    <div className="bg-clay p-6 rounded-2xl shadow-clay flex flex-col items-center">
      <input
        type="file"
        accept="video/*,audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
        className="text-center"
      />
    </div>
  );
};

export default FileUploader;
