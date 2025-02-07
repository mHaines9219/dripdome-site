import ReactPlayer from 'react-player';

export default function VideoPlayer() {
  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        url="https://dripdome-site.s3.us-east-2.amazonaws.com/1223.mp4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
