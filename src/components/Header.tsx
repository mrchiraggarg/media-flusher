import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-4 fade-in">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full neu-card mb-4">
        <span className="text-4xl">🎬</span>
      </div>
      
      <h1 className="text-5xl font-bold text-gradient mb-2">
        Media Flusher
      </h1>
      
      <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
        Remove unwanted segments from your videos and audio files with precision. 
        Simply upload your media, specify the time frames to remove, and get a clean, 
        flushed version instantly.
      </p>
      
      <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500 mt-6">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>Video Support</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span>Audio Support</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
          <span>Fast Processing</span>
        </div>
      </div>
    </header>
  );
};

export default Header;