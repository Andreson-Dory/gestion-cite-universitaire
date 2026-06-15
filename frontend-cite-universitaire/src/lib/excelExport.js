// src/lib/exportExcel.ts
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportToExcel = async (data, fileName, title) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(title);

  if (data.length === 0) return;

  const columns = Object.keys(data[0]);

  //
  // TITLE
  //
  worksheet.mergeCells(1, 1, 1, columns.length);
  const titleCell = worksheet.getCell("A1");

  titleCell.value = title;
  titleCell.font = {
    bold: true,
    size: 16,
    color: { argb: "FFFFFF" },
  };

  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1E3A8A" },
  };

  titleCell.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.getRow(1).height = 25;

  //
  // HEADERS
  //
  const headerRow = worksheet.addRow(columns);

  headerRow.font = {
    bold: true,
    color: { argb: "FFFFFF" },
  };

  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "2563EB" },
  };

  headerRow.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  //
  // DATA
  //
  data.forEach((item) => {
    worksheet.addRow(Object.values(item));
  });

  //
  // BORDERS
  //
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  //
  // AUTO SIZE COLUMNS
  //
  worksheet.columns.forEach((column) => {
    let maxLength = 10;

    column.eachCell?.({ includeEmpty: true }, (cell) => {
      const value = cell.value?.toString() ?? "";
      maxLength = Math.max(maxLength, value.length);
    });

    column.width = maxLength + 5;
  });

  //
  // DOWNLOAD
  //
  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buffer]), `${fileName}.xlsx`);
};
