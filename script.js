/**
 * Culture Media Calculator - Core Logic
 * 
 * This script manages the state and event handling for the plant tissue culture calculator.
 * All formulations, ingredients, and values are fictional and created for portfolio purposes.
 */

// ==========================================================================
// 1. DATA STRUCTURE (Fictional Culture Media Formulations)
// ==========================================================================
const media = {
  mediumA: {
    name: "Culture Medium A",
    ingredients: [
      { name: "Macro Mix Alpha", base: 850 },     // mg/L
      { name: "Macro Mix Beta", base: 400 },      // mg/L
      { name: "Calcium Blend", base: 220 },       // mg/L
      { name: "Micro Complex A", base: 25.4 },    // mg/L
      { name: "Trace Mix", base: 6.2 },           // mg/L
      { name: "Vitamin Solution A", base: 1.5 },  // mg/L
      { name: "Vitamin Solution B", base: 0.8 }   // mg/L
    ]
  },
  mediumB: {
    name: "Culture Medium B",
    ingredients: [
      { name: "Macro Mix Alpha", base: 920 },
      { name: "Macro Mix Beta", base: 350 },
      { name: "Calcium Blend", base: 300 },
      { name: "Micro Complex A", base: 18.2 },
      { name: "Trace Mix", base: 8.5 },
      { name: "Vitamin Solution A", base: 2.0 },
      { name: "Vitamin Solution B", base: 0.5 }
    ]
  },
  mediumC: {
    name: "Culture Medium C",
    ingredients: [
      { name: "Macro Mix Alpha", base: 1100 },
      { name: "Macro Mix Beta", base: 480 },
      { name: "Calcium Blend", base: 180 },
      { name: "Micro Complex A", base: 30.5 },
      { name: "Trace Mix", base: 5.0 },
      { name: "Vitamin Solution A", base: 1.0 },
      { name: "Vitamin Solution B", base: 1.2 }
    ]
  }
};

// State variables to store the currently calculated results
let currentResults = {
  mediumId: "",
  mediumName: "",
  volume: 0,
  calculatedIngredients: []
};

// ==========================================================================
// 2. DOM ELEMENTS SELECTION
// ==========================================================================
const form = document.getElementById("calculatorForm");
const mediumSelect = document.getElementById("mediumSelect");
const volumeInput = document.getElementById("volumeInput");
const validationMessage = document.getElementById("validationMessage");

const resultsSection = document.getElementById("resultsSection");
const formulaMetadata = document.getElementById("formulaMetadata");
const tableBody = document.getElementById("tableBody");

const copyBtn = document.getElementById("copyBtn");
const csvBtn = document.getElementById("csvBtn");
const printBtn = document.getElementById("printBtn");
const copyToast = document.getElementById("copyToast");

// ==========================================================================
// 3. CORE LOGIC FUNCTIONS
// ==========================================================================

/**
 * Calculates the required ingredient amounts based on volume.
 * Formula logic: base_value (mg/L) * volume (L)
 * 
 * @param {string} mediumIdKey - The selected medium identifier (mediumA, mediumB, mediumC)
 * @param {number} volumeLiters - The user input volume in liters
 * @returns {Object} Calculated results object
 */
function calculateFormula(mediumIdKey, volumeLiters) {
  const selectedMedia = media[mediumIdKey];
  
  if (!selectedMedia) return null;

  const calculatedIngredients = selectedMedia.ingredients.map(ing => {
    // Round to 3 decimal places to keep precision but avoid float issues
    const amount = Number((ing.base * volumeLiters).toFixed(3));
    return {
      name: ing.name,
      base: ing.base,
      amount: amount
    };
  });

  return {
    mediumId: mediumIdKey,
    mediumName: selectedMedia.name,
    volume: volumeLiters,
    calculatedIngredients: calculatedIngredients
  };
}

/**
 * Renders the calculated ingredients and metadata into the DOM table.
 * 
 * @param {Object} resultsData - Calculated results object containing ingredients
 */
