/**
 * Adds headers to a table head.
 * @param {HTMLElement} tableHead - thead element that will render the headers.
 * @param {Array} tableHeaders - The headers that will be rendered.
 */
export function addTableHeader(tableHead, tableHeaders) {
  const tr = document.createElement("tr");
  tableHead.appendChild(tr);

  tableHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    tr.appendChild(th);
  });
}

/**
 * Adds a row to a table body.
 * @param {HTMLElement} tableBody - Where the rows will be added.
 * @param {Array} tableHeaders - The headers to be displayed in small screens.
 * @param {Object} rowData - Info to be rendered in the table.
 */
export function addTableRow(tableBody, tableHeaders, rowData) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", rowData.id);
  tableBody.appendChild(tr);

  tableHeaders.forEach((header) => {
    const td = document.createElement("td");
    td.setAttribute("data-cell", header);

    // Populate cells based on header type
    switch (header) {
      case "Title":
        const a = document.createElement("a");
        a.href = "#";
        a.className = "text-decoration-none";
        a.textContent = rowData.title;
        // a.setAttribute("data-link", rowData.id);
        a.dataset.pageTarget = "game-details-page";
        a.dataset.pageTargetId = rowData.id;
        td.appendChild(a);
        break;

      case "Delete":
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-sm btn-danger";
        button.setAttribute("data-delete-game", "");
        button.innerHTML = `<span class="bi bi-trash3-fill"></span>`;
        td.className = "text-lg-center";
        td.appendChild(button);
        break;

      case "Status":
        const statusSelect = document.createElement("select");
        statusSelect.className = "form-select form-select-sm status-select";
        statusSelect.setAttribute("data-field", "status");
        statusSelect.setAttribute("data-id", rowData.id);
        statusSelect.innerHTML = `
          <option value="" disabled>Status</option>
          <option value="Not started" ${rowData.status === "Not started" ? "selected" : ""}>Not started</option>
          <option value="Playing" ${rowData.status === "Playing" ? "selected" : ""}>Playing</option>
          <option value="Completed" ${rowData.status === "Completed" ? "selected" : ""}>Completed</option>
        `;
        td.appendChild(statusSelect);
        break;

      case "Ownership":
        const ownershipSelect = document.createElement("select");
        ownershipSelect.className = "form-select form-select-sm ownership-select";
        ownershipSelect.setAttribute("data-field", "ownership");
        ownershipSelect.setAttribute("data-id", rowData.id);
        ownershipSelect.innerHTML = `
          <option value="" disabled>Select ownership status</option>
          <option value="In Collection" ${
            rowData.ownership === "In Collection" ? "selected" : ""
          }>In Collection</option>
          <option value="Borrowed" ${rowData.ownership === "Borrowed" ? "selected" : ""}>Borrowed</option>
          <option value="Lent Out" ${rowData.ownership === "Lent Out" ? "selected" : ""}>Lent to Someone</option>
          <option value="Sold" ${rowData.ownership === "Sold" ? "selected" : ""}>Sold</option>
        `;
        td.appendChild(ownershipSelect);
        break;

      default:
        td.textContent = rowData[header.toLowerCase()] || "Unknown";
    }

    tr.appendChild(td);
  });
}
