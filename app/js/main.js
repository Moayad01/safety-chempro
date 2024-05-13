////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////         navbar when scrolling the color changes         \\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  navbar.classList.toggle("navbar-scrolled", window.scrollY > 0); // Add "navbar-scrolled" class if scrolled down, remove if at top
});


function startServer() {
  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}









////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////         active button in the navbar depending on the page path         \\\\\\\\\\\\
////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname;

  var navItems = document.querySelectorAll('.nav-item:not(.log-in-out-buttons)');
  navItems.forEach(function (item) {
    item.classList.remove('active');
  });

  if (path.includes("index")) {
    var homeNavItem = document.getElementById("homeNavItem");
    if (homeNavItem) {
      homeNavItem.classList.add('active');
    }
  } else if (path.includes("units")) {
    var unitsNavItem = document.getElementById("unitsNavItem");
    if (unitsNavItem) {
      unitsNavItem.classList.add('active');
    }
  } else if (path.includes("about_us")) {
    var aboutUsNavItem = document.getElementById("aboutUsNavItem");
    if (aboutUsNavItem) {
      aboutUsNavItem.classList.add('active');
    }
  } else if (path.includes("post")) {
    var contactExpertNavItem = document.getElementById("contactExpertNavItem");
    if (contactExpertNavItem) {
      contactExpertNavItem.classList.add('active');
    }
  } else if (path.includes("contact_us")) {
    var contactUsNavItem = document.getElementById("contactUsNavItem");
    if (contactUsNavItem) {
      contactUsNavItem.classList.add('active');
    }
  }
});







////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////                 calculator calculation               \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('fInput').addEventListener('input', F_changed);
  document.getElementById('pInput').addEventListener('input', P_changed);
  document.getElementById('tInput').addEventListener('input', T_changed);
  document.getElementById('dInput').addEventListener('input', D_changed);
  document.getElementById('bInput').addEventListener('input', B_changed);
  document.getElementById('vInput').addEventListener('input', V_changed);
  document.getElementById('rInput').addEventListener('input', R_changed);
  let lastUpdated = ''; // Tracks the last updated field

  //document.getElementById('xbInput').addEventListener('input', XB_changed); 


  function F_changed() {
    let F = parseFloat(document.getElementById('fInput').value);
    let D = parseFloat(document.getElementById('dInput').value);
    let B = parseFloat(document.getElementById('bInput').value); // Correctly retrieve B
    let B_input = document.getElementById('bInput'); // Reference to B input field
    let D_input = document.getElementById('dInput'); // Reference to D input field
    let XB_input = document.getElementById('xbInput'); // Reference to XB input field
    let R_input = document.getElementById('rInput'); // 
    let V_input = document.getElementById('vInput'); // 
    let V = parseFloat(document.getElementById('vInput').value);
    let R = parseFloat(document.getElementById('rInput').value);



    if (F == 0) {

    } else if (!isNaN(D) && !isNaN(F) && D != 0) {
      let B_result = F - D;
      let XB_result = (0.85 * F - 0.99 * D) / B_result;
      B_input.value = B_result.toFixed(2);
      XB_input.value = XB_result.toFixed(2);
    } else if (!isNaN(B) && !isNaN(F) && B != 0) {
      let D_result = F - B;
      let XB_result = (0.85 * F - 0.99 * D_result) / B;
      D_input.value = D_result.toFixed(2);
      XB_input.value = XB_result.toFixed(2);
    }

    if (!isNaN(D)) {
      if (!isNaN(V)) {
        _result = ((V / D) - 1);
        R_input.value = _result.toFixed(2);
      } else if (!isNaN(R)) {
        _result = D * (1 + R);
        V_input.value = _result.toFixed(2);
      }
    }




  }

  function D_changed() {
    let F = parseFloat(document.getElementById('fInput').value);
    let D = parseFloat(document.getElementById('dInput').value);
    let B = parseFloat(document.getElementById('bInput').value); // Correctly retrieve B
    let B_input = document.getElementById('bInput'); // Reference to B input field
    let D_input = document.getElementById('dInput'); // Reference to D input field
    let XB_input = document.getElementById('xbInput'); // Reference to XB input field
    let F_input = document.getElementById('fInput'); // Reference to F input field
    let R_input = document.getElementById('rInput'); // 
    let V_input = document.getElementById('vInput'); // 
    let V = parseFloat(document.getElementById('vInput').value);
    let R = parseFloat(document.getElementById('rInput').value);

    lastUpdated = 'D';
    calculateVandR();


    if (D == 0) {

    } else if (!isNaN(F) && !isNaN(D) && F != 0) {
      let B_result = F - D;
      let XB_result = (0.85 * F - 0.99 * D) / B_result;
      B_input.value = B_result.toFixed(2);
      XB_input.value = XB_result.toFixed(2);
    } else if (!isNaN(B) && !isNaN(D) && B != 0) {
      let F_result = D + B;
      let XB_result = (0.85 * F_result - 0.99 * D) / B;
      F_input.value = F_result.toFixed(2);
      XB_input.value = XB_result.toFixed(2);
    }

  }

  function B_changed() {
    let F = parseFloat(document.getElementById('fInput').value);
    let D = parseFloat(document.getElementById('dInput').value);
    let B = parseFloat(document.getElementById('bInput').value); // Correctly retrieve B
    let B_input = document.getElementById('bInput'); // Reference to B input field
    let D_input = document.getElementById('dInput'); // Reference to D input field
    let XB_input = document.getElementById('xbInput'); // Reference to XB input field
    let F_input = document.getElementById('fInput'); // Reference to F input field
    let R_input = document.getElementById('rInput'); // 
    let V_input = document.getElementById('vInput'); // 
    let V = parseFloat(document.getElementById('vInput').value);
    let R = parseFloat(document.getElementById('rInput').value);


    if (B == 0) {

    } else if (!isNaN(F) && !isNaN(B) && F != 0) {
      let D_result = F - B;
      let XB_result = (0.85 * F - 0.99 * D_result) / B;
      D_input.value = D_result.toFixed(2);
      XB_input.value = XB_result.toFixed(2);
    } else if (!isNaN(B) && !isNaN(D) && B != 0) {
      let F_result = D + B;
      let XB_result = (0.85 * F_result - 0.99 * D) / B;
      F_input.value = F_result.toFixed(2);
      XB_input.value = XB_result.toFixed(2);
    }

    if (!isNaN(D)) {
      if (!isNaN(V)) {
        _result = ((V / D) - 1);
        R_input.value = _result.toFixed(2);
      } else if (!isNaN(R)) {
        _result = D * (1 + R);
        V_input.value = _result.toFixed(2);
      }
    }

  }

  function P_changed() {
    let P = parseFloat(document.getElementById('pInput').value);
    let T_input = document.getElementById('tInput'); // Reference to F input field

    _result = 0.0013 * (P ** 3) - 0.135 * (P ** 2) + 5.7993 * P - 97.581
    T_input.value = _result.toFixed(2);

  }

  function T_changed() {
    let T = parseFloat(document.getElementById('tInput').value);
    let P_input = document.getElementById('pInput'); // Reference to F input field

    _result = 2 * (10 ** -5) * (T ** 3) + 0.0066 * (T ** 2) + 0.8594 * T + 38.648
    P_input.value = _result.toFixed(2);

  }



  function calculateVandR() {
    let D = parseFloat(document.getElementById('dInput').value);
    let V = parseFloat(document.getElementById('vInput').value);
    let R = parseFloat(document.getElementById('rInput').value);
    let R_input = document.getElementById('rInput');
    let V_input = document.getElementById('vInput');

    // Only calculate R if D or V was last updated and we have the necessary values
    if ((lastUpdated === 'D' || lastUpdated === 'V') && !isNaN(D) && !isNaN(V)) {
      let resultR = ((V / D) - 1);
      R_input.value = resultR.toFixed(2);
    }

    // Only calculate V if D or R was last updated and we have the necessary values
    if ((lastUpdated === 'D' || lastUpdated === 'R') && !isNaN(D) && !isNaN(R)) {
      let resultV = D * (1 + R);
      V_input.value = resultV.toFixed(2);
    }
  }


  function V_changed() {
    lastUpdated = 'V';
    calculateVandR(); // Recalculate R based on V, but only if D was last updated
  }

  function R_changed() {
    lastUpdated = 'R';
    calculateVandR(); // Recalculate V based on R, but only if D was last updated
  }



  // function XB_changed() {
  //   let F = parseFloat(document.getElementById('fInput').value);
  //   let D = parseFloat(document.getElementById('dInput').value);
  //   let B = parseFloat(document.getElementById('bInput').value); // Correctly retrieve B
  //   let B_input = document.getElementById('bInput'); // Reference to B input field
  //   let D_input = document.getElementById('dInput'); // Reference to D input field
  //   let XB_input = document.getElementById('xbInput'); // Reference to XB input field
  //   let F_input = document.getElementById('fInput'); // Reference to F input field


  //   if (B == 0){

  //   } else if (!isNaN(F) && !isNaN(B) && F != 0) {
  //       let D_result = F - B;
  //       let XB_result = (0.85 * F - 0.99 * D_result) / B;
  //       D_input.value = D_result.toFixed(2);
  //       XB_input.value = XB_result.toFixed(2);
  //   } else if (!isNaN(B) && !isNaN(D) && B != 0) {
  //       let F_result = D + B;
  //       let XB_result = (0.85 * F_result - 0.99 * D) / B;
  //       F_input.value = F_result.toFixed(2);
  //       XB_input.value = XB_result.toFixed(2);
  //   }
  // }


});


