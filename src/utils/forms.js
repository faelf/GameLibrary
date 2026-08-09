export function wrapper() {
  const wrapper = document.createElement("div");
  return wrapper;
}

export function label(id, labelText) {
  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.classList.add("form-label", "fw-bold");
  labelElement.textContent = labelText;
  return labelElement;
}

export function helper(text) {
  const formText = document.createElement("div");
  formText.className = "form-text";
  formText.textContent = text;
  return formText;
}

export function input(config, value = "") {
  const { id, label: labelText, type, placeholder, name } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(id, labelText);

  const input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = type || "text";
  input.className = "form-control";

  if (type !== "date" && placeholder) {
    input.placeholder = placeholder;
  }

  if (value !== null && value !== undefined) {
    input.value = value;
    input.setAttribute("value", value);
  }

  fieldWrapper.appendChild(labelEl);
  fieldWrapper.appendChild(input);

  return fieldWrapper;
}

export function inputGroup(config, groupText, value = "") {
  const { id, label: labelText, type, placeholder, name } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(id, labelText);

  const inputGroupEl = document.createElement("div");
  inputGroupEl.className = "input-group";

  const groupTextSpan = document.createElement("span");
  groupTextSpan.className = "input-group-text";
  groupTextSpan.textContent = groupText;

  const input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = type || "number";
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
  const { id, label: labelText, list, placeholder, name } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(id, labelText);

  const select = document.createElement("select");
  select.id = id;
  select.name = name;
  select.className = "form-select";

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

  if (list) {
    list.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;

      if (String(optionText) === String(selectedValue)) {
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
  const { id, label: labelText, list, placeholder, helper: helperText, name } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(id, labelText);

  const inputGroupEl = document.createElement("div");
  inputGroupEl.className = "input-group";

  // Use label for the text span to improve accessibility when clicking the icon
  const groupTextSpan = document.createElement("label");
  groupTextSpan.className = "input-group-text";
  groupTextSpan.htmlFor = id;
  groupTextSpan.innerHTML = groupText;

  const select = document.createElement("select");
  select.id = id;
  select.name = name;
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
    list.forEach((optionLabel) => {
      const option = document.createElement("option");
      option.value = optionLabel;
      option.textContent = optionLabel;

      if (String(optionLabel) === String(selectedValue)) {
        option.setAttribute("selected", "");
      }

      select.appendChild(option);
    });
  }

  fieldWrapper.appendChild(labelEl);
  inputGroupEl.appendChild(groupTextSpan);
  inputGroupEl.appendChild(select);
  fieldWrapper.appendChild(inputGroupEl);

  if (helperText) {
    fieldWrapper.appendChild(helper(helperText));
  }

  return fieldWrapper;
}

export function textarea(config, rows = 3, value = "") {
  const { id, label: labelText, placeholder, name } = config;

  const fieldWrapper = wrapper();
  const labelEl = label(id, labelText);

  const textarea = document.createElement("textarea");
  textarea.id = id;
  textarea.name = name;
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
  const { id, label: labelText, list, name } = config;

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
      input.name = name;
      input.value = key;
      input.id = `${id}-${key}`;

      if (String(checkedValue) === String(key)) {
        input.setAttribute("checked", "");
      }

      const optionLabel = document.createElement("label");
      optionLabel.className = "form-check-label";
      optionLabel.htmlFor = input.id;
      optionLabel.textContent = value;

      checkWrapper.appendChild(input);
      checkWrapper.appendChild(optionLabel);
      fieldWrapper.appendChild(checkWrapper);
    });
  }

  return fieldWrapper;
}

export function singleCheckbox(config, isChecked = false) {
  const { id, label: labelText, name } = config;

  const fieldWrapper = wrapper();

  const formCheck = document.createElement("div");
  formCheck.className = "form-check";

  const input = document.createElement("input");
  input.className = "form-check-input";
  input.type = "checkbox";
  input.id = id;
  input.name = name;

  if (isChecked === true || isChecked === "true") {
    input.setAttribute("checked", "");
  }

  const checkboxLabel = document.createElement("label");
  checkboxLabel.className = "form-check-label";
  checkboxLabel.htmlFor = id;
  checkboxLabel.textContent = labelText;

  formCheck.appendChild(input);
  formCheck.appendChild(checkboxLabel);

  fieldWrapper.appendChild(formCheck);
  return fieldWrapper;
}

export function multipleCheckbox(config, checkedValues = []) {
  const { id, label: labelText, list, name } = config;

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
      input.name = name;
      input.value = key;
      input.id = `${id}-${key}`;

      if (safeValues.includes(String(key))) {
        input.setAttribute("checked", "");
      }

      const optionLabel = document.createElement("label");
      optionLabel.className = "form-check-label";
      optionLabel.htmlFor = input.id;
      optionLabel.textContent = value;

      checkWrapper.appendChild(input);
      checkWrapper.appendChild(optionLabel);
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

    if (field.type === "checkbox") {
      field.checked = !!value;
    } else if (field.value !== undefined) {
      field.value = value;
    }
  });
}
