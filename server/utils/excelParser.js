import xlsx from "xlsx";

export const extractEmailsFromExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  return data.flat().filter((email) => typeof email === "string" && email.includes("@"));
};
