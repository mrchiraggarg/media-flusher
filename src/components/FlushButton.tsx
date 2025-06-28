import React, { useState } from 'react';
import { useFFmpeg } from '../hooks/useFFmpeg';

type Props = {
  file: File | null;
  timeFrames: { start: string; end: string }[];
  onProcessingChange: (processing: boolean) => void;
  onProgressChange: (progress: number) => void;
};

const FlushButton: React.FC<Props> = ({ 
  file, 
  timeFrames, 
  onProcessingChange, 
  onProgressChange 
}) => {
  const { flushMedia } = useFFmpeg();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateTimeFrames = () => {
    for (const frame of timeFrames) {
      if (!frame.start.trim() || !frame.end.trim()) {
        return 'Please fill in all time frame fields';
      }
      
      // Basic time format validation
      const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
      if (!timeRegex.test(frame.start) || !timeRegex.test(frame.end)) {
        return 'Please use HH:MM:SS format (e.g., 00:01:30)';
      }
    }
    return null;
  };

  const handleFlush = async () => {
    if (!file) {
      setError('Please upload a media file first');
      return;
    }

    const validationError = validateTimeFrames();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onProcessingChange(true);
    onProgressChange(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        onProgressChange(prev => Math.min(prev + Math.random() * 15, 90));
      }, 500);

      const result = await flushMedia(file, timeFrames);
      
      clearInterval(progressInterval);
      onProgressChange(100);
      
      setTimeout(() => {
        setUrl(result);
        onProcessingChange(false);
        onProgressChange(0);
      }, 500);
      
    } catch (err) {
      console.error('Processing error:', err);
      setError('Failed to process media file. Please try again.');
      onProcessingChange(false);
      onProgressChange(0);
    }
  };

  const resetState = () => {
    setUrl(null);
    setError(null);
  };

  return (
    <div className="bounce-in">
      <div className="neu-card p-8 text-center">
        <h2 className="text-2xl font-semibold text-neutral-700 mb-6">
          Process Media
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">
              <span className="font-semibold">Error:</span> {error}
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <button
            onClick={handleFlush}
            disabled={!file}
            className={`neu-button-primary text-lg px-8 py-4 ${
              !file ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="mr-3">🧹</span>
            Flush Media
          </button>
          
          {url && (
            <div className="space-y-4 fade-in">
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <p className="text-green-700 font-semibold mb-2">
                  Media processed successfully!
                </p>
                <p className="text-green-600 text-sm">
                  Your flushed media file is ready for download.
                </p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <a 
                  href={url} 
                  download="flushed-media.mp4" 
                  className="neu-button-primary inline-flex items-center px-6 py-3"
                >
                  <span className="mr-2">⬇️</span>
                  Download Flushed Media
                </a>
                
                <button
                  onClick={resetState}
                  className="neu-button px-6 py-3"
                >
                  Process Another File
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-xs text-neutral-500">
          Processing may take a few moments depending on file size and complexity
        </div>
      </div>
    </div>
  );
};

export default FlushButton;