# 🎮 Game Library

## 📖 Overview

**Game Library** is a Vanilla JavaScript Single Page Application (SPA) born out of a personal need: a lightweight, customisable way to track and manage my own video game collection. Designed primarily for home users and hobbyists, the application focuses on simplicity and giving users full ownership of their data.

To keep the project accessible and cost-effective for personal deployment, I integrated Firebase (Firestore) for data persistence. Its generous free tier and high API request limits make it the perfect backend solution for an individual's personal library, ensuring reliable cloud storage without incurring any ongoing hosting costs.

## 🛠️ Technologies Used

### 🌐 Core Languages & Web Standards

- **JavaScript (ES6+):** The core logic of the application.
- **HTML5 & CSS3:** Semantic markup and styling.
- **Sass (SCSS):** CSS preprocessor for advanced styling and overriding default framework variables.
- **Web Components:** Using Custom Elements (e.g., `<ui-navbar>`, `<ui-footer>`) for encapsulated, reusable UI pieces.

### 📚 Libraries & Frameworks

- **Bootstrap 5:** Responsive layout grid, UI components (Modals, Toasts), and built-in dark/light mode theming.
- **Firebase (Firestore):** Cloud NoSQL database integration for persistent data storage.

### ⚙️ Build Tools & Automation

- **Vite:** Modern, fast frontend build tool and bundler (handling ?raw HTML imports, Rollup options, and Terser minification).
- **Gulp:** Task runner used for automating the compilation and minification of SCSS files.

### 🐳 Infrastructure & Containerisation

- **Docker:** Containerised the application using a `Dockerfile` to ensure a consistent, reproducible deployment environment.