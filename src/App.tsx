import { useState } from 'react';
import FileUploader from './components/FileUploader';
import TimeFrameInput from './components/TimeFrameInput';
import FlushButton from './components/FlushButton';

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [timeFrames, setTimeFrames] = useState([{ start: '', end: '' }]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
      <h1 className="text-4xl font-bold">🎬 Media Flusher</h1>
      <FileUploader onFileSelect={setFile} />
      <TimeFrameInput timeFrames={timeFrames} setTimeFrames={setTimeFrames} />
      <FlushButton file={file} timeFrames={timeFrames} />
    </div>
  );
};

export default App;
