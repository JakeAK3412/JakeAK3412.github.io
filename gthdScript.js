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

  const vehicleSelect = document.getElementById("vehicleType");
  const selectedVehicle = vehicleSelect.value;
  //console.log(selectedVehicle);

  // Define the litre amounts for each type of vehicle
  const litreAmounts = {
    Car: 50,
    Truck: 80,
    Van: 60,
    SUV: 70,
  };

  // Get the dollars per litre amount input
  const dollarAmountInput = document.getElementById("litre");

  // Parse the input value as a number
  const dollarAmount = parseFloat(dollarAmountInput.value);

  //console.log(dollarAmount);

  // Get the tax rate based on the selected province
  const taxRate = taxRates[selectedProvince];
  //console.log(taxRate);

  // Get the litre amount based on the selected type of vehicle
  const litreAmount = litreAmounts[selectedVehicle];
  //console.log(litreAmount);

  // Calculate the tax amount
  const taxAmount = (dollarAmount * litreAmount * taxRate) / 100;

  // Display the tax amount in the modal
  document.getElementById("paymentAmount").textContent = "Total: $" + (dollarAmount + taxAmount).toFixed(2);
  document.getElementById("taxAmount").textContent = "Tax: $" + taxAmount.toFixed(2);
}

// Event listener for the form submission
document.getElementById("taxForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Calculate the tax and display it in the modal
  calculateTax();

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("modal"));
  modal.show();

  // Display an alert to indicate form submission (can be removed later)
  //alert("Form submitted!");
});
