import React from 'react';

type TimeFrame = { start: string; end: string };

type Props = {
  timeFrames: TimeFrame[];
  setTimeFrames: React.Dispatch<React.SetStateAction<TimeFrame[]>>;
};

const TimeFrameInput: React.FC<Props> = ({ timeFrames, setTimeFrames }) => {
  const updateFrame = (index: number, field: 'start' | 'end', value: string) => {
    const updated = [...timeFrames];
    updated[index][field] = value;
    setTimeFrames(updated);
  };

  const addFrame = () => {
    setTimeFrames([...timeFrames, { start: '', end: '' }]);
  };

  const removeFrame = (index: number) => {
    if (timeFrames.length > 1) {
      setTimeFrames(timeFrames.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="slide-up">
      <div className="neu-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-700">
            Time Frames to Remove
          </h2>
          <span className="text-sm text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
            {timeFrames.length} frame{timeFrames.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="space-y-4">
          {timeFrames.map((frame, i) => (
            <div
              key={i}
              className="neu-card p-6 fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-neutral-600">
                    Start Time
                  </label>
                  <input
                    type="text"
                    placeholder="00:00:05"
                    value={frame.start}
                    onChange={(e) => updateFrame(i, 'start', e.target.value)}
                    className="neu-input"
                  />
                </div>
                
                <div className="flex items-center justify-center w-8 h-8 text-neutral-400 mt-6">
                  →
                </div>
                
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-neutral-600">
                    End Time
                  </label>
                  <input
                    type="text"
                    placeholder="00:00:10"
                    value={frame.end}
                    onChange={(e) => updateFrame(i, 'end', e.target.value)}
                    className="neu-input"
                  />
                </div>
                
                <button
                  onClick={() => removeFrame(i)}
                  className="neu-button-danger mt-6"
                  disabled={timeFrames.length === 1}
                  title={timeFrames.length === 1 ? "Cannot remove the last frame" : "Remove frame"}
                >
                  ✕
                </button>
              </div>
              
              <div className="mt-4 text-xs text-neutral-500">
                Frame {i + 1}: Remove content from {frame.start || '00:00:00'} to {frame.end || '00:00:00'}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addFrame}
          className="neu-button w-full mt-6 text-primary-600 font-semibold"
        >
          <span className="mr-2">➕</span>
          Add Another Time Frame
        </button>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>💡 Tip:</strong> Use format HH:MM:SS (e.g., 00:01:30 for 1 minute 30 seconds). 
            Multiple frames will be removed from your media file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeFrameInput;