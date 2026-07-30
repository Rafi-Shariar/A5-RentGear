export const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", 
    day: "numeric", 
    year: "numeric",
  });
};
