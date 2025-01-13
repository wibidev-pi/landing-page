export const cleanproductNumber = (value) =>
  value ? value.replace(/["'\s\uFEFF]/g, "").toLowerCase() : "";
