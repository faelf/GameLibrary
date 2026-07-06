export function wrapper() {
  const wrapper = document.createElement("div");
  return wrapper;
}

export function label(inputId, labelText) {
  const label = document.createElement("label");
  label.htmlFor = inputId;
  label.classList.add("form-label", "fw-bold");
  label.textContent = labelText;
  return label;
}

export function helper(text) {
  const formText = document.createElement("div");
  formText.className = "form-text";
  formText.textContent = text;
  return formText;
}

export function input(config, value = "") {
  const { inputId, labelText, inputType, placeholder } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(inputId, labelText);

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
    input.setAttribute("value", value);
  }

  fieldWrapper.appendChild(labelEl);
  fieldWrapper.appendChild(input);

  return fieldWrapper;
}

export function inputGroup(config, groupText, value = "") {
  const { inputId, labelText, inputType, placeholder } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(inputId, labelText);

  const inputGroupEl = document.createElement("div");
  inputGroupEl.className = "input-group";

  const groupTextSpan = document.createElement("span");
  groupTextSpan.className = "input-group-text";
  groupTextSpan.textContent = groupText;

  const input = document.createElement("input");
  input.id = inputId;
  input.name = inputId;
  input.type = inputType || "number";
  input.className = "form-control";

  if (input.type === "number") {
    input.setAttribute("step", "any");
  }

  if (placeholder) input.placeholder = placeholder;

  if (value !== null && value !== undefined) {
    input.value = value;
    input.setAttribute("value", value);
  }

  fieldWrapper.appendChild(labelEl);
  inputGroupEl.appendChild(groupTextSpan);
  inputGroupEl.appendChild(input);
  fieldWrapper.appendChild(inputGroupEl);

  return fieldWrapper;
}

export function select(config, selectedValue = "") {
  const { inputId, labelText, list, placeholder } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(inputId, labelText);

  const select = document.createElement("select");
  select.id = inputId;
  select.name = inputId;
  select.className = "form-select";

  // Create Placeholder
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = placeholder || "Select an option...";

  if (
    selectedValue === "" ||
    selectedValue === null ||
    selectedValue === undefined
  ) {
    defaultOption.setAttribute("selected", "");
  }

  select.appendChild(defaultOption);

  // Loop options
  if (list) {
    Object.entries(list).forEach(([key, labelText]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = labelText;

      if (String(key) === String(selectedValue)) {
        option.setAttribute("selected", "");
      }

      select.appendChild(option);
    });
  }

  fieldWrapper.appendChild(labelEl);
  fieldWrapper.appendChild(select);

  return fieldWrapper;
}

export function selectGroup(config, groupText, selectedValue = "") {
  const { inputId, labelText, list, placeholder, helper } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(inputId, labelText);

  const inputGroupEl = document.createElement("div");
  inputGroupEl.className = "input-group";

  // Use label for the text span to improve accessibility when clicking the icon
  const groupTextSpan = document.createElement("label");
  groupTextSpan.className = "input-group-text";
  groupTextSpan.htmlFor = inputId;
  groupTextSpan.innerHTML = groupText;

  const select = document.createElement("select");
  select.id = inputId;
  select.name = inputId;
  select.className = "form-select";

  // Create Placeholder
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = placeholder || "Select an option...";

  if (
    selectedValue === "" ||
    selectedValue === null ||
    selectedValue === undefined
  ) {
    defaultOption.setAttribute("selected", "");
  }

  select.appendChild(defaultOption);

  // Loop options
  if (list) {
    Object.entries(list).forEach(([key, optionLabel]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = optionLabel;

      if (String(key) === String(selectedValue)) {
        option.setAttribute("selected", "");
      }

      select.appendChild(option);
    });
  }

  fieldWrapper.appendChild(labelEl);
  inputGroupEl.appendChild(groupTextSpan);
  inputGroupEl.appendChild(select);
  fieldWrapper.appendChild(inputGroupEl);

  if (helper) {
    fieldWrapper.appendChild(this.helper(helper));
  }

  return fieldWrapper;
}

export function textarea(config, rows = 3, value = "") {
  const { inputId, labelText, placeholder } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(inputId, labelText);

  const textarea = document.createElement("textarea");
  textarea.id = inputId;
  textarea.name = inputId;
  textarea.className = "form-control";

  if (placeholder) textarea.placeholder = placeholder;

  textarea.rows = rows;

  if (value !== null && value !== undefined && value !== "") {
    textarea.value = value;
    textarea.textContent = value;
  }

  fieldWrapper.appendChild(labelEl);
  fieldWrapper.appendChild(textarea);

  return fieldWrapper;
}

export function radio(config, checkedValue = "") {
  const { inputId, labelText, list } = config;

  const fieldWrapper = wrapper();

  const groupLabel = document.createElement("label");
  groupLabel.className = "form-label d-block";
  groupLabel.textContent = labelText;
  fieldWrapper.appendChild(groupLabel);

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
        input.setAttribute("checked", "");
      }

      const label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = input.id;
      label.textContent = value;

      checkWrapper.appendChild(input);
      checkWrapper.appendChild(label);
      fieldWrapper.appendChild(checkWrapper);
    });
  }

  return fieldWrapper;
}

