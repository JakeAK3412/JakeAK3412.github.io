
function calculateCarbonTax2030(selectedProvince, isDiesel){
    if(selectedProvince == "QC"){
      if (isDiesel){
        return 0.125;
      }
      else{
        return 0.099;
      }
    }
    else{
      if(isDiesel){
        return 0.486;
      }
      else{
        return 0.486;
      }
    }
}


function calculateDiesel(dollarAmount, litreAmount, selectedProvince) {
// Define the tax rates for each province (in decimal format)
const taxRates = {
  AB: 0, // Alberta
  BC: 0.15, // British Columbia
  MB: 0.14, // Manitoba
  NB: 0.15, // New Brunswick
  NL: 0.15, // Newfoundland and Labrador
  NS: 0.15, // Nova Scotia
  ON: 0.09, // Ontario
  PE: 0.15, // Prince Edward Island
  QC: 0.14975, // Quebec
  SK: 0.15, // Saskatchewan
};

// Get the tax rate based on the selected province
const taxRate = taxRates[selectedProvince];

// Calculate the tax amount for diesel
const taxAmount = litreAmount * taxRate;

return taxAmount;
}

function calculateRegular(litreAmount, selectedProvince) {
// Define the tax rates for each province (in decimal format)
const taxRates = {
  AB: 0, // Alberta
  BC: 0.12, // British Columbia
  MB: 0.11, // Manitoba
  NB: 0.12, // New Brunswick
  NL: 0.12, // Newfoundland and Labrador
  NS: 0.12, // Nova Scotia
  ON: 0.09, // Ontario
  PE: 0.12, // Prince Edward Island
  QC: 0.11975, // Quebec
  SK: 0.12, // Saskatchewan
};

// Get the tax rate based on the selected province
const taxRate = taxRates[selectedProvince];

// Calculate the tax amount for regular
const taxAmount = litreAmount * taxRate;

return taxAmount;
}

function calculateTax2030() {
const provinceSelect = document.getElementById("province");
const selectedProvince = provinceSelect.value;

const vehicleSelect = document.getElementById("vehicleType");
const selectedVehicle = vehicleSelect.value;

// Define the litre amounts for each type of vehicle
const litreAmounts = {
  Car: 50,
  Truck: 100,
  Van: 60,
  SUV: 70,
};

const dollarAmountInput = document.getElementById("litre");
const dollarAmount = parseFloat(dollarAmountInput.value);

let taxAmount, litreAmount;

if (document.getElementById("diesel").checked) {
  litreAmount = litreAmounts[selectedVehicle];
  taxAmount = calculateDiesel(litreAmount, selectedProvince);
  carbonTaxAmount = calculateCarbonTax2030(selectedProvince, true);
  fedExciseAmount = 0.04;
} else if (document.getElementById("regular").checked) {
  litreAmount = litreAmounts[selectedVehicle];
  taxAmount = calculateRegular(litreAmount, selectedProvince);
  carbonTaxAmount = calculateCarbonTax2030(selectedProvince, false);
  fedExciseAmount = 0.10;
} else {
  litreAmount = litreAmounts[selectedVehicle];
  taxAmount = calculateRegular(litreAmount, selectedProvince);
  carbonTaxAmount = calculateCarbonTax2030(selectedProvince, false);
  fedExciseAmount = 0.10;
}


document.getElementById("taxAmount2030").textContent = "Provincial Excise Tax: $" + taxAmount.toFixed(2);
document.getElementById("carbonTaxAmount2030").textContent = "Carbon Tax: $" + (litreAmount * carbonTaxAmount).toFixed(2);
document.getElementById("fedExciseTax2030").textContent = "Federal Excise Tax: $" + (litreAmounts[selectedVehicle] * fedExciseAmount).toFixed(2);
document.getElementById("paymentAmount2030").textContent = "Total: $" + (dollarAmount + taxAmount).toFixed(2);
}


// Event listener for the form submission
document.getElementById("taxForm").addEventListener("submit", function (event) {
event.preventDefault(); // Prevent the form from submitting

// Calculate the tax and display it in the modal
calculateTax2030();

// Show the modal
// const modal = new bootstrap.Modal(document.getElementById("modal"));
// modal.show();

// Display an alert to indicate form submission (can be removed later)
//alert("Form submitted!");
});
