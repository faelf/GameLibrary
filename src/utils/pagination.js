const defaultConfig = {
  itemsPerPage: 10,
};

function createPageLink(options) {
  const { text, pageNumber, isDisabled, isActive, onPageChange, currentPage } =
    options;
  // Create the list item (<li>)
  const li = document.createElement("li");
  li.className = "page-item";

  // Add Bootstrap classes for styling
  if (isDisabled === true) {
    li.classList.add("disabled"); // Makes it unclickable visually
  }
  if (isActive === true) {
    li.classList.add("active"); // Highlights the current page
  }

  // Create the page link element (<a>)
  const a = document.createElement("a");
  a.className = "page-link";
  a.href = "#";
  a.innerHTML = text;

  // Add the click event listener
  a.addEventListener("click", (event) => {
    // Prevent the link from jumping to the top of the page
    event.preventDefault();

    // Only run the action if:
    // 1. The button is NOT disabled
    // 2. We are NOT already on this page
    if (isDisabled === false && pageNumber !== currentPage) {
      // Call the function passed from the parent to change the page
      onPageChange(pageNumber);
    }
  });

  // Put the <a> inside the <li>
  li.appendChild(a);
  return li;
}
/**
 * Renders pagination controls into a container.
 * @param {PaginationOptions} options - Pagination configuration.
 */
export function create(options) {
  const {
    totalItems,
    itemsPerPage = defaultConfig.itemsPerPage,
    currentPage = 1,
    onPageChange,
  } = options;

  // Calculate how many pages we need
  // Math.ceil rounds up (e.g., 11 items / 10 per page = 1.1 -> 2 pages)
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // If we have 1 or fewer pages, we don't need to show pagination buttons
  if (totalPages <= 1) {
    return null;
  }

  // Create the main list element (<ul>) for Bootstrap pagination
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Game list navigation");
  const ul = document.createElement("ul");
  ul.className = "pagination justify-content-center";

  // Build the Buttons

  // Previous Button
  ul.appendChild(
    createPageLink({
      text: "&laquo;",
      pageNumber: currentPage - 1,
      isDisabled: currentPage === 1,
      isActive: false,
      onPageChange,
      currentPage,
    }),
  );

  // Smart Pagination Logic
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) end = 4;
    if (currentPage >= totalPages - 2) start = totalPages - 3;
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  pages.forEach((p) => {
    ul.appendChild(
      createPageLink({
        text: p,
        pageNumber: p === "..." ? -1 : p,
        isDisabled: p === "...",
        isActive: p === currentPage,
        onPageChange,
        currentPage,
      }),
    );
  });

  // Next Button
  ul.appendChild(
    createPageLink({
      text: "&raquo;",
      pageNumber: currentPage + 1,
      isDisabled: currentPage === totalPages,
      isActive: false,
      onPageChange,
      currentPage,
    }),
  );

  nav.appendChild(ul);

  return nav;
}

export function getLastPage(lastPage) {
  const itemsPerPage = lastPage.itemsPerPage || defaultConfig.itemsPerPage;
  const page = Math.ceil(lastPage.totalItems / itemsPerPage) || 1;
  return page;
}

export function paginateItems(options) {
  const {
    items,
    currentPage = 1,
    itemsPerPage = defaultConfig.itemsPerPage,
  } = options;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
}

export function createPageHandler(updateState, render) {
  return (newPage) => {
    updateState(newPage);
    render();
  };
}
