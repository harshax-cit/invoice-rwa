export const scoreInvoice = (amount, days) => {
  if (days < 30 && amount < 1_000_000) return { risk: "LOW", yield: 5 };
  if (days < 60) return { risk: "MEDIUM", yield: 8 };
  return { risk: "HIGH", yield: 12 };
};
