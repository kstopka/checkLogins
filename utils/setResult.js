const XLSX = require("xlsx");

const setResult = (newData) => {
  const workbook = XLSX.readFile("result.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = [];

  const newRow = [newData.lp, newData.email, newData.result ? "true" : "false"];

  data.push(newRow);

  XLSX.utils.sheet_add_aoa(worksheet, data, { origin: -1 });

  XLSX.writeFile(workbook, "result.xlsx");
};

module.exports = { setResult };
