export default function VideoEmbed({
  video,
  isYoutube = false,
}: {
  video?: string;
  isYoutube?: boolean;
}) {
  if (!video) {
    return <></>;
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-black`}
      style={{ paddingTop: "56.25%" }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={
          isYoutube
            ? `https://www.youtube.com/embed/${video}?widget_referrer=https://scripts.jakeandamir.com`
            : video
        }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
