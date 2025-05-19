export default function EpisodeDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 lg:p-8">
      <div>{children}</div>
    </div>
  );
}
