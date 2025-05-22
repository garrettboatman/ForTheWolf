export function formatDate(dateString: string): string {
  // Parse the input date string
  const date = new Date(dateString);

  // Format the date to "Month Day, Year" format
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}


/**
 * replaces all instances of `query` in `content` with `<span class="script-match">${query}</span>`
 * (case-insensitive)
 *
 * @param content
 * @param query
 */
export function generateHighlightWithRegex(content: string, query: string): string {
  const queryAsRegex = new RegExp(query, "gi");
  const highlightedContent = content.replace(queryAsRegex, match => {
    return `<span class="script-match">${match}</span>`;
  });
  return highlightedContent;
}
