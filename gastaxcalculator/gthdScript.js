
function calculateCarbonTax(selectedProvince, isDiesel){
      if(selectedProvince == "QC" || selectedProvince == "MTL"){
        if (isDiesel){
          return 0.125;
        }
        else{
          return 0.099;
        }
      }
      else{
        if(isDiesel){
          return 0.174;
        }
        else{
          return 0.143;
        }
      }
}

function calculateSecondCarbonTax(selectedProvince, isDiesel){
    if (selectedProvince == "BC"){
      if (isDiesel){
        return 0.20;
      }
      else{
        return 0.17;
      }
    }

    else if (selectedProvince == "NB"){
      return 0.08;
      }

    else if (selectedProvince == "NL" || selectedProvince == "NS"){
      if (isDiesel){
        return 0.037;
      }
      else{
        return 0.042;
      }
    }

    else if (selectedProvince == "PE"){
      if (isDiesel){
        return 0.04;
      }
      else{
        return 0.033;
      }
    }

    else{
      return 0;
    }


}


function calculateTransitTax(litreAmount, selectedProvince){
  if (selectedProvince == "VAN"){
    return litreAmount * 0.185;
  }
  else if (selectedProvince == "VIC"){
    return litreAmount * 0.085;
  }
  else if (selectedProvince == "MTL"){
    return litreAmount * 0.03;
  }
  else{
    return 0;
  }
}
   
function calculateDiesel(litreAmount, selectedProvince) {
  // Define the tax rates for each province (in decimal format)
  var taxRates = {
    AB: 0, // Alberta
    BC: 0.15, // British Columbia CHANGE FOR VANCOUVER AGAIN
    MB: 0.14, // Manitoba
    NB: 0.155, // New Brunswick
    NL: 0.095, // Newfoundland and Labrador
    NS: 0.154, // Nova Scotia
    ON: 0.09, // Ontario
    PE: 0.142, // Prince Edward Island
    QC: 0.202, // Quebec
    SK: 0.15, // Saskatchewan
    VAN: 0.09, // Vancouver
    VIC: 0.15, // Victoria
    MTL: 0.202, // Montreal
  };

  // Get the tax rate based on the selected province
  var taxRate = taxRates[selectedProvince];

  // Calculate the tax amount for regular
  const taxAmount = litreAmount * taxRate;

  return taxAmount;
}


function calculateRegular(litreAmount, selectedProvince) {
  // Define the tax rates for each province (in decimal format)
  var taxRates = {
    AB: 0, // Alberta
    BC: 0.145, // British Columbia CHANGE FOR VANCOUVER REMEMBER
    MB: 0.14, // Manitoba
    NB: 0.109, // New Brunswick
    NL: 0.075, // Newfoundland and Labrador
    NS: 0.155, // Nova Scotia
    ON: 0.09, // Ontario
    PE: 0.12, // Prince Edward Island
    QC: 0.192, // Quebec
    SK: 0.15, // Saskatchewan
    VAN: 0.085, // Vancouver
    VIC: 0.145, // Victoria
    MTL: 0.192, // Montreal
  };

  // Get the tax rate based on the selected province
  var taxRate = taxRates[selectedProvince];

  // Calculate the tax amount for regular
  const taxAmount = litreAmount * taxRate;

  return taxAmount;
}

function calculateTax() {
  const provinceSelect = document.getElementById("province");
  const selectedProvince = provinceSelect.value;

  const vehicleSelect = document.getElementById("vehicleType");
  const selectedVehicle = vehicleSelect.value;

  // Define the litre amounts for each type of vehicle
  const litreAmounts = {
    Car: 50,
    Truck: 100,
    Van: 70,
    SUV: 70,
  };

  const dollarAmountInput = document.getElementById("litre");
  const dollarAmount = parseFloat(dollarAmountInput.value);

  let taxAmount, litreAmount;

  if (document.getElementById("diesel").checked) {
    console.log("Diesel");
    litreAmount = litreAmounts[selectedVehicle];
    console.log(litreAmount);
    console.log(selectedProvince);
    taxAmount = calculateDiesel(litreAmount, selectedProvince);
    carbonTaxAmount = calculateCarbonTax(selectedProvince, true);
    secondCarbonTaxAmount = calculateSecondCarbonTax(selectedProvince, true);
    fedExciseAmount = 0.04;
  } else if (document.getElementById("regular").checked) {
    console.log("Regular");
    litreAmount = litreAmounts[selectedVehicle];
    taxAmount = calculateRegular(litreAmount, selectedProvince);
    carbonTaxAmount = calculateCarbonTax(selectedProvince, false);
    secondCarbonTaxAmount = calculateSecondCarbonTax(selectedProvince, false);
    fedExciseAmount = 0.10;
  } else {
    console.log("else");
    litreAmount = litreAmounts[selectedVehicle];
    taxAmount = calculateRegular(litreAmount, selectedProvince);
    carbonTaxAmount = calculateCarbonTax(selectedProvince, false);
    fedExciseAmount = 0.10;
  }
  
  const carbonTaxAmount2030 = 0.486;
  
  document.getElementById("taxAmount").textContent = "Provincial Excise Tax: $" + taxAmount.toFixed(2);
  document.getElementById("carbonTaxAmount").textContent = "Carbon Tax: $" + (litreAmount * carbonTaxAmount).toFixed(2);
  document.getElementById("secondCarbonTax").textContent = "Second Carbon Tax: $" + (litreAmount * secondCarbonTaxAmount).toFixed(2);
  document.getElementById("fedExciseTax").textContent = "Federal Excise Tax: $" + (litreAmounts[selectedVehicle] * fedExciseAmount).toFixed(2);
  document.getElementById("transitTax").textContent = "Transit Tax: $" + calculateTransitTax(litreAmount, selectedProvince).toFixed(2);
  document.getElementById("paymentAmount").textContent = "Total: $" + (dollarAmount + taxAmount).toFixed(2);

  document.getElementById("taxAmount2030").textContent = "Provincial Excise Tax: $" + taxAmount.toFixed(2);
  document.getElementById("carbonTaxAmount2030").textContent = "Carbon Tax: $" + (litreAmount * carbonTaxAmount2030).toFixed(2);
  document.getElementById("secondCarbonTax2030").textContent = "Second Carbon Tax: $" + (litreAmount * 0.17).toFixed(2);
  document.getElementById("fedExciseTax2030").textContent = "Federal Excise Tax: $" + (litreAmounts[selectedVehicle] * fedExciseAmount).toFixed(2);
  document.getElementById("transitTax2030").textContent = "Transit Tax: $" + calculateTransitTax(litreAmount, selectedProvince).toFixed(2);
  document.getElementById("paymentAmount2030").textContent = "Total: $" + (dollarAmount + taxAmount).toFixed(2);



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
