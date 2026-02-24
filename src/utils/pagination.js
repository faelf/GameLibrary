/**
 * @typedef {Object} PaginationOptions
 * @property {string} containerId - The HTML ID of the element to render into.
 * @property {number} totalItems - Total number of items to paginate.
 * @property {number} [itemsPerPage=10] - Number of items per page.
 * @property {number} [currentPage=1] - The current active page number.
 * @property {Function} onPageChange - Callback fired when a page is selected (receives newPage number).
 */

/**
 * @typedef {Object} PageLinkOptions - Configuration for the button.
 * @property {string|number} text - The text to display inside the button.
 * @property {number} pageNumber - The page number this button links to.
 * @property {boolean} isDisabled - Whether the button should be disabled.
 * @property {boolean} isActive - Whether the button represents the current page.
 * @property {Function} onPageChange - Callback function to run on click (receives pageNumber).
 * @property {number} currentPage - The current active page number (used for validation).
 */

/**
 * @typedef {Object} PaginateItems - Pagination options.
 * @property {Array<Object>} items - The full array of items to slice.
 * @property {number} [currentPage=1] - The current page number.
 * @property {number} [itemsPerPage] - Number of items per page (defaults to global default).
 */

/**
 * Utility object for handling pagination logic and rendering.
 * @namespace
 */
export const pagination = {
  /**
   * Default configuration settings.
   * @property {number} itemsPerPage - Default number of items to show per page (10).
   */
  default: {
    itemsPerPage: 10,
  },
  /**
   * Helper Function: Create a single button (<li><a>...</a></li>).
   * @param {PageLinkOptions} options
   * @returns {HTMLLIElement} The constructed list item element.
   */
  _createPageLink(options) {
    const {
      text,
      pageNumber,
      isDisabled,
      isActive,
      onPageChange,
      currentPage,
    } = options;
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
  },
  /**
   * Renders pagination controls into a container.
   * @param {PaginationOptions} options - Pagination configuration.
   */
  render(options) {
    // Extract values from the options object
    // We use default values for itemsPerPage (10) and currentPage (1) if they are missing
    const {
      containerId,
      totalItems,
      itemsPerPage = this.default.itemsPerPage,
      currentPage = 1,
      onPageChange,
    } = options;

    // Find the HTML element where we will put the buttons
    const container = document.getElementById(containerId);

    // If the element doesn't exist, stop here to avoid errors
    if (!container) {
      console.error(
        `Pagination container with ID "${containerId}" not found.`,
      );
      return;
    }

    // Clear any existing buttons in the container
    container.innerHTML = "";

    // Calculate how many pages we need
    // Math.ceil rounds up (e.g., 11 items / 10 per page = 1.1 -> 2 pages)
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // If we have 1 or fewer pages, we don't need to show pagination buttons
    if (totalPages <= 1) {
      return;
    }

    // Create the main list element (<ul>) for Bootstrap pagination
    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center";

    // Build the Buttons

    // Previous Button
    ul.appendChild(
      this._createPageLink({
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
        this._createPageLink({
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
      this._createPageLink({
        text: "&raquo;",
        pageNumber: currentPage + 1,
        isDisabled: currentPage === totalPages,
        isActive: false,
        onPageChange,
        currentPage,
      }),
    );

    // Append the list into the container on the page
    container.appendChild(ul);
  },
  /**
   * Calculates the last page number based on total items.
   * Useful for jumping to the end of the list after adding an item.
   * @param {Object} lastPage - Configuration object.
   * @param {number} lastPage.totalItems - Total number of items.
   * @param {number} [lastPage.itemsPerPage] - Items per page (defaults to global default).
   * @returns {number} The last page number.
   */
  getLastPage(lastPage) {
    const itemsPerPage = lastPage.itemsPerPage || this.default.itemsPerPage;
    const page = Math.ceil(lastPage.totalItems / itemsPerPage) || 1;
    return page;
  },
  /**
   * Slices an array of items to return only those for the specific page.
   * @param {PaginateItems} options - Pagination options.
   * @returns {Array<Object>} The sliced array of items for the current page.
   */
  paginateItems(options) {
    const {
      items,
      currentPage = 1,
      itemsPerPage = this.default.itemsPerPage,
    } = options;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  },
  /**
   * Creates a handler function that updates state and re-renders.
   * @param {Function} updateState - Callback to update the current page (e.g. (p) => currentPage = p).
   * @param {Function} render - Callback to re-render the content.
   * @returns {function(number): void} A function that accepts a page number.
   */
  createPageHandler(updateState, render) {
    return (newPage) => {
      updateState(newPage);
      render();
    };
  },
};
