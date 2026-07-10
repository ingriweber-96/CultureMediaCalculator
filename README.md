# Culture Media Calculator

An interactive, responsive single-page web application designed for plant tissue culture and micropropagation laboratories to automate culture media formulations. Built entirely with vanilla HTML5, CSS3, and JavaScript, this project demonstrates how complex manual chemical calculations can be streamlined into a modern, user-friendly digital interface.



## Project Description

In micropropagation laboratories, preparing culture media involves mixing precise concentrations of macroelements, microelements, vitamins, and hormones. Traditionally, technicians perform manual calculations or rely on static spreadsheets to scale concentrations based on the desired batch volume in Liters. 

The **Culture Media Calculator** automates this workflow:
- **Instant Scaling:** Scales multiple stock formulations dynamically based on target final volume.
- **Fictionalized Ingredients:** Uses generic, simulated components to represent laboratory inputs securely.
- **Formulation Sheets:** Generates clean, structured table summaries with calculated dosage requirements.
- **Data Portability:** Allows immediate clipboard copy, CSV export, and print-optimized PDF generation.

---

## Goal

The objective of this project is to showcase how laboratory workflows and scientific protocols can be optimized and modernized through clean web interfaces and dynamic front-end logic. By reducing human calculation error, the tool simulates a real-world productivity boost in scientific media preparation rooms.

---

## Technologies Used

- **HTML5:** Semantic architecture ensuring solid SEO foundations, clear layout accessibility, and document structure.
- **CSS3:** Custom styling conforming to the **BioTech Clean Design System** (custom tokens, fluid layouts, Outfit/Inter typography, accessible form controls, and physical button push feedback animations).
- **Vanilla JavaScript (ES6+):** Dynamic calculations, client-side input validations, CSV data generation, clipboard API integrations, and DOM rendering.
- **Print stylesheet (CSS `@media print`):** Tailored style rules that hide application navigation and controls, exporting a professional, clean-table A4 sheet report suitable for physical printing or PDF attachments.

---

## Technical Features

1. **Precision Validation:** Form inputs are validated on submission with dynamic error prompts styled directly into the card structure.
2. **One-Click Copy (Tabular Format):** Copies formulation data as Tab-Separated Values (TSV), allowing users to paste structured tables directly into Microsoft Excel, Google Sheets, or document editors.
3. **Dynamic CSV Exporter:** Generates formatted `.csv` files on the fly and triggers browser downloads programmatically.
4. **Print Optimization:** Formats a perfect A4 physical printout or PDF, eliminating UI controls and banners to preserve paper.

---

## How to Execute

Since the application is built without complex frameworks or node dependencies, running it is straightforward:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/culture-media-calculator.git
   ```
2. **Open the application:**
   Simply double-click the `index.html` file or open it using any modern web browser.
3. **Local Server (Optional for development):**
   If you have VS Code, you can use the *Live Server* extension to run it locally on `http://127.0.0.1:5500`.

---

## Key Learnings

- **Scientific Workflow Mapping:** Translating laboratory micropropagation routines into intuitive digital inputs.
- **Frameworkless Utility:** Proving that highly interactive, responsive, and utility-dense applications can be built with pure HTML/CSS/JS without unnecessary bundle sizes.
- **Print Styling Precision:** Designing custom `@media print` overrides to separate interactive screen layouts from static print records.
- **Data Export Pipelines:** Implementing browser-native file downloads using Blob structures and modern navigator clipboard writing.

---

## Disclaimer

> [!IMPORTANT]
> **No proprietary laboratory formulations or confidential data are included in this repository. All ingredients, formulations and values are fictional and created exclusively for demonstration purposes.**
