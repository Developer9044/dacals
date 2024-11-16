// export function formatNumberWithCommas(number) {
//   if (number === null || number === undefined || isNaN(number)) {
//     return "";
//   }

//   // Convert number to string
//   let numStr = parseFloat(number).toFixed(2).toString();

//   // Split the number into integer and decimal parts
//   let [integerPart, decimalPart] = numStr.split(".");

//   // Add commas for thousands separators in Indian numbering system
//   let lastThree = integerPart.slice(-3);
//   let otherNumbers = integerPart.slice(0, -3);

//   if (otherNumbers !== "") {
//     lastThree = "," + lastThree;
//   }

//   let formattedNumber =
//     otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

//   // Combine integer and decimal parts
//   if (decimalPart && decimalPart !== "00") {
//     formattedNumber += "." + decimalPart;
//   }

//   return formattedNumber;
// }

export function formatNumberWithCommas(number) {
  if (number === null || number === undefined || isNaN(number)) {
    return "";
  }

  // Convert number to string
  let numStr = parseFloat(number).toFixed(0).toString(); // toFixed(0) will remove the decimal part

  // Add commas for thousands separators in Indian numbering system
  let lastThree = numStr.slice(-3);
  let otherNumbers = numStr.slice(0, -3);

  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }

  let formattedNumber =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return formattedNumber;
}
