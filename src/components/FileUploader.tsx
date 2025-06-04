import React from 'react';

type Props = {
  onFileSelect: (file: File) => void;
};

const FileUploader: React.FC<Props> = ({ onFileSelect }) => {
  return (
    <div className="bg-clay p-6 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] flex flex-col items-center border-2 border-[#e0e0e0]">
      <input
        type="file"
        accept="video/*,audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
        className="text-center bg-clay px-4 py-2 rounded-xl shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 cursor-pointer border border-[#e0e0e0]"
      />
    </div>
  );
};

export default FileUploader;