import { gamesStorage } from "./games-storage.js";

/*
  CSV row parser that handles quoted fields
*/
function parseCSVRow(row) {
  const values = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = "";
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim());
  return values;
}

// Default values for missing fields
const DEFAULT_GAME = {
  status: "Not started",
  region: "PAL",
  condition: "Cartridge only",
  ownership: "In Collection",
  price: "0.00",
};

// CSV headers (in order)
const CSV_HEADERS = [
  "id",
  "title",
  "platform",
  "year",
  "region",
  "condition",
  "format",
  "status",
  "ownership",
  "purchase_date",
  "price",
  "note",
];

/*
  EXPORT FUNCTION
*/
export function exportGamesToCSV() {
  const games = gamesStorage.load();

  if (games.length === 0) {
    alert("No games to export!");
    return false;
  }

  // Create CSV rows
  const csvRows = [CSV_HEADERS.join(",")];

  games.forEach(function (game) {
    const row = [
      game.id,
      `"${(game.title || "").replace(/"/g, '""')}"`,
      game.platform || "",
      game.year || "",
      game.region || "",
      game.condition || "",
      game.format || "",
      game.status || "",
      game.ownership || "",
      game.purchase_date || "",
      game.price || "",
      `"${(game.note || "").replace(/"/g, '""')}"`,
    ];
    csvRows.push(row.join(","));
  });

  // Create download
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `games-library-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);

  return true; // Success
}

/*
  IMPORT FUNCTION
*/
export function importGamesFromCSV(file) {
  return new Promise(function (resolve, reject) {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const text = e.target.result.trim();
        const rows = text.split("\n");

        if (rows.length < 2) {
          reject(new Error("CSV file is empty or invalid"));
          return;
        }

        // Parse headers
        const headers = rows
          .shift()
          .split(",")
          .map(function (h) {
            return h.replace("\r", "").trim();
          });

        // Parse each row
        const importedGames = rows.map(function (row) {
          const values = parseCSVRow(row);
          const game = { ...DEFAULT_GAME };

          headers.forEach(function (header, i) {
            let val = values[i] || "";

            // Remove quotes
            if (val.startsWith('"') && val.endsWith('"')) {
              val = val.slice(1, -1);
            }

            // Convert types
            if (header === "id" || header === "year") {
              val = val ? Number(val) : "";
            }

            if (header === "price") {
              val = parseFloat(val || 0).toFixed(2);
            }

            // Map ownership header to ownershipStatus property
            const propertyName = header === "ownership" ? "ownership" : header;
            game[propertyName] = val;
          });

          // Ensure ID exists
          if (!game.id) {
            game.id = Date.now() + Math.floor(Math.random() * 10000);
          }

          // Apply defaults for missing values
          if (!game.ownership) game.ownership = DEFAULT_GAME.ownership;
          if (!game.condition) game.condition = DEFAULT_GAME.condition;
          if (!game.region) game.region = DEFAULT_GAME.region;
          if (!game.status) game.status = DEFAULT_GAME.status;

          return game;
        });

        // Save to storage
        gamesStorage.save(importedGames);

        resolve(importedGames.length);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function () {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
}
