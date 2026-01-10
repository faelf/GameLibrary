import { formatters } from "./formatters.js";

/**
 * Utility object for generating dynamic HTML table structures.
 * Contains methods to programmatically build <thead> and <tbody> elements
 * based on provided data and schema configurations.
 * @namespace
 */
export const table = {
  /**
   * Generates and appends header cells to a table's <thead> element.
   * @param { HTMLElement } theadId - The <thead> element where headers will be rendered.
   * @param { Object } tableHeaders - The schema object containing column configurations (labels, keys).
   */
  addTHeader(theadId, tableHeaders) {
    const tr = document.createElement("tr");
    theadId.appendChild(tr);

    Object.entries(tableHeaders).forEach(([key, value]) => {
      const th = document.createElement("th");
      th.textContent = value.labelText;
      tr.appendChild(th);
    });
  },
  /**
   * Populates a table body with rows based on an array of data.
   * @param { HTMLElement } tbodyId - The <tbody> element where the rows will be added.
   * @param { Object } tdColumns - The schema object used to map data keys to labels (and for mobile 'data-cell' attributes).
   * @param { Array<Object> } tdData - An array of objects containing the data for each row.
   * @param { Object } [ tdConfig ] - Optional configuration for specific column formatting.
   * @param { string } [ tdConfig.hyperlink="title" ] - The data key to render as a clickable link.
   * @param { string } [ tdConfig.hyperlinkTarget="details-page" ] - The navigation target for the link.
   * @param { string } [ tdConfig.longDate="date" ] - The data key to format as a date.
   * @param { string } [ tdConfig.currencySymbol="price" ] - The data key to format as currency.
   */
  addTBody(tbodyId, tdColumns, tdData, tdConfig = {}) {
    const options = {
      hyperlink: "title",
      hyperlinkTarget: "details-page",
      longDate: "date",
      currencySymbol: "price",
      ...tdConfig,
    };

    // Normalize longDate to always be an array
    if (!Array.isArray(options.longDate)) {
      options.longDate = [options.longDate];
    }

    // Normalize currencySymbol to always be an array
    if (!Array.isArray(options.currencySymbol)) {
      options.currencySymbol = [options.currencySymbol];
    }

    // Check if tableData is actually an array before looping
    if (!Array.isArray(tdData)) {
      console.error("addTBody expects an Array of data, got:", tdData);
      return;
    }

    // Loop through rows in the data
    tdData.forEach((rowData) => {
      const tr = document.createElement("tr");
      tr.setAttribute("data-id", rowData.id);

      // Loop through columns for this specific row
      Object.entries(tdColumns).forEach(([key, value]) => {
        const td = document.createElement("td");
        td.setAttribute("data-cell", value.labelText);

        // Prepare the value for display
        let displayValue = rowData[key];

        // If the schema has a list (e.g. Select/Radio), map the Key to the Label
        if (value.list && value.list[displayValue]) {
          displayValue = value.list[displayValue];
        }

        // Options
        if (key === options.hyperlink) {
          const a = document.createElement("a");
          a.href = "#";
          a.dataset.pageTarget = options.hyperlinkTarget;
          a.dataset.pageTargetId = rowData.id;
          a.innerText = displayValue;
          td.appendChild(a);
        } else if (options.longDate.includes(key)) {
          td.innerText = rowData[key] ? formatters.longDate(rowData[key]) : "-";
        } else if (options.currencySymbol.includes(key)) {
          td.innerText = formatters.fullPrice(rowData[key]);
        } else {
          td.innerText = displayValue !== undefined ? displayValue : "-";
        }
        tr.appendChild(td);
      });

      // Append the finished row to the body
      tbodyId.appendChild(tr);
    });
  },
};
