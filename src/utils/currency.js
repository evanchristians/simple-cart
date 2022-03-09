export const fromNum = num =>
  `R ${Number(num).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
