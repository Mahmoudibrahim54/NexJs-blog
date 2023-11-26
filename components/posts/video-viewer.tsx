const VideoViewer = ({
  hight,
  width,
  source,
}: {
  hight: number;
  width: number;
  source: string;
}) => {
  return <video height={hight} width={width} src={source} controls></video>;
};

export default VideoViewer;
