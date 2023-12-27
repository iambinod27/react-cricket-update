export default function convertMillisecondsToDate(milliseconds: number) {
  const date = new Date(milliseconds);
  const options: {} = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
}
