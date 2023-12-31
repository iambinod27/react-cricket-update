export default function unixTimeConvert(unixTime) {
  if (!isNaN(unixTime)) {
    const date = new Date(unixTime * 1000);

    // Extracting date and time components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    const actualDate = year * 24 * 60 * 60 * 1000;
    const newActualDate = new Date(actualDate);

    const actualYear = newActualDate.getFullYear();
    // Creating a formatted string
    const formattedDateTime = `${actualYear}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")} `;

    console.log(formattedDateTime);
  } else {
    console.log("Invalid timestamp");
  }
}
