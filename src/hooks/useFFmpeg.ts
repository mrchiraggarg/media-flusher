import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
});

export const useFFmpeg = () => {
    const load = async () => {
        if (!ffmpeg.isLoaded()) await ffmpeg.load();
    };

    const flushMedia = async (
        file: File,
        flushFrames: { start: string; end: string }[]
    ) => {
        await load();

        const name = 'input.mp4';
        ffmpeg.FS('writeFile', name, await fetchFile(file));

        const concatInputs: string[] = [];
        const segments: string[] = [];

        // Get duration
        const durationOutput = await ffmpeg.run(
            '-i',
            name
        ).catch((e) => console.warn(e));

        // This is a simplification. Ideally you should extract actual durations via ffprobe.
        // Assume segments are around flushed parts.

        flushFrames.forEach((frame, index) => {
            const outName = `out${index}.mp4`;
            segments.push(outName);
            ffmpeg.run(
                '-i',
                name,
                '-ss',
                index === 0 ? '00:00:00' : flushFrames[index - 1].end,
                '-to',
                frame.start,
                '-c',
                'copy',
                outName
            );
        });

        const finalName = 'output.mp4';
        const concatList = 'fileList.txt';
        const listContent = segments.map((s) => `file '${s}'`).join('\n');
        ffmpeg.FS('writeFile', concatList, new TextEncoder().encode(listContent));

        await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', concatList, '-c', 'copy', finalName);

        const data = ffmpeg.FS('readFile', finalName);
        return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    };

    return { flushMedia };
};
