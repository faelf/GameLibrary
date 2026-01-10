export const csv = {
  /**
   * Helper to parse a CSV row string into an array of values.
   * Handles quoted values and escaped quotes.
   * @param { string } row
   * @returns { string[] }
   */
  _parseRow(row) {
    const values = [];
    let currentValue = "";
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      const nextChar = row[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentValue += '"';
          i++; // Skip the escaped quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());
    return values;
  },

  /**
   * Generic export to CSV.
   * @param { Array<Object> } data - Array of objects to export.
   * @param { Array<{key: string, label: string}> } columns - Column configuration.
   * @param { string } filename - Name of the file to download.
   */
  export(data, columns, filename = "export.csv") {
    if (!data || !data.length) {
      console.warn("CSV Export: No data provided.");
      return false;
    }

    // 1. Create Header Row
    const headers = columns.map((col) => col.label);
    const csvRows = [headers.join(",")];

    // 2. Create Data Rows
    data.forEach((item) => {
      const row = columns.map((col) => {
        let value = item[col.key];

        if (value === null || value === undefined) {
          value = "";
        }

        const stringValue = String(value);

        // Escape quotes: replace " with ""
        const escapedValue = stringValue.replace(/"/g, '""');

        // Wrap in quotes if contains comma, newline, or quote
        if (/[",\n]/.test(stringValue)) {
          return `"${escapedValue}"`;
        }

        return escapedValue;
      });
      csvRows.push(row.join(","));
    });

    // 3. Download File
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  },

  /**
   * Internal helper to read, parse, and process CSV data.
   * @param { File|HTMLInputElement } source
   * @param { Object } config
   * @returns { Promise<Array<Object>> }
   */
  _load(source, { columns, transform } = {}) {
    return new Promise((resolve, reject) => {
      // Handle Input Element or File object
      const file = source.files ? source.files[0] : source;

      if (!file) {
        reject(new Error("Please select a file first."));
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const text = e.target.result.trim();
          if (!text) {
            resolve([]);
            return;
          }

          const rows = text.split("\n");
          if (rows.length < 2) {
            // Only headers or empty
            resolve([]);
            return;
          }

          // Parse Headers (First Row)
          const headers = this._parseRow(rows.shift());

          // Create a lookup map: Label -> Key (e.g., "Game Title" -> "title")
          const labelToKey = {};
          if (columns) {
            columns.forEach((col) => (labelToKey[col.label] = col.key));
          }

          // Parse Data Rows
          const results = rows.map((rowStr) => {
            const values = this._parseRow(rowStr);
            let obj = {};

            headers.forEach((header, index) => {
              // Map value to header key
              // Remove any accidental whitespace from header
              const label = header.trim();
              const key = labelToKey[label] || label;
              obj[key] = values[index] || "";
            });

            // Apply transformation if provided
            if (transform && typeof transform === "function") {
              obj = transform(obj);
            }

            // Generic ID generation: Ensure every item has an ID
            if (!obj.id) {
              obj.id = Date.now() + Math.floor(Math.random() * 10000);
            }

            return obj;
          });

          resolve(results);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  },

  /**
   * Import and Replace.
   * Reads CSV and optionally saves it to localStorage, replacing existing data.
   * @param { File|HTMLInputElement } source - The file input or file object.
   * @param { Object } options - Configuration object.
   * @param { Array } [options.columns ] - Column mapping.
   * @param { Function } [options.transform ] - Data transformation function.
   * @param { string } [options.storageKey ] - If provided, saves data to this localStorage key.
   * @returns { Promise<Array<Object>> } The imported data.
   */
  async import(source, { columns, transform, storageKey } = {}) {
    const data = await this._load(source, { columns, transform });

    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }

    return data;
  },

  /**
   * Import and Merge.
   * Reads CSV and appends it to existing localStorage data.
   * @param { File|HTMLInputElement } source
   * @param { Object } options
   * @returns { Promise<Array<Object>> } The combined data.
   */
  async merge(source, { columns, transform, storageKey } = {}) {
    const newData = await this._load(source, { columns, transform });
    let finalData = newData;

    if (storageKey) {
      const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
      // Prevent duplicate IDs
      const existingIds = new Set(existing.map((item) => item.id));
      const uniqueNewData = newData.filter((item) => !existingIds.has(item.id));

      finalData = [...existing, ...uniqueNewData];
      localStorage.setItem(storageKey, JSON.stringify(finalData));
    }

    return finalData;
  },
};
