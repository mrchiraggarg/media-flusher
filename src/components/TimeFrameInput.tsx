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
    setTimeFrames(timeFrames.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {timeFrames.map((frame, i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-clay p-4 rounded-xl shadow-clay"
        >
          <input
            type="text"
            placeholder="Start (e.g. 00:00:05)"
            value={frame.start}
            onChange={(e) => updateFrame(i, 'start', e.target.value)}
            className="px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="End (e.g. 00:00:10)"
            value={frame.end}
            onChange={(e) => updateFrame(i, 'end', e.target.value)}
            className="px-2 py-1 rounded"
          />
          <button
            onClick={() => removeFrame(i)}
            className="text-red-500 font-bold"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addFrame}
        className="mt-2 px-4 py-2 rounded-xl bg-white shadow-clay"
      >
        ➕ Add Time Frame
      </button>
    </div>
  );
};

export default TimeFrameInput;
