const XLSX = require("xlsx");

const getData = (pratName) => {
  const workbook = XLSX.readFile(pratName);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 2 });

  return data;
};

module.exports = { getData };
