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
