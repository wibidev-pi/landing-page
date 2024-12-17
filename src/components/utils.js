// utils.js
export const cleanPartNumber = (value) =>
  value ? value.replace(/["'\s\uFEFF]/g, "").toLowerCase() : "";
