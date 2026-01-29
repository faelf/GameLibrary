/**
 * Form Utility
 */
export const form = {
  __wrapper() {
    const wrapper = document.createElement("div");
    return wrapper;
  },
  __label(inputId, labelText) {
    const label = document.createElement("label");
    label.htmlFor = inputId;
    label.className = "form-label";
    label.textContent = labelText;
    return label;
  },
  /**
   * Creates an input field using a configuration object.
   * @param { Object } config - The configuration object for this field.
   * @param { string } [ value ] - Optional pre-filled value (useful for editing).
   * @returns { HTMLDivElement } Wrapper containing the label and input.
   * @example
   * const titleField = document.getElementById("title-field");
   * const titleInputWrapper = form.input(gameInfo.title);
   * titleField.appendChild(titleInputWrapper);
   */
  input(config, value = "") {
    const { inputId, labelText, inputType, placeholder } = config;

    const wrapper = this.__wrapper();
    const label = this.__label(inputId, labelText);

    const input = document.createElement("input");
    input.id = inputId;
    input.name = inputId;
    input.type = inputType || "text";
    input.className = "form-control";

    // Only add placeholder if it's NOT a date input
    if (inputType !== "date" && placeholder) {
      input.placeholder = placeholder;
    }

    // Handle value if provided
    if (value !== null && value !== undefined) {
      input.value = value;
    }

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  },
  /**
   * Renders an input group (e.g. Price field with a "£" symbol).
   * @param { FieldConfig } config - The configuration object.
   * @param { string } groupText - The symbol/text to display (e.g., "£").
   * @param { string|number } [ value ] - Optional pre-filled value.
   * @returns { HTMLDivElement } Wrapper containing the label and input group.
   */
  inputGroup(config, groupText, value = "") {
    const { inputId, labelText, inputType, placeholder } = config;

    const wrapper = this.__wrapper();
    const label = this.__label(inputId, labelText);

    const inputGroupEl = document.createElement("div");
    inputGroupEl.className = "input-group";

    const groupTextSpan = document.createElement("span");
    groupTextSpan.className = "input-group-text";
    groupTextSpan.textContent = groupText;

    const input = document.createElement("input");
    input.id = inputId;
    input.type = inputType || "number";
    input.className = "form-control";

    if (input.type === "number") {
      input.setAttribute("step", "any");
    }

    if (placeholder) input.placeholder = placeholder;

    if (value !== null && value !== undefined) {
      input.value = value;
    }

    wrapper.appendChild(label);
    inputGroupEl.appendChild(groupTextSpan);
    inputGroupEl.appendChild(input);
    wrapper.appendChild(inputGroupEl); // Don't forget to append group to wrapper!

    return wrapper;
  },
  /**
   * Renders a select input with options.
   * @param { FieldConfig } config - Configuration object (must contain a 'list' property).
   * @param { string } [selectedValue] - The key of the option to select by default.
   * @returns { HTMLDivElement } The wrapper containing the label and select menu.
   * @example
   * // Example: Creating a platform selector and defaulting to 'switch'
   * const platformWrapper = gameForm.select(gameInfo.platform, "switch");
   * document.getElementById("my-form").appendChild(platformWrapper);
   */
  select(config, selectedValue = "") {
    // Note: I assume 'list' is an object { "ps5": "PlayStation 5" }
    const { inputId, labelText, list, placeholder } = config;

    const wrapper = this.__wrapper();
    const label = this.__label(inputId, labelText);

    const select = document.createElement("select");
    select.id = inputId;
    select.className = "form-select";

    // Create Placeholder
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = placeholder || "Select an option...";

    if (selectedValue === "" || selectedValue === null || selectedValue === undefined) {
      defaultOption.selected = true;
    }

    select.appendChild(defaultOption);

    // Loop options
    if (list) {
      Object.entries(list).forEach(([key, labelText]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = labelText;

        if (String(key) === String(selectedValue)) {
          option.selected = true;
        }

        select.appendChild(option);
      });
    }

    wrapper.appendChild(label);
    wrapper.appendChild(select);

    return wrapper;
  },
  textarea(config, rows = 3, value = "") {
    const { inputId, labelText, placeholder } = config;

    const wrapper = this.__wrapper();
    const label = this.__label(inputId, labelText);

    const textarea = document.createElement("textarea");
    textarea.id = inputId;
    textarea.className = "form-control";

    if (placeholder) textarea.placeholder = placeholder;

    textarea.rows = rows;

    if (value !== null && value !== undefined) {
      textarea.value = value;
    }

    wrapper.appendChild(label);
    wrapper.appendChild(textarea);

    return wrapper;
  },
  radio(config, checkedValue = "") {
    const { inputId, labelText, list } = config;

    const wrapper = this.__wrapper();

    // Main Label
    const groupLabel = document.createElement("label");
    groupLabel.className = "form-label d-block";
    groupLabel.textContent = labelText;
    wrapper.appendChild(groupLabel);

    // Loop through options
    if (list) {
      Object.entries(list).forEach(([key, value]) => {
        const checkWrapper = document.createElement("div");
        checkWrapper.className = "form-check form-check-inline";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "radio";
        input.name = inputId;
        input.value = key;
        input.id = `${inputId}-${key}`;

        if (String(checkedValue) === String(key)) {
          input.checked = true;
        }

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = input.id;
        label.textContent = value;

        checkWrapper.appendChild(input);
        checkWrapper.appendChild(label);
        wrapper.appendChild(checkWrapper);
      });
    }

    return wrapper;
  },
  singleCheckbox(config, isChecked = false) {
    const { inputId, labelText } = config;
    const wrapper = this.__wrapper();

    const formCheck = document.createElement("div");
    formCheck.className = "form-check";

    const input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "checkbox";
    input.id = inputId;

    // Logic: strictly check if true (or "true" string just in case)
    if (isChecked === true || isChecked === "true") {
      input.checked = true;
    }

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = inputId;
    label.textContent = labelText;

    formCheck.appendChild(input);
    formCheck.appendChild(label);

    wrapper.appendChild(formCheck);
    return wrapper;
  },
  multipleCheckbox(config, checkedValues = []) {
    const { inputId, labelText, list } = config;
    const wrapper = this.__wrapper();

    // 1. Main Group Label
    const groupLabel = document.createElement("label");
    groupLabel.className = "form-label d-block";
    groupLabel.textContent = labelText;
    wrapper.appendChild(groupLabel);

    // 2. Safety: Ensure we have an array of strings for comparison
    // This handles null/undefined safely and fixes "1" vs 1 mismatch
    const safeValues = Array.isArray(checkedValues) ? checkedValues.map(String) : [];

    // 3. Loop through the options
    if (list) {
      Object.entries(list).forEach(([key, value]) => {
        const checkWrapper = document.createElement("div");
        checkWrapper.className = "form-check form-check-inline";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "checkbox";
        input.name = inputId; // Group them by name
        input.value = key;
        input.id = `${inputId}-${key}`;

        // Check against our safe array
        if (safeValues.includes(String(key))) {
          input.checked = true;
        }

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = input.id;
        label.textContent = value;

        checkWrapper.appendChild(input);
        checkWrapper.appendChild(label);
        wrapper.appendChild(checkWrapper);
      });
    }

    return wrapper;
  },
  /**
   * Renders a form dynamically into a container.
   * @param { Object } formConfig - Configuration object for the form.
   * @param { string } formConfig.containerId - The HTML ID of the row where inputs go.
   * @param { Object } formConfig.schema - The schema object (e.g. gameSchema).
   * @param { Object } formConfig.layoutMap - Object mapping field keys to column classes (e.g. { title: "col-12" }).
   * @param { Object } [ formConfig.options ] - Optional extras (like currency symbol).
   * @param { Object } [ formConfig.initialData ] - Optional initial data to populate fields.
   */
  render(formConfig) {
    const { containerId, schema, layoutMap, options = {}, initialData = {} } = formConfig;
    const formRow = document.getElementById(containerId);

    if (!formRow) {
      console.error(`Container #${containerId} not found.`);
      return;
    }

    formRow.innerHTML = "";

    const finalOptions = {
      rows: 1,
      inputGroupText: "£",
      ...options,
    };

    Object.entries(schema).forEach(([key, config]) => {
      let fieldWrapper;

      const fieldValue = initialData[key] !== undefined ? initialData[key] : "";

      switch (config.component) {
        case "select":
          fieldWrapper = this.select(config, fieldValue);
          break;
        case "radio":
          fieldWrapper = this.radio(config, fieldValue);
          break;
        case "checkbox":
          if (config.list) {
            fieldWrapper = this.multipleCheckbox(config, fieldValue);
          } else {
            fieldWrapper = this.singleCheckbox(config, fieldValue);
          }
          break;
        case "input-group":
          fieldWrapper = this.inputGroup(config, finalOptions.inputGroupText, fieldValue);
          break;
        case "textarea":
          fieldWrapper = this.textarea(config, finalOptions.rows, fieldValue);
          break;
        default:
          fieldWrapper = this.input(config, fieldValue);
      }

      if (fieldWrapper) {
        // Logic: Use Map -> OR use Schema default -> OR fallback to col-6
        const columnClass = layoutMap[key] || config.columns || "col-12";

        // Apply the classes
        fieldWrapper.classList.add(...columnClass.split(" "), "mb-3");

        formRow.appendChild(fieldWrapper);
      }
    });
  },
  getFormData(schema) {
    const data = {};

    Object.keys(schema).forEach((key) => {
      const config = schema[key];
      const inputElement = document.getElementById(config.inputId);
      if (!inputElement) return;
      switch (config.inputType) {
        case "number":
          data[key] = inputElement.valueAsNumber || 0;
          break;
        default:
          data[key] = inputElement.value;
      }
    });

    return data;
  },
};
