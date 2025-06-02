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
        className="px-6 py-3 rounded-xl bg-white shadow-clay"
      >
        🧹 Flush Media
      </button>
      {url && (
        <div className="mt-4">
          <a href={url} download="flushed.mp4" className="text-blue-600 underline">
            Download Flushed Media
          </a>
        </div>
      )}
    </div>
  );
};

export default FlushButton;
