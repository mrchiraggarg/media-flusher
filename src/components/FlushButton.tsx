import React, { useState } from 'react';
import { useFFmpeg } from '../hooks/useFFmpeg';

type Props = {
  file: File | null;
  timeFrames: { start: string; end: string }[];
};

const FlushButton: React.FC<Props> = ({ file, timeFrames }) => {
  const { flushMedia } = useFFmpeg();
  const [url, setUrl] = useState<string | null>(null);

  const handleFlush = async () => {
    if (!file) return alert('Please upload a file!');
    const result = await flushMedia(file, timeFrames);
    setUrl(result);
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleFlush}
        className="px-6 py-3 rounded-xl bg-gradient-to-br from-white to-gray-100 shadow-[4px_4px_10px_0px_rgba(0,0,0,0.15),-4px_-4px_10px_0px_rgba(255,255,255,0.9),inset_2px_2px_5px_0px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_0px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.15),-2px_-2px_5px_0px_rgba(255,255,255,0.9),inset_4px_4px_10px_0px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_0px_rgba(255,255,255,0.9)] active:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_0px_rgba(255,255,255,0.9)] transition-all"
      >
        🧹 Flush Media
      </button>
      {url && (
        <div className="mt-4">
          <a 
            href={url} 
            download="flushed.mp4" 
            className="px-4 py-2 rounded-xl bg-gradient-to-br from-white to-gray-100 shadow-[4px_4px_10px_0px_rgba(0,0,0,0.15),-4px_-4px_10px_0px_rgba(255,255,255,0.9),inset_2px_2px_5px_0px_rgba(255,255,255,0.9),inset_-2px_-2px_5px_0px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.15),-2px_-2px_5px_0px_rgba(255,255,255,0.9),inset_4px_4px_10px_0px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_0px_rgba(255,255,255,0.9)] active:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_0px_rgba(255,255,255,0.9)] transition-all inline-block"
          >
            Download Flushed Media
          </a>
        </div>
      )}
    </div>
  );
};

export default FlushButton;