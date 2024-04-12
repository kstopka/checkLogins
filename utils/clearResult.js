const XLSX = require("xlsx");

const clearResult = () => {
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["L.P.", "Nazwa konta", "Login result"],
  ]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "data/result.xlsx");
};

module.exports = { clearResult };