export function singleCheckbox(config, isChecked = false) {
  const { inputId, labelText } = config;

  const fieldWrapper = wrapper();

  const formCheck = document.createElement("div");
  formCheck.className = "form-check";

  const input = document.createElement("input");
  input.className = "form-check-input";
  input.type = "checkbox";
  input.id = inputId;
  input.name = inputId;

  if (isChecked === true || isChecked === "true") {
    input.setAttribute("checked", "");
  }

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.htmlFor = inputId;
  label.textContent = labelText;

  formCheck.appendChild(input);
  formCheck.appendChild(label);

  fieldWrapper.appendChild(formCheck);
  return fieldWrapper;
}

export function multipleCheckbox(config, checkedValues = []) {
  const { inputId, labelText, list } = config;

  const fieldWrapper = wrapper();

  const groupLabel = document.createElement("label");
  groupLabel.className = "form-label d-block";
  groupLabel.textContent = labelText;
  fieldWrapper.appendChild(groupLabel);

  const safeValues = Array.isArray(checkedValues)
    ? checkedValues.map(String)
    : [];

  if (list) {
    Object.entries(list).forEach(([key, value]) => {
      const checkWrapper = document.createElement("div");
      checkWrapper.className = "form-check form-check-inline";

      const input = document.createElement("input");
      input.className = "form-check-input";
      input.type = "checkbox";
      input.name = inputId;
      input.value = key;
      input.id = `${inputId}-${key}`;

      if (safeValues.includes(String(key))) {
        input.setAttribute("checked", "");
      }

      const label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = input.id;
      label.textContent = value;

      checkWrapper.appendChild(input);
      checkWrapper.appendChild(label);
      fieldWrapper.appendChild(checkWrapper);
    });
  }

  return fieldWrapper;
}

export function render(formConfig) {
  const {
    containerId,
    schema,
    layoutMap,
    options = {},
    initialData = {},
  } = formConfig;
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
        fieldWrapper = select(config, fieldValue);
        break;
      case "select-group":
        fieldWrapper = selectGroup(
          config,
          finalOptions.inputGroupText,
          fieldValue,
        );
        break;
      case "radio":
        fieldWrapper = radio(config, fieldValue);
        break;
      case "checkbox":
        if (config.list) {
          fieldWrapper = multipleCheckbox(config, fieldValue);
        } else {
          fieldWrapper = singleCheckbox(config, fieldValue);
        }
        break;
      case "input-group":
        fieldWrapper = inputGroup(
          config,
          finalOptions.inputGroupText,
          fieldValue,
        );
        break;
      case "textarea":
        fieldWrapper = textarea(config, finalOptions.rows, fieldValue);
        break;
      default:
        fieldWrapper = input(config, fieldValue);
    }

    if (fieldWrapper) {
      // Logic: Use Map -> OR use Schema default -> OR fallback to col-6
      const columnClass = layoutMap[key] || config.columns || "col-12";

      // Apply the classes
      fieldWrapper.classList.add(...columnClass.split(" "), "mb-3");

      formRow.appendChild(fieldWrapper);
    }
  });
}

export function getFormData(schema) {
  const data = {};

  Object.keys(schema).forEach((key) => {
    const config = schema[key];
    const inputElement = document.getElementById(config.inputId);

    switch (true) {
      case config.component === "radio":
        const checked = document.querySelector(
          `input[name="${config.inputId}"]:checked`,
        );
        data[key] = checked ? checked.value : "";
        break;
      case inputElement && inputElement.type === "checkbox":
        data[key] = inputElement.checked;
        break;
      case inputElement && config.inputType === "number":
        data[key] =
          inputElement.value === "" ? "" : inputElement.valueAsNumber;
        break;
      case !!inputElement:
        data[key] = inputElement.value;
        break;
    }
  });

  return data;
}

export function getData(formID) {
  const form = document.querySelector(formID);

  if (!form) return null;

  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

export function populate({ formID, data }) {
  const form = document.querySelector(formID);
  if (!form || !data) return;

  Object.entries(data).forEach(([key, value]) => {
    const field = form.elements[key];

    if (!field) return;

    // Checkbox
    if (field.type === "checkbox") {
      field.checked = value;
      field.defaultChecked = value;
      return;
    }

    // Radio
    if (field instanceof RadioNodeList || field.type === "radio") {
      const radios = form.querySelectorAll(
        `input[name="${key}"][type="radio"]`,
      );

      if (radios.length > 0) {
        radios.forEach((radio) => {
          const isChecked = radio.value === String(value);
          radio.checked = isChecked;
          radio.defaultChecked = isChecked;
        });
        return;
      }
    }

    // Select
    if (field.tagName === "SELECT") {
      field.value = value;
      Array.from(field.options).forEach((option) => {
        option.defaultSelected = option.value === String(value);
      });
      return;
    }

    field.value = value;
    field.defaultValue = value;
  });
}
