import React from 'react';

type Props = {
  progress: number;
};

const ProgressIndicator: React.FC<Props> = ({ progress }) => {
  return (
    <div className="neu-card p-6 fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full neu-card">
          <div className="animate-spin w-8 h-8 border-3 border-primary-200 border-t-primary-500 rounded-full"></div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral-700">
            Processing Media...
          </h3>
          <p className="text-sm text-neutral-500">
            Please wait while we flush your media file
          </p>
        </div>
        
        <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        
        <p className="text-sm font-medium text-neutral-600">
          {Math.round(progress)}% Complete
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;