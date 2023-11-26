const AudioViewer = ({ source }: { source: string }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <audio src={source} controls></audio>
    </div>
  );
};
export default AudioViewer;
