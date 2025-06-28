import { useState } from 'react';
import FileUploader from './components/FileUploader';
import TimeFrameInput from './components/TimeFrameInput';
import FlushButton from './components/FlushButton';
import Header from './components/Header';
import ProgressIndicator from './components/ProgressIndicator';

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [timeFrames, setTimeFrames] = useState([{ start: '', end: '' }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header />
        
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          <div className="space-y-8">
            <FileUploader 
              onFileSelect={setFile} 
              selectedFile={file}
            />
            
            <TimeFrameInput 
              timeFrames={timeFrames} 
              setTimeFrames={setTimeFrames} 
            />
            
            {isProcessing && (
              <ProgressIndicator progress={progress} />
            )}
            
            <FlushButton 
              file={file} 
              timeFrames={timeFrames}
              onProcessingChange={setIsProcessing}
              onProgressChange={setProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;