function renderTable(resultsData) {
  if (!resultsData) return;

  // Set header metadata text
  formulaMetadata.textContent = `${resultsData.mediumName} - ${resultsData.volume} Liters`;

  // Clear previous rows
  tableBody.innerHTML = "";

  // Populate table rows dynamically
  resultsData.calculatedIngredients.forEach(ing => {
    const row = document.createElement("tr");

    // Ingredient Name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = ing.name;
    row.appendChild(nameCell);

    // Base Concentration cell
    const baseCell = document.createElement("td");
    baseCell.className = "text-right numeric-val";
    baseCell.textContent = `${ing.base} mg/L`;
    row.appendChild(baseCell);

    // Calculated Amount cell
    const amountCell = document.createElement("td");
    amountCell.className = "text-right numeric-val";
    amountCell.innerHTML = `<strong>${ing.amount}</strong> mg`;
    row.appendChild(amountCell);

    tableBody.appendChild(row);
  });

  // Reveal the results card with a smooth visual transition
  resultsSection.classList.remove("hidden");
  
  // Force a tiny layout reflow to ensure transitions work smoothly, then trigger animation class
  void resultsSection.offsetWidth; 
  resultsSection.classList.add("fade-in-up");

  // Scroll smooth to the results section on mobile viewports
  resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/**
 * Copies the active formulation sheet data to the user clipboard.
 * Formatted tab-separated value (TSV) structure for direct copy-paste compatibility.
 */
function copyFormula() {
  if (!currentResults.calculatedIngredients.length) return;

  let copyText = `Formulation Sheet: ${currentResults.mediumName} - ${currentResults.volume} Liters\n`;
  copyText += `Fictional laboratory data created for portfolio demonstration purposes.\n\n`;
  copyText += `Ingredient\tBase Concentration\tAmount Required\n`;

  currentResults.calculatedIngredients.forEach(ing => {
    copyText += `${ing.name}\t${ing.base} mg/L\t${ing.amount} mg\n`;
  });

  // Write content to clipboard using modern Navigator API
  navigator.clipboard.writeText(copyText)
    .then(() => {
      showToastNotification();
    })
    .catch(err => {
      console.error("Could not copy formulation text: ", err);
    });
}

/**
 * Exports the active formulation sheet data as a CSV download.
 */
function exportCSV() {
  if (!currentResults.calculatedIngredients.length) return;

  // Build CSV headers and content
  let csvContent = "Ingredient,Base Concentration (mg/L),Amount Required (mg)\r\n";
  
  currentResults.calculatedIngredients.forEach(ing => {
    // Wrap name in quotes to prevent issue with potential comma symbols
    csvContent += `"${ing.name}",${ing.base},${ing.amount}\r\n`;
  });

  // Create Blob and URL
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  // Format dynamic filename based on medium name and volume
  const formattedMediumName = currentResults.mediumName.replace(/\s+/g, "_").toLowerCase();
  const filename = `${formattedMediumName}_${currentResults.volume}L_formula.csv`;

  // Create temporary link and download programmatically
  const tempLink = document.createElement("a");
  tempLink.setAttribute("href", url);
  tempLink.setAttribute("download", filename);
  tempLink.style.visibility = "hidden";
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  
  // Revoke object URL to free resources
  URL.revokeObjectURL(url);
}

/**
 * Dispatches browser window print for printing formatting styles.
 */
function printFormula() {
  window.print();
}

/**
 * Displays temporary toast confirmation overlay for feedback.
 */
function showToastNotification() {
  copyToast.classList.remove("hidden");
  
  // Hide toast after 2.5 seconds
  setTimeout(() => {
    copyToast.classList.add("hidden");
  }, 2500);
}

/**
 * Evaluates inputs and toggles display of visual validation errors.
 * 
 * @returns {boolean} True if form is valid, false otherwise.
 */
function validateForm() {
  const selectedVal = mediumSelect.value;
  const volumeVal = parseFloat(volumeInput.value);

  const isMediumValid = selectedVal !== "";
  const isVolumeValid = !isNaN(volumeVal) && volumeVal > 0;

  if (isMediumValid && isVolumeValid) {
    validationMessage.classList.add("hidden");
    return true;
  } else {
    // Show validation error styling
    validationMessage.classList.remove("hidden");
    return false;
  }
}

// ==========================================================================
// 4. EVENT LISTENERS SETUP
// ==========================================================================

// Handle form submission and trigger calculation cycle
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    const mediumKey = mediumSelect.value;
    const volumeLiters = parseFloat(volumeInput.value);

    // Calculate values
    const results = calculateFormula(mediumKey, volumeLiters);
    
    if (results) {
      currentResults = results;
      renderTable(results);
    }
  }
});

// Clear validation visual markers when user edits inputs
mediumSelect.addEventListener("change", () => {
  if (mediumSelect.value !== "") {
    // If volume is also valid, hide validation error proactively
    const volumeVal = parseFloat(volumeInput.value);
    if (!isNaN(volumeVal) && volumeVal > 0) {
      validationMessage.classList.add("hidden");
    }
  }
});

volumeInput.addEventListener("input", () => {
  const volumeVal = parseFloat(volumeInput.value);
  if (!isNaN(volumeVal) && volumeVal > 0) {
    // If medium is also selected, hide validation error proactively
    if (mediumSelect.value !== "") {
      validationMessage.classList.add("hidden");
    }
  }
});

// Setup actions listeners
copyBtn.addEventListener("click", copyFormula);
csvBtn.addEventListener("click", exportCSV);
printBtn.addEventListener("click", printFormula);
