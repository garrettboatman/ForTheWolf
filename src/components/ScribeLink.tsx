export default function ScribeLink({ scribe }: { scribe?: string }) {
  const isGithubScribe = scribe?.includes("github");

if (!scribe) {
    return <></>
}

  return (
    <a
      href={isGithubScribe ? scribe : `https://www.reddit.com/u/${scribe}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-orange-500 hover:underline inline-block"
    >
      {isGithubScribe ? (
        <>@{scribe.replace("https://github.com/", "")}</>
      ) : (
        <>u/{scribe}</>
      )}
    </a>
  );
}
