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

  /**
   * Renders the table header and body.
   * @param { Object } config
   * @param { HTMLElement|string } config.thead - The <thead> element or its ID.
   * @param { HTMLElement|string } config.tbody - The <tbody> element or its ID.
   * @param { Object } config.columns - The schema object for columns.
   * @param { Array<Object> } config.data - The array of data objects.
   * @param { Object } [config.options] - Optional configuration (hyperlinks, formatting).
   */
  render(config) {
    let { thead, tbody } = config;
    const { columns, data, options = {} } = config;

    if (typeof thead === "string") thead = document.getElementById(thead);
    if (typeof tbody === "string") tbody = document.getElementById(tbody);

    // Create the thead
    if (thead) {
      thead.innerHTML = "";
      const tr = document.createElement("tr");
      thead.appendChild(tr);

      Object.entries(columns).forEach(([key, value]) => {
        const th = document.createElement("th");
        th.textContent = value.labelText;
        tr.appendChild(th);
      });
    }

    // Create the tbody
    if (tbody) {
      tbody.innerHTML = "";

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
        console.error("table.render expects an Array of data, got:", data);
        return;
      }

      data.forEach((rowData) => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", rowData.id);

        Object.entries(columns).forEach(([key, value]) => {
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
              a.innerText = displayValue;
              td.appendChild(a);
              break;
            case key === "deleteBtn" && settings[key] === true:
              const deleteBtn = document.createElement("button");
              deleteBtn.className = "btn btn-danger btn-sm";
              deleteBtn.dataset.deleteItem = "";
              deleteBtn.innerHTML = /* html */ `<span class="bi bi-trash"></span>`;
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
              td.innerText = displayValue !== undefined ? displayValue : "-";
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }
  },
};
