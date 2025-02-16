export const formatDateToPHT = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 8);
  return date.toLocaleString("en-PH", {
    timeZone: "Asia/Manila", // Convert to Philippine Time (PHT)
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};  

export const formatToPeso = (amount) => {
  return "₱ " + parseFloat(amount).toFixed(2);
};