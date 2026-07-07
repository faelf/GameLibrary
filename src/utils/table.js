import { formatters } from "./formatters.js";

export function emptyTable(container) {
  container.innerHTML = /* html */ `
  <div class="text-center py-5">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-page mx-auto">
      <line x1="6" x2="10" y1="11" y2="11"/>
      <line x1="8" x2="8" y1="9" y2="13"/>
      <line x1="15" x2="15.01" y1="12" y2="12"/>
      <line x1="18" x2="18.01" y1="10" y2="10"/>
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
    </svg>
    <h4 class="mt-3">No games in your library yet</h4>
    <p class="text-muted">Click the "Add Game" button to start tracking your collection!</p>
  </div>`;
}

export function noResultsFound() {
  const noResults = /* html */ `
    <div class="text-center py-5">
      <span class="bi bi-search display-1 text-muted"></span>
      <h4 class="mt-3">No results found</h4>
      <p class="text-muted">Try adjusting your search terms.</p>
    </div>
  `;
}

function skeleton({ rows = 5, cols = 10 } = {}) {
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
}

function tbody({ columns, data }) {
  const tbody = document.createElement("tbody");
  tbody.className = "table-group-divider";

  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", item.id);
    tr.setAttribute("data-href", "game-details-page");

    for (const column of Object.keys(columns)) {
      const value = item[column];
      const td = document.createElement("td");
      td.setAttribute("data-cell", columns[column]);

      if (value && column.toLowerCase().includes("date")) {
        td.textContent = formatters.longDate(value);
      } else if (value && column.toLowerCase().includes("price")) {
        td.textContent = formatters.fullPrice(value);
      } else {
        td.textContent = value ?? "-";
      }

      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });

  return tbody;
}

function thead(columns) {
  const thead = document.createElement("thead");
  thead.className = "text-center";
  const tr = document.createElement("tr");

  Object.values(columns).forEach((value) => {
    const th = document.createElement("th");
    th.innerText = value;
    tr.appendChild(th);
  });

  thead.appendChild(tr);

  return thead;
}

export function loadTable(config) {
  // Get the container from the DOM
  const tableContainer = document.querySelector(config.container);
  // Clear the container
  tableContainer.innerHTML = "";
  // Create the table element
  const table = document.createElement("table");
  table.className = "table table-striped table-hover align-middle";
  // Append thead and tbody
  table.appendChild(thead(config.columns));
  table.appendChild(tbody({ columns: config.columns, data: config.data }));
  // Append table to container
  tableContainer.appendChild(table);
}
