// Function to calculate the tax amount based on the selected province
function calculateTax() {
    const provinceSelect = document.getElementById("province");
    const selectedProvince = provinceSelect.value;
  
    // Define the tax rates for each province (in decimal format)
    const taxRates = {
      AB: 0.13, // Alberta
      BC: 0.15, // British Columbia
      MB: 0.14, // Manitoba
      NB: 0.15, // New Brunswick
      NL: 0.15, // Newfoundland and Labrador
      NS: 0.15, // Nova Scotia
      ON: 0.13, // Ontario
      PE: 0.15, // Prince Edward Island
      QC: 0.14975, // Quebec
      SK: 0.15, // Saskatchewan
    };
  
    // Get the dollar amount and litre amount inputs
    const dollarAmountInput = document.getElementById("amount");
    const litreAmountInput = document.getElementById("litre");
  
    // Parse the input values as numbers
    const dollarAmount = parseFloat(dollarAmountInput.value);
    const litreAmount = parseFloat(litreAmountInput.value);
  
    // Calculate the tax amount
    const taxAmount = (dollarAmount + litreAmount) * taxRates[selectedProvince];
  
    // Display the tax amount in the modal
    document.getElementById("paymentAmount").textContent = "Total: $" + (dollarAmount + taxAmount).toFixed(2);
    document.getElementById("taxAmount").textContent = "Tax: $" + taxAmount.toFixed(2);
  }
  
  // Event listener for the form submission
  document.getElementById("taxForm").addEventListener("submit", function (event) {
   // event.preventDefault(); // Prevent the form from submitting
  
    // Calculate the tax and display it in the modal
    calculateTax();
  
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.show();
  });
  