////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////                 buttons trsnformation                \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("calculator-button").addEventListener("click", function () {
    console.log("Calculator button clicked");
    window.location.href = "../../calculator.html";
  });
});





////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////        clear inputs in c2 sepration system           \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function clearC2CalculatorInputs() {
  // Select all input elements with the class 'c2-calculator-input'
  const calculatorInputs = document.querySelectorAll('.c2-calculator-input');

  // Iterate over each input and set its value to an empty string
  calculatorInputs.forEach(input => {
    input.value = '';
  });
}

// Get the 'Clear All' button by its ID
const C2clearButton = document.getElementById('C2clearButton');

// Add an event listener to the 'Clear All' button to clear specific inputs when clicked
C2clearButton.addEventListener('click', clearC2CalculatorInputs);




////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////           check c2 sepration system safety           \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// document.getElementById('C2CheckSafety').addEventListener('click', function () {
//   // Retrieve input values
//   const fInput = parseFloat(document.getElementById('fInput').value);
//   const pInput = parseFloat(document.getElementById('pInput').value);
//   const tInput = parseFloat(document.getElementById('tInput').value);
//   const dInput = parseFloat(document.getElementById('dInput').value);
//   const bInput = parseFloat(document.getElementById('bInput').value);
//   const xbInput = parseFloat(document.getElementById('xbInput').value);
//   const ufloodInput = parseFloat(document.getElementById('ufloodInput').value);
//   const utopInput = parseFloat(document.getElementById('utopInput').value);
//   const rInput = parseFloat(document.getElementById('rInput').value);
//   const ptowerInput = parseFloat(document.getElementById('ptowerInput').value);
//   const vInput = parseFloat(document.getElementById('vInput').value);

//   // Check for negative values
//   const inputs = [fInput, pInput, tInput, dInput, bInput, xbInput, ufloodInput, utopInput, rInput, ptowerInput, vInput];
//   if (inputs.some(input => input < 0)) {
//     alert('You cannot proceed since there is a negative value in your calculations.');
//     return;
//   }

//   // Check XB value range
//   if (xbInput < 0 || xbInput > 0.85) {
//     alert('The value of XB should be between 0 - 0.85.');
//     return;
//   }

//   // Check P and Ptower value range
//   if (pInput < 1 || pInput > 50 || ptowerInput < 1 || ptowerInput > 50) {
//     alert('The pressure should be in range 1-50.');
//     return;
//   }

//   // Check if P is less than Ptower
//   if (pInput < ptowerInput) {
//     alert('The value of pressure for the pump should be greater than the value of pressure for the tower.');
//     return;
//   }

//   // Check if U top >= U flood
//   if (utopInput >= ufloodInput) {
//     alert('The tower will flood; the value of U top should be less than the value of U flood.');
//     return;
//   }

//   // All checks passed
//   alert('You have passed successfully.');
// });

document.getElementById('C2CheckSafety').addEventListener('click', function () {
  // Retrieve input values
  const fInput = parseFloat(document.getElementById('fInput').value);
  const pInput = parseFloat(document.getElementById('pInput').value);
  const tInput = parseFloat(document.getElementById('tInput').value);
  const dInput = parseFloat(document.getElementById('dInput').value);
  const bInput = parseFloat(document.getElementById('bInput').value);
  const xbInput = parseFloat(document.getElementById('xbInput').value);
  const ufloodInput = parseFloat(document.getElementById('ufloodInput').value);
  const utopInput = parseFloat(document.getElementById('utopInput').value);
  const rInput = parseFloat(document.getElementById('rInput').value);
  const ptowerInput = parseFloat(document.getElementById('ptowerInput').value);
  const vInput = parseFloat(document.getElementById('vInput').value);

  let message = '';
  let isError = false;

  // Check for negative values
  if ([fInput, pInput, tInput, dInput, bInput, xbInput, ufloodInput, utopInput, rInput, ptowerInput, vInput].some(input => input < 0)) {
      message = 'You cannot proceed since there is a negative value in your calculations.';
      isError = true;
  }
  // Check XB value range
  else if (xbInput < 0 || xbInput > 0.85) {
      message = 'The value of XB should be between 0 - 0.85.';
      isError = true;
  }
  // Check P and Ptower value range
  else if (pInput < 1 || pInput > 50 || ptowerInput < 1 || ptowerInput > 50) {
      message = 'The pressure should be in range 1-50.';
      isError = true;
  }
  // Check if P is less than Ptower
  else if (pInput < ptowerInput) {
      message = 'The value of pressure for the pump should be greater than the value of pressure for the tower.';
      isError = true;
  }
  // Check if U top >= U flood
  else if (utopInput >= ufloodInput) {
      message = 'The tower will flood; the value of U top should be less than the value of U flood.';
      isError = true;
  }
  // All checks passed
  else {
      message = 'You have passed successfully.';
      isError = false;
  }

  // Display the modal
  openModal(message, isError);
});

// Function to open modal with specific content and color
function openModal(message, isError) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message;
  modalMessage.style.color = isError ? 'red' : 'green';
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}







function navigateToPump() {
  window.location.href = 'pump.html';
}

function navigateToCondenser() {
  window.location.href = 'condenser.html';
}





















































