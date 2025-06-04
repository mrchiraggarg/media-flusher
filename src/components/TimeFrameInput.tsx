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
          className="flex items-center gap-4 bg-[#E8E9ED] p-6 rounded-2xl border-2 border-white shadow-[8px_8px_16px_#D1D9E6,-8px_-8px_16px_#FFFFFF]"
        >
          <input
            type="text"
            placeholder="Start (e.g. 00:00:05)"
            value={frame.start}
            onChange={(e) => updateFrame(i, 'start', e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#E8E9ED] border-2 border-white shadow-[inset_4px_4px_8px_#D1D9E6,inset_-4px_-4px_8px_#FFFFFF]"
          />
          <input
            type="text"
            placeholder="End (e.g. 00:00:10)"
            value={frame.end}
            onChange={(e) => updateFrame(i, 'end', e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#E8E9ED] border-2 border-white shadow-[inset_4px_4px_8px_#D1D9E6,inset_-4px_-4px_8px_#FFFFFF]"
          />
          <button
            onClick={() => removeFrame(i)}
            className="text-red-500 font-bold w-10 h-10 rounded-full bg-[#E8E9ED] border-2 border-white shadow-[4px_4px_8px_#D1D9E6,-4px_-4px_8px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#D1D9E6,inset_-4px_-4px_8px_#FFFFFF] transition-shadow"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addFrame}
        className="mt-4 px-6 py-3 rounded-2xl bg-[#E8E9ED] border-2 border-white shadow-[8px_8px_16px_#D1D9E6,-8px_-8px_16px_#FFFFFF] hover:shadow-[inset_8px_8px_16px_#D1D9E6,inset_-8px_-8px_16px_#FFFFFF] transition-shadow"
      >
        ➕ Add Time Frame
      </button>
    </div>
  );
};

export default TimeFrameInput;