export const fromNum = (num, sym = "R") =>
  `${sym} ${Number(num).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