document.getElementById('ptowerInput').addEventListener('input', function () {
  const inputField = document.getElementById('ptowerInput');
  const errorContainer = document.getElementById('ptowerError');
  let value = parseFloat(inputField.value).toFixed(1); // Convert to float with 1 decimal
  value = parseFloat(value); // Convert back to number for comparison
  let Utop_input = document.getElementById('utopInput');
  let Uflood_input = document.getElementById('ufloodInput');
  let P_input = document.getElementById('pInput');
  let D = parseFloat(document.getElementById('dInput').value);
  let R = parseFloat(document.getElementById('rInput').value);
  let F = parseFloat(document.getElementById('fInput').value);

  // Define your data
  const data = [
    { p: 1.0, DL: 20.246, ST: 16.371, DV: 0.073519 },
    { p: 1.1, DL: 20.163, ST: 16.095, DV: 0.080291 },
    { p: 1.2, DL: 20.085, ST: 15.839, DV: 0.08702 },
    { p: 1.3, DL: 20.011, ST: 15.599, DV: 0.093712 },
    { p: 1.4, DL: 19.942, ST: 15.374, DV: 0.10037 },
    { p: 1.5, DL: 19.876, ST: 15.161, DV: 0.107 },
    { p: 1.6, DL: 19.812, ST: 14.959, DV: 0.1136 },
    { p: 1.7, DL: 19.752, ST: 14.767, DV: 0.12017 },
    { p: 1.8, DL: 19.694, ST: 14.584, DV: 0.12672 },
    { p: 1.9, DL: 19.638, ST: 14.409, DV: 0.13325 },
    { p: 2.0, DL: 19.584, ST: 14.241, DV: 0.13977 },
    { p: 2.1, DL: 19.532, ST: 14.079, DV: 0.14626 },
    { p: 2.2, DL: 19.482, ST: 13.923, DV: 0.15274 },
    { p: 2.3, DL: 19.433, ST: 13.773, DV: 0.1592 },
    { p: 2.4, DL: 19.386, ST: 13.628, DV: 0.16565 },
    { p: 2.5, DL: 19.339, ST: 13.488, DV: 0.17209 },
    { p: 2.6, DL: 19.295, ST: 13.352, DV: 0.17852 },
    { p: 2.7, DL: 19.251, ST: 13.22, DV: 0.18493 },
    { p: 2.8, DL: 19.208, ST: 13.092, DV: 0.19134 },
    { p: 2.9, DL: 19.166, ST: 12.968, DV: 0.19773 },
    { p: 3.0, DL: 19.125, ST: 12.847, DV: 0.20412 },
    { p: 3.1, DL: 19.085, ST: 12.729, DV: 0.2105 },
    { p: 3.2, DL: 19.046, ST: 12.614, DV: 0.21687 },
    { p: 3.3, DL: 19.008, ST: 12.502, DV: 0.22324 },
    { p: 3.4, DL: 18.97, ST: 12.392, DV: 0.2296 },
    { p: 3.5, DL: 18.934, ST: 12.285, DV: 0.23596 },
    { p: 3.6, DL: 18.897, ST: 12.181, DV: 0.24231 },
    { p: 3.7, DL: 18.862, ST: 12.078, DV: 0.24865 },
    { p: 3.8, DL: 18.827, ST: 11.978, DV: 0.25499 },
    { p: 3.9, DL: 18.792, ST: 11.88, DV: 0.26133 },
    { p: 4.0, DL: 18.758, ST: 11.784, DV: 0.26766 },
    { p: 4.1, DL: 18.725, ST: 11.69, DV: 0.27399 },
    { p: 4.2, DL: 18.692, ST: 11.597, DV: 0.28032 },
    { p: 4.3, DL: 18.66, ST: 11.507, DV: 0.28665 },
    { p: 4.4, DL: 18.628, ST: 11.418, DV: 0.29297 },
    { p: 4.5, DL: 18.596, ST: 11.33, DV: 0.2993 },
    { p: 4.6, DL: 18.565, ST: 11.244, DV: 0.30562 },
    { p: 4.7, DL: 18.535, ST: 11.16, DV: 0.31194 },
    { p: 4.8, DL: 18.505, ST: 11.077, DV: 0.31826 },
    { p: 4.9, DL: 18.475, ST: 10.995, DV: 0.32458 },
    { p: 5.0, DL: 18.445, ST: 10.915, DV: 0.3309 },
    { p: 5.0, DL: 18.445, ST: 10.915, DV: 0.3309 },
    { p: 5.1, DL: 18.416, ST: 10.836, DV: 0.33722 },
    { p: 5.2, DL: 18.387, ST: 10.758, DV: 0.34354 },
    { p: 5.3, DL: 18.359, ST: 10.681, DV: 0.34985 },
    { p: 5.4, DL: 18.331, ST: 10.605, DV: 0.35617 },
    { p: 5.5, DL: 18.303, ST: 10.531, DV: 0.3625 },
    { p: 5.6, DL: 18.275, ST: 10.457, DV: 0.36882 },
    { p: 5.7, DL: 18.248, ST: 10.385, DV: 0.37514 },
    { p: 5.8, DL: 18.221, ST: 10.314, DV: 0.38147 },
    { p: 5.9, DL: 18.194, ST: 10.243, DV: 0.38779 },
    { p: 6.0, DL: 18.168, ST: 10.174, DV: 0.39412 },
    { p: 6.1, DL: 18.142, ST: 10.105, DV: 0.40045 },
    { p: 6.2, DL: 18.116, ST: 10.038, DV: 0.40678 },
    { p: 6.3, DL: 18.09, ST: 9.9707, DV: 0.41312 },
    { p: 6.4, DL: 18.064, ST: 9.9047, DV: 0.41945 },
    { p: 6.5, DL: 18.039, ST: 9.8396, DV: 0.42579 },
    { p: 6.6, DL: 18.014, ST: 9.7752, DV: 0.43214 },
    { p: 6.7, DL: 17.989, ST: 9.7116, DV: 0.43848 },
    { p: 6.8, DL: 17.965, ST: 9.6488, DV: 0.44483 },
    { p: 6.9, DL: 17.94, ST: 9.5867, DV: 0.45118 },
    { p: 7.0, DL: 17.916, ST: 9.5253, DV: 0.45753 },
    { p: 7.1, DL: 17.892, ST: 9.4646, DV: 0.46389 },
    { p: 7.2, DL: 17.868, ST: 9.4045, DV: 0.47025 },
    { p: 7.3, DL: 17.844, ST: 9.3452, DV: 0.47662 },
    { p: 7.4, DL: 17.821, ST: 9.2865, DV: 0.48299 },
    { p: 7.5, DL: 17.797, ST: 9.2284, DV: 0.48936 },
    { p: 7.6, DL: 17.774, ST: 9.1709, DV: 0.49574 },
    { p: 7.7, DL: 17.751, ST: 9.114, DV: 0.50212 },
    { p: 7.8, DL: 17.728, ST: 9.0577, DV: 0.5085 },
    { p: 7.9, DL: 17.706, ST: 9.002, DV: 0.51489 },
    { p: 8.0, DL: 17.683, ST: 8.9469, DV: 0.52129 },
    { p: 8.1, DL: 17.661, ST: 8.8923, DV: 0.52769 },
    { p: 8.2, DL: 17.639, ST: 8.8382, DV: 0.53409 },
    { p: 8.3, DL: 17.616, ST: 8.7847, DV: 0.5405 },
    { p: 8.4, DL: 17.595, ST: 8.7317, DV: 0.54691 },
    { p: 8.5, DL: 17.573, ST: 8.6792, DV: 0.55333 },
    { p: 8.6, DL: 17.551, ST: 8.6271, DV: 0.55976 },
    { p: 8.7, DL: 17.529, ST: 8.5756, DV: 0.56619 },
    { p: 8.8, DL: 17.508, ST: 8.5245, DV: 0.57262 },
    { p: 8.9, DL: 17.487, ST: 8.4739, DV: 0.57906 },
    { p: 9.0, DL: 17.466, ST: 8.4238, DV: 0.5855 },
    { p: 9.1, DL: 17.444, ST: 8.3741, DV: 0.59195 },
    { p: 9.2, DL: 17.424, ST: 8.3248, DV: 0.59841 },
    { p: 9.3, DL: 17.403, ST: 8.276, DV: 0.60487 },
    { p: 9.4, DL: 17.382, ST: 8.2276, DV: 0.61134 },
    { p: 9.5, DL: 17.361, ST: 8.1796, DV: 0.61782 },
    { p: 9.6, DL: 17.341, ST: 8.132, DV: 0.6243 },
    { p: 9.7, DL: 17.32, ST: 8.0848, DV: 0.63078 },
    { p: 9.8, DL: 17.3, ST: 8.038, DV: 0.63728 },
    { p: 9.9, DL: 17.28, ST: 7.9916, DV: 0.64377 },
    { p: 10.0, DL: 17.26, ST: 7.9456, DV: 0.65028 },
    { p: 10.1, DL: 17.24, ST: 7.8999, DV: 0.65679 },
    { p: 10.2, DL: 17.22, ST: 7.8546, DV: 0.66331 },
    { p: 10.3, DL: 17.2, ST: 7.8097, DV: 0.66983 },
    { p: 10.4, DL: 17.18, ST: 7.7651, DV: 0.67637 },
    { p: 10.5, DL: 17.161, ST: 7.7209, DV: 0.68291 },
    { p: 10.6, DL: 17.141, ST: 7.677, DV: 0.68945 },
    { p: 10.7, DL: 17.122, ST: 7.6334, DV: 0.696 },
    { p: 10.8, DL: 17.102, ST: 7.5902, DV: 0.70256 },
    { p: 10.9, DL: 17.083, ST: 7.5473, DV: 0.70913 },
    { p: 11.0, DL: 17.064, ST: 7.5047, DV: 0.7157 },
    { p: 11.1, DL: 17.045, ST: 7.4624, DV: 0.72228 },
    { p: 11.2, DL: 17.026, ST: 7.4204, DV: 0.72887 },
    { p: 11.3, DL: 17.007, ST: 7.3788, DV: 0.73547 },
    { p: 11.4, DL: 16.988, ST: 7.3374, DV: 0.74207 },
    { p: 11.5, DL: 16.969, ST: 7.2963, DV: 0.74868 },
    { p: 11.6, DL: 16.95, ST: 7.2556, DV: 0.7553 },
    { p: 11.7, DL: 16.932, ST: 7.2151, DV: 0.76193 },
    { p: 11.8, DL: 16.913, ST: 7.1749, DV: 0.76856 },
    { p: 11.9, DL: 16.894, ST: 7.1349, DV: 0.77521 },
    { p: 12.0, DL: 16.876, ST: 7.0953, DV: 0.78186 },
    { p: 12.1, DL: 16.858, ST: 7.0559, DV: 0.78851 },
    { p: 12.2, DL: 16.839, ST: 7.0168, DV: 0.79518 },
    { p: 12.3, DL: 16.821, ST: 6.9779, DV: 0.80186 },
    { p: 12.4, DL: 16.803, ST: 6.9393, DV: 0.80854 },
    { p: 12.5, DL: 16.785, ST: 6.901, DV: 0.81523 },
    { p: 12.6, DL: 16.767, ST: 6.8629, DV: 0.82193 },
    { p: 12.7, DL: 16.749, ST: 6.8251, DV: 0.82864 },
    { p: 12.8, DL: 16.731, ST: 6.7875, DV: 0.83535 },
    { p: 12.9, DL: 16.713, ST: 6.7501, DV: 0.84208 },
    { p: 13.0, DL: 16.695, ST: 6.713, DV: 0.84881 },
    { p: 13.1, DL: 16.677, ST: 6.6761, DV: 0.85556 },
    { p: 13.2, DL: 16.659, ST: 6.6395, DV: 0.86231 },
    { p: 13.3, DL: 16.642, ST: 6.6031, DV: 0.86907 },
    { p: 13.4, DL: 16.624, ST: 6.5669, DV: 0.87584 },
    { p: 13.5, DL: 16.606, ST: 6.5309, DV: 0.88262 },
    { p: 13.6, DL: 16.589, ST: 6.4951, DV: 0.88941 },
    { p: 13.7, DL: 16.571, ST: 6.4596, DV: 0.8962 },
    { p: 13.8, DL: 16.554, ST: 6.4243, DV: 0.90301 },
    { p: 13.9, DL: 16.537, ST: 6.3892, DV: 0.90983 },
    { p: 14.0, DL: 16.519, ST: 6.3543, DV: 0.91665 },
    { p: 14.1, DL: 16.502, ST: 6.3196, DV: 0.92349 },
    { p: 14.2, DL: 16.485, ST: 6.2851, DV: 0.93033 },
    { p: 14.3, DL: 16.468, ST: 6.2509, DV: 0.93718 },
    { p: 14.4, DL: 16.451, ST: 6.2168, DV: 0.94405 },
    { p: 14.5, DL: 16.434, ST: 6.1829, DV: 0.95092 },
    { p: 14.6, DL: 16.417, ST: 6.1492, DV: 0.95781 },
    { p: 14.7, DL: 16.4, ST: 6.1157, DV: 0.9647 },
    { p: 14.8, DL: 16.383, ST: 6.0824, DV: 0.9716 },
    { p: 14.9, DL: 16.366, ST: 6.0493, DV: 0.97852 },
    { p: 15.0, DL: 16.349, ST: 6.0164, DV: 0.98544 },
    { p: 15.1, DL: 16.332, ST: 5.9836, DV: 0.99237 },
    { p: 15.2, DL: 16.315, ST: 5.9511, DV: 0.99932 },
    { p: 15.3, DL: 16.298, ST: 5.9187, DV: 1.0063 },
    { p: 15.4, DL: 16.282, ST: 5.8865, DV: 1.0132 },
    { p: 15.5, DL: 16.265, ST: 5.8545, DV: 1.0202 },
    { p: 15.6, DL: 16.248, ST: 5.8226, DV: 1.0272 },
    { p: 15.7, DL: 16.232, ST: 5.7909, DV: 1.0342 },
    { p: 15.8, DL: 16.215, ST: 5.7594, DV: 1.0412 },
    { p: 15.9, DL: 16.199, ST: 5.7281, DV: 1.0482 },
    { p: 16.0, DL: 16.182, ST: 5.6969, DV: 1.0553 },
    { p: 16.1, DL: 16.166, ST: 5.6659, DV: 1.0623 },
    { p: 16.2, DL: 16.149, ST: 5.635, DV: 1.0693 },
    { p: 16.3, DL: 16.133, ST: 5.6043, DV: 1.0764 },
    { p: 16.4, DL: 16.117, ST: 5.5738, DV: 1.0835 },
    { p: 16.5, DL: 16.1, ST: 5.5435, DV: 1.0906 },
    { p: 16.6, DL: 16.084, ST: 5.5132, DV: 1.0977 },
    { p: 16.7, DL: 16.068, ST: 5.4832, DV: 1.1048 },
    { p: 16.8, DL: 16.052, ST: 5.4533, DV: 1.1119 },
    { p: 16.9, DL: 16.035, ST: 5.4235, DV: 1.119 },
    { p: 17.0, DL: 16.019, ST: 5.3939, DV: 1.1262 },
    { p: 17.1, DL: 16.003, ST: 5.3645, DV: 1.1333 },
    { p: 17.2, DL: 15.987, ST: 5.3352, DV: 1.1405 },
    { p: 17.3, DL: 15.971, ST: 5.306, DV: 1.1477 },
    { p: 17.4, DL: 15.955, ST: 5.277, DV: 1.1549 },
    { p: 17.5, DL: 15.939, ST: 5.2481, DV: 1.1621 },
    { p: 17.6, DL: 15.923, ST: 5.2194, DV: 1.1693 },
    { p: 17.7, DL: 15.907, ST: 5.1908, DV: 1.1765 },
    { p: 17.8, DL: 15.891, ST: 5.1624, DV: 1.1837 },
    { p: 17.9, DL: 15.875, ST: 5.1341, DV: 1.191 },
    { p: 18.0, DL: 15.859, ST: 5.1059, DV: 1.1982 },
    { p: 18.1, DL: 15.843, ST: 5.0778, DV: 1.2055 },
    { p: 18.2, DL: 15.827, ST: 5.0499, DV: 1.2128 },
    { p: 18.3, DL: 15.812, ST: 5.0222, DV: 1.2201 },
    { p: 18.4, DL: 15.796, ST: 4.9945, DV: 1.2274 },
    { p: 18.5, DL: 15.78, ST: 4.967, DV: 1.2348 },
    { p: 18.6, DL: 15.764, ST: 4.9396, DV: 1.2421 },
    { p: 18.7, DL: 15.749, ST: 4.9124, DV: 1.2494 },
    { p: 18.8, DL: 15.733, ST: 4.8852, DV: 1.2568 },
    { p: 18.9, DL: 15.717, ST: 4.8582, DV: 1.2642 },
    { p: 19.0, DL: 15.701, ST: 4.8314, DV: 1.2716 },
    { p: 19.1, DL: 15.686, ST: 4.8046, DV: 1.279 },
    { p: 19.2, DL: 15.67, ST: 4.778, DV: 1.2864 },
    { p: 19.3, DL: 15.655, ST: 4.7515, DV: 1.2938 },
    { p: 19.4, DL: 15.639, ST: 4.7251, DV: 1.3013 },
    { p: 19.5, DL: 15.623, ST: 4.6988, DV: 1.3088 },
    { p: 19.6, DL: 15.608, ST: 4.6727, DV: 1.3162 },
    { p: 19.7, DL: 15.592, ST: 4.6466, DV: 1.3237 },
    { p: 19.8, DL: 15.577, ST: 4.6207, DV: 1.3312 },
    { p: 19.9, DL: 15.561, ST: 4.5949, DV: 1.3387 },
    { p: 20.0, DL: 15.546, ST: 4.5692, DV: 1.3463 },
    { p: 20.1, DL: 15.53, ST: 4.5437, DV: 1.3538 },
    { p: 20.2, DL: 15.515, ST: 4.5182, DV: 1.3614 },
    { p: 20.3, DL: 15.5, ST: 4.4929, DV: 1.3689 },
    { p: 20.4, DL: 15.484, ST: 4.4676, DV: 1.3765 },
    { p: 20.5, DL: 15.469, ST: 4.4425, DV: 1.3841 },
    { p: 20.6, DL: 15.453, ST: 4.4175, DV: 1.3918 },
    { p: 20.7, DL: 15.438, ST: 4.3926, DV: 1.3994 },
    { p: 20.8, DL: 15.423, ST: 4.3678, DV: 1.407 },
    { p: 20.9, DL: 15.407, ST: 4.3431, DV: 1.4147 },
    { p: 21.0, DL: 15.392, ST: 4.3185, DV: 1.4224 },
    { p: 21.1, DL: 15.377, ST: 4.294, DV: 1.4301 },
    { p: 21.2, DL: 15.361, ST: 4.2696, DV: 1.4378 },
    { p: 21.3, DL: 15.346, ST: 4.2454, DV: 1.4455 },
    { p: 21.4, DL: 15.331, ST: 4.2212, DV: 1.4532 },
    { p: 21.5, DL: 15.316, ST: 4.1971, DV: 1.461 },
    { p: 21.6, DL: 15.3, ST: 4.1731, DV: 1.4688 },
    { p: 21.7, DL: 15.285, ST: 4.1493, DV: 1.4765 },
    { p: 21.8, DL: 15.27, ST: 4.1255, DV: 1.4844 },
    { p: 21.9, DL: 15.255, ST: 4.1018, DV: 1.4922 },
    { p: 22.0, DL: 15.239, ST: 4.0782, DV: 1.5 },
    { p: 22.1, DL: 15.224, ST: 4.0548, DV: 1.5079 },
    { p: 22.2, DL: 15.209, ST: 4.0314, DV: 1.5157 },
    { p: 22.3, DL: 15.194, ST: 4.0081, DV: 1.5236 },
    { p: 22.4, DL: 15.179, ST: 3.9849, DV: 1.5315 },
    { p: 22.5, DL: 15.164, ST: 3.9618, DV: 1.5394 },
    { p: 22.6, DL: 15.148, ST: 3.9388, DV: 1.5474 },
    { p: 22.7, DL: 15.133, ST: 3.9159, DV: 1.5553 },
    { p: 22.8, DL: 15.118, ST: 3.8931, DV: 1.5633 },
    { p: 22.9, DL: 15.103, ST: 3.8704, DV: 1.5713 },
    { p: 23.0, DL: 15.088, ST: 3.8477, DV: 1.5793 },
    { p: 23.1, DL: 15.073, ST: 3.8252, DV: 1.5873 },
    { p: 23.2, DL: 15.058, ST: 3.8027, DV: 1.5953 },
    { p: 23.3, DL: 15.043, ST: 3.7804, DV: 1.6034 },
    { p: 23.4, DL: 15.028, ST: 3.7581, DV: 1.6114 },
    { p: 23.5, DL: 15.012, ST: 3.7359, DV: 1.6195 },
    { p: 23.6, DL: 14.997, ST: 3.7138, DV: 1.6276 },
    { p: 23.7, DL: 14.982, ST: 3.6918, DV: 1.6358 },
    { p: 23.8, DL: 14.967, ST: 3.6699, DV: 1.6439 },
    { p: 23.9, DL: 14.952, ST: 3.648, DV: 1.6521 },
    { p: 24.0, DL: 14.937, ST: 3.6263, DV: 1.6603 },
    { p: 24.1, DL: 14.922, ST: 3.6046, DV: 1.6685 },
    { p: 24.2, DL: 14.907, ST: 3.583, DV: 1.6767 },
    { p: 24.3, DL: 14.892, ST: 3.5615, DV: 1.6849 },
    { p: 24.4, DL: 14.877, ST: 3.5401, DV: 1.6932 },
    { p: 24.5, DL: 14.862, ST: 3.5188, DV: 1.7014 },
    { p: 24.6, DL: 14.847, ST: 3.4975, DV: 1.7097 },
    { p: 24.7, DL: 14.832, ST: 3.4763, DV: 1.718 },
    { p: 24.8, DL: 14.817, ST: 3.4553, DV: 1.7264 },
    { p: 24.9, DL: 14.802, ST: 3.4342, DV: 1.7347 },
    { p: 25.0, DL: 14.787, ST: 3.4133, DV: 1.7431 },
    { p: 25.1, DL: 14.772, ST: 3.3925, DV: 1.7515 },
    { p: 25.2, DL: 14.757, ST: 3.3717, DV: 1.7599 },
    { p: 25.3, DL: 14.742, ST: 3.351, DV: 1.7683 },
    { p: 25.4, DL: 14.727, ST: 3.3304, DV: 1.7768 },
    { p: 25.5, DL: 14.712, ST: 3.3098, DV: 1.7853 },
    { p: 25.6, DL: 14.697, ST: 3.2894, DV: 1.7938 },
    { p: 25.7, DL: 14.681, ST: 3.269, DV: 1.8023 },
    { p: 25.8, DL: 14.666, ST: 3.2487, DV: 1.8108 },
    { p: 25.9, DL: 14.651, ST: 3.2285, DV: 1.8194 },
    { p: 26.0, DL: 14.636, ST: 3.2083, DV: 1.8279 },
    { p: 26.1, DL: 14.621, ST: 3.1882, DV: 1.8365 },
    { p: 26.2, DL: 14.606, ST: 3.1682, DV: 1.8452 },
    { p: 26.3, DL: 14.591, ST: 3.1483, DV: 1.8538 },
    { p: 26.4, DL: 14.576, ST: 3.1284, DV: 1.8625 },
    { p: 26.5, DL: 14.561, ST: 3.1086, DV: 1.8712 },
    { p: 26.6, DL: 14.546, ST: 3.0889, DV: 1.8799 },
    { p: 26.7, DL: 14.531, ST: 3.0693, DV: 1.8886 },
    { p: 26.8, DL: 14.516, ST: 3.0497, DV: 1.8974 },
    { p: 26.9, DL: 14.501, ST: 3.0302, DV: 1.9061 },
    { p: 27.0, DL: 14.486, ST: 3.0108, DV: 1.9149 },
    { p: 27.1, DL: 14.471, ST: 2.9915, DV: 1.9237 },
    { p: 27.2, DL: 14.456, ST: 2.9722, DV: 1.9326 },
    { p: 27.3, DL: 14.441, ST: 2.953, DV: 1.9415 },
    { p: 27.4, DL: 14.426, ST: 2.9338, DV: 1.9503 },
    { p: 27.5, DL: 14.411, ST: 2.9147, DV: 1.9593 },
    { p: 27.6, DL: 14.396, ST: 2.8957, DV: 1.9682 },
    { p: 27.7, DL: 14.38, ST: 2.8768, DV: 1.9772 },
    { p: 27.8, DL: 14.365, ST: 2.8579, DV: 1.9862 },
    { p: 27.9, DL: 14.35, ST: 2.8391, DV: 1.9952 },
    { p: 28.0, DL: 14.335, ST: 2.8204, DV: 2.0042 },
    { p: 28.1, DL: 14.32, ST: 2.8017, DV: 2.0133 },
    { p: 28.2, DL: 14.305, ST: 2.7831, DV: 2.0223 },
    { p: 28.3, DL: 14.29, ST: 2.7646, DV: 2.0315 },
    { p: 28.4, DL: 14.275, ST: 2.7461, DV: 2.0406 },
    { p: 28.5, DL: 14.259, ST: 2.7277, DV: 2.0498 },
    { p: 28.6, DL: 14.244, ST: 2.7094, DV: 2.0589 },
    { p: 28.7, DL: 14.229, ST: 2.6911, DV: 2.0682 },
    { p: 28.8, DL: 14.214, ST: 2.6729, DV: 2.0774 },
    { p: 28.9, DL: 14.199, ST: 2.6548, DV: 2.0867 },
    { p: 29.0, DL: 14.183, ST: 2.6367, DV: 2.0959 },
    { p: 29.1, DL: 14.168, ST: 2.6187, DV: 2.1053 },
    { p: 29.2, DL: 14.153, ST: 2.6007, DV: 2.1146 },
    { p: 29.3, DL: 14.138, ST: 2.5828, DV: 2.124 },
    { p: 29.4, DL: 14.123, ST: 2.565, DV: 2.1334 },
    { p: 29.5, DL: 14.107, ST: 2.5473, DV: 2.1428 },
    { p: 29.6, DL: 14.092, ST: 2.5296, DV: 2.1523 },
    { p: 29.7, DL: 14.077, ST: 2.5119, DV: 2.1617 },
    { p: 29.8, DL: 14.061, ST: 2.4943, DV: 2.1713 },
    { p: 29.9, DL: 14.046, ST: 2.4768, DV: 2.1808 },
    { p: 30.0, DL: 14.031, ST: 2.4594, DV: 2.1904 },
    { p: 30.1, DL: 14.015, ST: 2.442, DV: 2.2 },
    { p: 30.2, DL: 14, ST: 2.4247, DV: 2.2096 },
    { p: 30.3, DL: 13.985, ST: 2.4074, DV: 2.2193 },
    { p: 30.4, DL: 13.969, ST: 2.3902, DV: 2.2289 },
    { p: 30.5, DL: 13.954, ST: 2.373, DV: 2.2387 },
    { p: 30.6, DL: 13.939, ST: 2.3559, DV: 2.2484 },
    { p: 30.7, DL: 13.923, ST: 2.3389, DV: 2.2582 },
    { p: 30.8, DL: 13.908, ST: 2.3219, DV: 2.268 },
    { p: 30.9, DL: 13.892, ST: 2.305, DV: 2.2778 },
    { p: 31.0, DL: 13.877, ST: 2.2882, DV: 2.2877 },
    { p: 31.1, DL: 13.861, ST: 2.2714, DV: 2.2976 },
    { p: 31.2, DL: 13.846, ST: 2.2546, DV: 2.3075 },
    { p: 31.3, DL: 13.83, ST: 2.238, DV: 2.3175 },
    { p: 31.4, DL: 13.815, ST: 2.2213, DV: 2.3275 },
    { p: 31.5, DL: 13.799, ST: 2.2048, DV: 2.3375 },
    { p: 31.6, DL: 13.784, ST: 2.1883, DV: 2.3476 },
    { p: 31.7, DL: 13.768, ST: 2.1718, DV: 2.3577 },
    { p: 31.8, DL: 13.752, ST: 2.1554, DV: 2.3678 },
    { p: 31.9, DL: 13.737, ST: 2.1391, DV: 2.378 },
    { p: 32.0, DL: 13.721, ST: 2.1228, DV: 2.3882 },
    { p: 32.1, DL: 13.705, ST: 2.1066, DV: 2.3984 },
    { p: 32.2, DL: 13.69, ST: 2.0904, DV: 2.4087 },
    { p: 32.3, DL: 13.674, ST: 2.0743, DV: 2.419 },
    { p: 32.4, DL: 13.658, ST: 2.0582, DV: 2.4293 },
    { p: 32.5, DL: 13.642, ST: 2.0422, DV: 2.4397 },
    { p: 32.6, DL: 13.627, ST: 2.0263, DV: 2.4501 },
    { p: 32.7, DL: 13.611, ST: 2.0104, DV: 2.4605 },
    { p: 32.8, DL: 13.595, ST: 1.9945, DV: 2.471 },
    { p: 32.9, DL: 13.579, ST: 1.9788, DV: 2.4815 },
    { p: 33.0, DL: 13.563, ST: 1.963, DV: 2.4921 },
    { p: 33.1, DL: 13.547, ST: 1.9474, DV: 2.5027 },
    { p: 33.2, DL: 13.531, ST: 1.9317, DV: 2.5133 },
    { p: 33.3, DL: 13.515, ST: 1.9162, DV: 2.524 },
    { p: 33.4, DL: 13.499, ST: 1.9006, DV: 2.5347 },
    { p: 33.5, DL: 13.483, ST: 1.8852, DV: 2.5455 },
    { p: 33.6, DL: 13.467, ST: 1.8698, DV: 2.5563 },
    { p: 33.7, DL: 13.451, ST: 1.8544, DV: 2.5671 },
    { p: 33.8, DL: 13.435, ST: 1.8391, DV: 2.578 },
    { p: 33.9, DL: 13.419, ST: 1.8239, DV: 2.5889 },
    { p: 34.0, DL: 13.403, ST: 1.8087, DV: 2.5998 },
    { p: 34.1, DL: 13.387, ST: 1.7935, DV: 2.6108 },
    { p: 34.2, DL: 13.37, ST: 1.7784, DV: 2.6219 },
    { p: 34.3, DL: 13.354, ST: 1.7634, DV: 2.6329 },
    { p: 34.4, DL: 13.338, ST: 1.7484, DV: 2.6441 },
    { p: 34.5, DL: 13.322, ST: 1.7335, DV: 2.6552 },
    { p: 34.6, DL: 13.305, ST: 1.7186, DV: 2.6664 },
    { p: 34.7, DL: 13.289, ST: 1.7037, DV: 2.6777 },
    { p: 34.8, DL: 13.272, ST: 1.6889, DV: 2.689 },
    { p: 34.9, DL: 13.256, ST: 1.6742, DV: 2.7003 },
    { p: 35.0, DL: 13.24, ST: 1.6595, DV: 2.7117 },
    { p: 35.1, DL: 13.223, ST: 1.6449, DV: 2.7232 },
    { p: 35.2, DL: 13.206, ST: 1.6303, DV: 2.7346 },
    { p: 35.3, DL: 13.19, ST: 1.6158, DV: 2.7462 },
    { p: 35.4, DL: 13.173, ST: 1.6013, DV: 2.7578 },
    { p: 35.5, DL: 13.157, ST: 1.5869, DV: 2.7694 },
    { p: 35.6, DL: 13.14, ST: 1.5725, DV: 2.7811 },
    { p: 35.7, DL: 13.123, ST: 1.5582, DV: 2.7928 },
    { p: 35.8, DL: 13.106, ST: 1.5439, DV: 2.8046 },
    { p: 35.9, DL: 13.09, ST: 1.5296, DV: 2.8164 },
    { p: 36.0, DL: 13.073, ST: 1.5155, DV: 2.8283 },
    { p: 36.1, DL: 13.056, ST: 1.5013, DV: 2.8402 },
    { p: 36.2, DL: 13.039, ST: 1.4872, DV: 2.8522 },
    { p: 36.3, DL: 13.022, ST: 1.4732, DV: 2.8642 },
    { p: 36.4, DL: 13.005, ST: 1.4592, DV: 2.8763 },
    { p: 36.5, DL: 12.988, ST: 1.4453, DV: 2.8884 },
    { p: 36.6, DL: 12.971, ST: 1.4314, DV: 2.9006 },
    { p: 36.7, DL: 12.954, ST: 1.4175, DV: 2.9129 },
    { p: 36.8, DL: 12.936, ST: 1.4038, DV: 2.9252 },
    { p: 36.9, DL: 12.919, ST: 1.39, DV: 2.9376 },
    { p: 37.0, DL: 12.902, ST: 1.3763, DV: 2.95 },
    { p: 37.1, DL: 12.885, ST: 1.3627, DV: 2.9625 },
    { p: 37.2, DL: 12.867, ST: 1.3491, DV: 2.975 },
    { p: 37.3, DL: 12.85, ST: 1.3355, DV: 2.9876 },
    { p: 37.4, DL: 12.832, ST: 1.322, DV: 3.0003 },
    { p: 37.5, DL: 12.815, ST: 1.3086, DV: 3.013 },
    { p: 37.6, DL: 12.797, ST: 1.2952, DV: 3.0258 },
    { p: 37.7, DL: 12.779, ST: 1.2818, DV: 3.0386 },
    { p: 37.8, DL: 12.762, ST: 1.2685, DV: 3.0515 },
    { p: 37.9, DL: 12.744, ST: 1.2552, DV: 3.0645 },
    { p: 38.0, DL: 12.726, ST: 1.242, DV: 3.0776 },
    { p: 38.1, DL: 12.708, ST: 1.2288, DV: 3.0907 },
    { p: 38.2, DL: 12.69, ST: 1.2157, DV: 3.1038 },
    { p: 38.3, DL: 12.672, ST: 1.2026, DV: 3.1171 },
    { p: 38.4, DL: 12.654, ST: 1.1896, DV: 3.1304 },
    { p: 38.5, DL: 12.636, ST: 1.1766, DV: 3.1438 },
    { p: 38.6, DL: 12.618, ST: 1.1637, DV: 3.1572 },
    { p: 38.7, DL: 12.6, ST: 1.1508, DV: 3.1707 },
    { p: 38.8, DL: 12.582, ST: 1.138, DV: 3.1843 },
    { p: 38.9, DL: 12.563, ST: 1.1252, DV: 3.198 },
    { p: 39.0, DL: 12.545, ST: 1.1124, DV: 3.2118 },
    { p: 39.1, DL: 12.526, ST: 1.0997, DV: 3.2256 },
    { p: 39.2, DL: 12.508, ST: 1.0871, DV: 3.2395 },
    { p: 39.3, DL: 12.489, ST: 1.0745, DV: 3.2534 },
    { p: 39.4, DL: 12.47, ST: 1.0619, DV: 3.2675 },
    { p: 39.5, DL: 12.452, ST: 1.0494, DV: 3.2816 },
    { p: 39.6, DL: 12.433, ST: 1.0369, DV: 3.2959 },
    { p: 39.7, DL: 12.414, ST: 1.0245, DV: 3.3102 },
    { p: 39.8, DL: 12.395, ST: 1.0121, DV: 3.3245 },
    { p: 39.9, DL: 12.376, ST: 0.9998, DV: 3.339 },
    { p: 40.0, DL: 12.357, ST: 0.98752, DV: 3.3536 },
    { p: 40.1, DL: 12.338, ST: 0.97528, DV: 3.3682 },
    { p: 40.2, DL: 12.318, ST: 0.96309, DV: 3.383 },
    { p: 40.3, DL: 12.299, ST: 0.95095, DV: 3.3978 },
    { p: 40.4, DL: 12.279, ST: 0.93886, DV: 3.4127 },
    { p: 40.5, DL: 12.26, ST: 0.92681, DV: 3.4277 },
    { p: 40.6, DL: 12.24, ST: 0.9148, DV: 3.4428 },
    { p: 40.7, DL: 12.221, ST: 0.90285, DV: 3.458 },
    { p: 40.8, DL: 12.201, ST: 0.89094, DV: 3.4733 },
    { p: 40.9, DL: 12.181, ST: 0.87907, DV: 3.4888 },
    { p: 41.0, DL: 12.161, ST: 0.86726, DV: 3.5043 },
    { p: 41.1, DL: 12.141, ST: 0.85549, DV: 3.5199 },
    { p: 41.2, DL: 12.121, ST: 0.84376, DV: 3.5356 },
    { p: 41.3, DL: 12.1, ST: 0.83208, DV: 3.5514 },
    { p: 41.4, DL: 12.08, ST: 0.82045, DV: 3.5674 },
    { p: 41.5, DL: 12.059, ST: 0.80887, DV: 3.5834 },
    { p: 41.6, DL: 12.039, ST: 0.79733, DV: 3.5996 },
    { p: 41.7, DL: 12.018, ST: 0.78584, DV: 3.6159 },
    { p: 41.8, DL: 11.997, ST: 0.77439, DV: 3.6323 },
    { p: 41.9, DL: 11.976, ST: 0.76299, DV: 3.6488 },
    { p: 42.0, DL: 11.955, ST: 0.75164, DV: 3.6654 },
    { p: 42.1, DL: 11.934, ST: 0.74033, DV: 3.6822 },
    { p: 42.2, DL: 11.913, ST: 0.72908, DV: 3.6991 },
    { p: 42.3, DL: 11.891, ST: 0.71786, DV: 3.7161 },
    { p: 42.4, DL: 11.87, ST: 0.7067, DV: 3.7333 },
    { p: 42.5, DL: 11.848, ST: 0.69558, DV: 3.7506 },
    { p: 42.6, DL: 11.826, ST: 0.68451, DV: 3.768 },
    { p: 42.7, DL: 11.805, ST: 0.67349, DV: 3.7856 },
    { p: 42.8, DL: 11.783, ST: 0.66251, DV: 3.8033 },
    { p: 42.9, DL: 11.76, ST: 0.65158, DV: 3.8212 },
    { p: 43.0, DL: 11.738, ST: 0.6407, DV: 3.8392 },
    { p: 43.1, DL: 11.716, ST: 0.62987, DV: 3.8574 },
    { p: 43.2, DL: 11.693, ST: 0.61908, DV: 3.8757 },
    { p: 43.3, DL: 11.67, ST: 0.60835, DV: 3.8942 },
    { p: 43.4, DL: 11.647, ST: 0.59766, DV: 3.9129 },
    { p: 43.5, DL: 11.624, ST: 0.58701, DV: 3.9317 },
    { p: 43.6, DL: 11.601, ST: 0.57642, DV: 3.9507 },
    { p: 43.7, DL: 11.577, ST: 0.56587, DV: 3.9699 },
    { p: 43.8, DL: 11.554, ST: 0.55538, DV: 3.9893 },
    { p: 43.9, DL: 11.53, ST: 0.54493, DV: 4.0088 },
    { p: 44.0, DL: 11.506, ST: 0.53453, DV: 4.0286 },
    { p: 44.1, DL: 11.482, ST: 0.52418, DV: 4.0485 },
    { p: 44.2, DL: 11.457, ST: 0.51388, DV: 4.0686 },
    { p: 44.3, DL: 11.433, ST: 0.50363, DV: 4.089 },
    { p: 44.4, DL: 11.408, ST: 0.49343, DV: 4.1096 },
    { p: 44.5, DL: 11.383, ST: 0.48328, DV: 4.1303 },
    { p: 44.6, DL: 11.358, ST: 0.47318, DV: 4.1513 },
    { p: 44.7, DL: 11.333, ST: 0.46313, DV: 4.1726 },
    { p: 44.8, DL: 11.307, ST: 0.45313, DV: 4.194 },
    { p: 44.9, DL: 11.281, ST: 0.44318, DV: 4.2157 },
    { p: 45.0, DL: 11.255, ST: 0.43328, DV: 4.2377 },
    { p: 45.1, DL: 11.229, ST: 0.42344, DV: 4.2599 },
    { p: 45.2, DL: 11.202, ST: 0.41364, DV: 4.2824 },
    { p: 45.3, DL: 11.175, ST: 0.4039, DV: 4.3052 },
    { p: 45.4, DL: 11.148, ST: 0.39421, DV: 4.3282 },
    { p: 45.5, DL: 11.12, ST: 0.38458, DV: 4.3516 },
    { p: 45.6, DL: 11.093, ST: 0.375, DV: 4.3752 },
    { p: 45.7, DL: 11.065, ST: 0.36547, DV: 4.3992 },
    { p: 45.8, DL: 11.036, ST: 0.35599, DV: 4.4235 },
    { p: 45.9, DL: 11.008, ST: 0.34657, DV: 4.4481 },
    { p: 46.0, DL: 10.978, ST: 0.33721, DV: 4.4731 },
    { p: 46.1, DL: 10.949, ST: 0.3279, DV: 4.4984 },
    { p: 46.2, DL: 10.919, ST: 0.31865, DV: 4.5241 },
    { p: 46.3, DL: 10.889, ST: 0.30945, DV: 4.5503 },
    { p: 46.4, DL: 10.859, ST: 0.30031, DV: 4.5768 },
    { p: 46.5, DL: 10.828, ST: 0.29123, DV: 4.6037 },
    { p: 46.6, DL: 10.796, ST: 0.28221, DV: 4.6311 },
    { p: 46.7, DL: 10.764, ST: 0.27324, DV: 4.6589 },
    { p: 46.8, DL: 10.732, ST: 0.26434, DV: 4.6873 },
    { p: 46.9, DL: 10.699, ST: 0.2555, DV: 4.7161 },
    { p: 47.0, DL: 10.666, ST: 0.24671, DV: 4.7455 },
    { p: 47.1, DL: 10.632, ST: 0.23799, DV: 4.7754 },
    { p: 47.2, DL: 10.597, ST: 0.22934, DV: 4.8059 },
    { p: 47.3, DL: 10.562, ST: 0.22075, DV: 4.837 },
    { p: 47.4, DL: 10.526, ST: 0.21222, DV: 4.8687 },
    { p: 47.5, DL: 10.49, ST: 0.20376, DV: 4.9012 },
    { p: 47.6, DL: 10.453, ST: 0.19536, DV: 4.9343 },
    { p: 47.7, DL: 10.415, ST: 0.18704, DV: 4.9682 },
    { p: 47.8, DL: 10.376, ST: 0.17878, DV: 5.0029 },
    { p: 47.9, DL: 10.336, ST: 0.1706, DV: 5.0385 },
    { p: 48.0, DL: 10.296, ST: 0.16249, DV: 5.075 },
    { p: 48.1, DL: 10.254, ST: 0.15445, DV: 5.1125 },
    { p: 48.2, DL: 10.212, ST: 0.14649, DV: 5.151 },
    { p: 48.3, DL: 10.168, ST: 0.13861, DV: 5.1907 },
    { p: 48.4, DL: 10.123, ST: 0.13081, DV: 5.2316 },
    { p: 48.5, DL: 10.077, ST: 0.1231, DV: 5.2738 },
    { p: 48.6, DL: 10.029, ST: 0.11546, DV: 5.3174 },
    { p: 48.7, DL: 9.9802, ST: 0.10792, DV: 5.3626 },
    { p: 48.8, DL: 9.9293, ST: 0.10047, DV: 5.4095 },
    { p: 48.9, DL: 9.8764, ST: 0.09311, DV: 5.4584 },
    { p: 49.0, DL: 9.8214, ST: 0.085852, DV: 5.5093 },
    { p: 49.1, DL: 9.7641, ST: 0.078697, DV: 5.5626 },
    { p: 49.2, DL: 9.704, ST: 0.071651, DV: 5.6186 },
    { p: 49.3, DL: 9.641, ST: 0.064719, DV: 5.6776 },
    { p: 49.4, DL: 9.5744, ST: 0.057909, DV: 5.7401 },
    { p: 49.5, DL: 9.5037, ST: 0.051229, DV: 5.8067 },
    { p: 49.6, DL: 9.4282, ST: 0.044687, DV: 5.8781 },
    { p: 49.7, DL: 9.3468, ST: 0.038298, DV: 5.9555 },
    { p: 49.8, DL: 9.2581, ST: 0.032074, DV: 6.0401 },
    { p: 49.9, DL: 9.1601, ST: 0.026037, DV: 6.1341 },
    { p: 50.0, DL: 9.0494, ST: 0.020212, DV: 6.2408 }



  ];

  if (value < 1 || value > 50 || isNaN(value)) {
    errorContainer.style.display = 'block';
    errorContainer.textContent = 'Value must be between 1 and 50.';
    inputField.style.boxShadow = '0 0 5px #FF6347';
    inputField.style.color = '#FF6347';
  } else {
    errorContainer.style.display = 'none';
    inputField.style.boxShadow = 'none';
    inputField.style.color = '#FFF';

    // Find the matching row
    const matchedRow = data.find(row => parseFloat(row.p.toFixed(1)) === value);
    if (matchedRow) {
      if (!isNaN(D) && !isNaN(R)) {
        let DV = matchedRow.DV.toFixed(2);
        let _result = parseFloat(DV);
        //P_input.value = _result.toFixed(2);
        Utop_result = ((D * (1 + R)) / (9 * 3.14159265358979323 * _result * 3600))
        Utop_input.value = Utop_result.toFixed(2);
      };
      if (!isNaN(F)) {
        let DV = matchedRow.DV.toFixed(2);
        let DV_value = parseFloat(DV);
        let DL = matchedRow.DL.toFixed(2);
        let DL_value = parseFloat(DL);
        let ST = matchedRow.ST.toFixed(2);
        let ST_value = parseFloat(ST);


        const logF = Math.log10(F);
        const firstPart = Math.pow(10, (-1.1977 - 0.53143 * logF - 0.18760 * Math.pow(logF, 2)));
        const secondPart = Math.pow((ST_value / 20), 0.2);
        const thirdPart = Math.sqrt((DL_value - DV_value) / DV_value);
        const Uflood = firstPart * secondPart * thirdPart * 0.3048; // 0.3048 to convert from feet to meters, if necessary

        Uflood_result = Uflood;
        Uflood_input.value = Uflood_result.toFixed(2);

      }

    } else {
      console.log("No match found for this pressure value.");
    }
  }
});

