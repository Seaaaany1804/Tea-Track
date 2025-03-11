export const formatDateToPHT = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours());
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

export const addNewLog = async (description, action) => {
  try {
    const response = await fetch("https://teatrackbackend.vercel.app/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description, 
        action: action,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error submitting log:", error);
  }
};

