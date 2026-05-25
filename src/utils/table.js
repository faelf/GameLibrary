import { formatters } from "./formatters.js";

/**
 * Utility object for generating dynamic HTML table structures.
 * Contains methods to programmatically build <thead> and <tbody> elements
 * based on provided data and schema configurations.
 * @namespace
 */
export const table = {
  /**
   * Generates a skeleton loader HTML string for a table.
   * @param {Object} [config] - Configuration config.
   * @param {number} [config.rows=5] - Number of rows to generate.
   * @param {number} [config.cols=10] - Number of columns per row.
   * @returns {string} The HTML string representing the skeleton rows.
   */
  skeleton({ rows = 5, cols = 10 } = {}) {
    return Array.from(
      { length: rows },
      () => `
      <tr>
        ${Array.from(
          { length: cols },
          () => `
            <td class="placeholder-wave p-2">
              <span class="placeholder col-12 bg-primary rounded"></span>
            </td>
          `,
        ).join("")}
      </tr>
    `,
    ).join("");
  },
  _tbody(config) {
    const { columns, data, options = {} } = config;
    const tbody = document.createElement("tbody");

    const settings = {
      hyperlink: "title",
      hyperlinkTarget: "details-page",
      longDate: "date",
      currencySymbol: "price",
      deleteBtn: false,
      ...options,
    };

    if (!Array.isArray(settings.longDate)) {
      settings.longDate = [settings.longDate];
    }
    if (!Array.isArray(settings.currencySymbol)) {
      settings.currencySymbol = [settings.currencySymbol];
    }

    if (!Array.isArray(data)) {
      console.error("table._tbody expects an Array of data, got:", data);
      return tbody;
    }

    const effectiveColumns = { ...columns };
    if (settings.deleteBtn) {
      effectiveColumns.deleteBtn = { labelText: "Delete" };
    }

    data.forEach((rowData) => {
      const tr = document.createElement("tr");
      tr.dataset.itemId = rowData.id;

      if (settings.hyperlink === "table-row") {
        tr.style.cursor = "pointer";
        tr.dataset.pageTarget = settings.hyperlinkTarget;
        tr.dataset.pageTargetId = rowData.id;
      }

      Object.entries(effectiveColumns).forEach(([key, value]) => {
        const td = document.createElement("td");
        td.setAttribute("data-cell", value.labelText);

        let displayValue = rowData[key];
        if (value.list && value.list[displayValue]) {
          displayValue = value.list[displayValue];
        }

        switch (true) {
          case key === settings.hyperlink:
            const a = document.createElement("a");
            a.href = "#";
            a.className = "text-decoration-none";
            a.dataset.pageTarget = settings.hyperlinkTarget;
            a.dataset.pageTargetId = rowData.id;
            a.innerText = (displayValue !== undefined && displayValue !== "") ? displayValue : "-";
            td.appendChild(a);
            break;
          case key === "deleteBtn" && settings[key] === true:
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-danger";
            deleteBtn.dataset.deleteItem = "";
            deleteBtn.innerHTML = /* html */ `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-md">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>`;
            td.appendChild(deleteBtn);
            td.className = "text-lg-center";
            break;
          case settings.longDate.includes(key):
            td.innerText = rowData[key]
              ? formatters.longDate(rowData[key])
              : "-";
            break;
          case settings.currencySymbol.includes(key):
            td.innerText = formatters.fullPrice(rowData[key]);
            break;
          default:
            td.innerText = (displayValue !== undefined && displayValue !== "") ? displayValue : "-";
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    return tbody;
  },
  _thead(config) {
    const { columns, options = {} } = config;
    const settings = { deleteBtn: false, ...options };
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    thead.appendChild(tr);

    const effectiveColumns = { ...columns };
    if (settings.deleteBtn) {
      effectiveColumns.deleteBtn = { labelText: "Delete" };
    }

    Object.entries(effectiveColumns).forEach(([key, value]) => {
      const th = document.createElement("th");
      th.textContent = value.labelText;
      tr.appendChild(th);
    });

    return thead;
  },
  /**
   * Renders the table header and body.
   * @param { Object } config
   * @param { HTMLElement|string } config.table - The <thead> element or its ID.
   * @param { Object } config.columns - The schema object for columns.
   * @param { Array<Object> } config.data - The array of data objects.
   * @param { Object } [config.options] - Optional configuration (hyperlinks, formatting).
   */
  render(config) {
    const tableEl = document.querySelector(config.table);

    if (tableEl) {
      tableEl.innerHTML = "";
      tableEl.appendChild(this._thead(config));
      tableEl.appendChild(this._tbody(config));
    }
  },
};
