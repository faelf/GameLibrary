/**
 * Utility object for handling JSON file operations (export, import, merge).
 */
export const jsonFile = {
  /**
   * Exports data to a JSON file and triggers a download.
   * @param {Object} jsonConfig - Configuration object for the export.
   * @param {Array|Object} jsonConfig.data - The data to be exported.
   * @param {string} [jsonConfig.fileName="data"] - The name of the file to download (extension optional).
   * @returns {boolean} True if export was successful, false if data was empty.
   */
  export(jsonConfig) {
    const { data, fileName = "data" } = jsonConfig;
    if (!data || (Array.isArray(data) && data.length === 0)) return false;

    // To make sure that the file name has .json
    let exportName = fileName;
    if (!exportName.endsWith(".json")) {
      exportName = exportName + ".json";
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = exportName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  },
  /**
   * Imports data from a JSON file.
   * @todo Implement import logic
   */
  import() {
    // Import method
  },
  /**
   * Merges data from a JSON file with existing data.
   * @todo Implement merge logic
   */
  merge() {
    // Merge method
  },
};
