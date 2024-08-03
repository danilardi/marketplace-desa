export const formatCurrency = (val) => {
  return Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
  }).format(val);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-id", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
