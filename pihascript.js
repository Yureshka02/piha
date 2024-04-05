

document.addEventListener("DOMContentLoaded", function() {
    // Page 1
    const visitDateInput = document.getElementById("visitDate");
    const checkOutDateInput = document.getElementById("checkOutDate");
    const singleRoomInput = document.getElementById("single");
    const doubleRoomInput = document.getElementById("double");
    const tripleRoomInput = document.getElementById("triple");
    const adultInput = document.getElementById("Adult");
    const childInput = document.getElementById("Child");
    const continueButton = document.getElementById("continueButton1");

    function updateTotalBill() {
        const visitDate = new Date(visitDateInput.value);
        const checkOutDate = new Date(checkOutDateInput.value);
        const today = new Date();

        // Check if the selected visit date is in the future
        if (visitDate <= today) {
            visitDateInput.value = today.toISOString().split('T')[0];
        }

        // Check if the checkout date is after the visit date
        if (checkOutDate <= visitDate) {
            checkOutDateInput.value = new Date(visitDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        }

        // Recalculate number of days
        const numberOfDays = Math.max(Math.ceil((checkOutDate - visitDate) / (1000 * 60 * 60 * 24)), 0);

        const singleRooms = parseInt(singleRoomInput.value);
        const doubleRooms = parseInt(doubleRoomInput.value);
        const tripleRooms = parseInt(tripleRoomInput.value);
        const adults = parseInt(adultInput.value);
        const children = parseInt(childInput.value);

        const totalSingleRooms = singleRooms;
        const totalDoubleRooms = doubleRooms;
        const totalTripleRooms = tripleRooms;

        const totalRooms = totalSingleRooms + totalDoubleRooms + totalTripleRooms;
        const pricePerSingleRoom = 5000;
        const pricePerDoubleRoom = 8000;
        const pricePerTripleRoom = 12000;

        const totalPrice = ((totalSingleRooms * pricePerSingleRoom) + (totalDoubleRooms * pricePerDoubleRoom) + (totalTripleRooms * pricePerTripleRoom)) * numberOfDays;

        summaryDate.textContent = visitDate.toLocaleDateString();
        summaryAdult.textContent = adults;
        summaryChild.textContent = children;
        summaryRoom.innerHTML = `${totalSingleRooms} Single, ${totalDoubleRooms} Double, ${totalTripleRooms} Triple for ${numberOfDays} days`;
        summaryTotal.textContent = 'Rs. ' + totalPrice;

        if (totalRooms > 0) {
            continueButton.removeAttribute("disabled");
        } else {
            continueButton.setAttribute("disabled", "disabled");
        }
    }

    // Add event listeners to increment and decrement buttons
    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");

    function handleIncrement(event) {
        const inputElement = event.target.parentElement.querySelector("input");
        inputElement.value = parseInt(inputElement.value) + 1;
        updateTotalBill();
    }

    function handleDecrement(event) {
        const inputElement = event.target.parentElement.querySelector("input");
        const currentValue = parseInt(inputElement.value);
        inputElement.value = currentValue > 0 ? currentValue - 1 : 0;
        updateTotalBill();
    }

    incrementButtons.forEach((button) => {
        button.addEventListener("click", handleIncrement);
    });

    decrementButtons.forEach((button) => {
        button.addEventListener("click", handleDecrement);
    });

    // storing the values in local storage
    continueButton.addEventListener("click", function() {
        localStorage.setItem("visitDate", visitDateInput.value);
        localStorage.setItem("checkOutDate", checkOutDateInput.value);
        localStorage.setItem("singleRoom", singleRoomInput.value);
        localStorage.setItem("doubleRoom", doubleRoomInput.value);
        localStorage.setItem("tripleRoom", tripleRoomInput.value);
        localStorage.setItem("adult", adultInput.value);
        localStorage.setItem("child", childInput.value);
        localStorage.setItem("summaryTotal", summaryTotal.textContent);
    });

    // Add event listeners for input change
    visitDateInput.addEventListener("change", updateTotalBill);
    checkOutDateInput.addEventListener("change", updateTotalBill);
    singleRoomInput.addEventListener("input", updateTotalBill);
    doubleRoomInput.addEventListener("input", updateTotalBill);
    tripleRoomInput.addEventListener("input", updateTotalBill);
    adultInput.addEventListener("input", updateTotalBill);
    childInput.addEventListener("input", updateTotalBill);

    // Initial update of total bill
    updateTotalBill();
});


// Page 2
document.addEventListener("DOMContentLoaded", function() {
    const continueButton = document.getElementById("continueButton2");
    const prevButton = document.getElementById("prevButton");
    const fullNameInput = document.getElementById("fullName");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirmEmail");
    const genderSelect = document.getElementById("gender");
    
    function validateInputs() {
        const fullName = fullNameInput.value.trim();
        const mobileNumber = mobileNumberInput.value.trim();
        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();
        const gender = genderSelect.value;

        if (fullName === "") {
            return false;
        }

        if (!/^\d{9,15}$/.test(mobileNumber)) {
            return false;
        }

        if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
            return false;
        }

        if (confirmEmail === "" || email !== confirmEmail) {
            return false;
        }

        if (gender === "") {
            return false;
        }

        return true;
    }

    function handleContinueButtonClick() {
        if (validateInputs()) {
            localStorage.setItem("fullName", fullNameInput.value.trim());
            localStorage.setItem("mobileNumber", mobileNumberInput.value.trim());
            localStorage.setItem("email", emailInput.value.trim());
            localStorage.setItem("gender", genderSelect.value);

            nextPage();
        } else {
            alert("Please fill in all details correctly.");
        }
    }

    continueButton.addEventListener("click", handleContinueButtonClick);

    prevButton.addEventListener("click", function() {
        prevPage();
    });

    // Disable continue button initially
    continueButton.disabled = true;

    // Enable continue button when all inputs are filled correctly
    function enableContinueButton() {
        continueButton.disabled = !validateInputs();
    }

    fullNameInput.addEventListener("input", enableContinueButton);
    mobileNumberInput.addEventListener("input", enableContinueButton);
    emailInput.addEventListener("input", enableContinueButton);
    confirmEmailInput.addEventListener("input", enableContinueButton);
    genderSelect.addEventListener("change", enableContinueButton);
});



// Page 3
document.addEventListener("DOMContentLoaded", function() {
    const continueButton = document.getElementById("continueButton3");
    const prevButton = document.getElementById("prevButton2");
    const cardNumberInput = document.getElementById("cardNumber");
    const expiryDateInput = document.getElementById("expiryDate");
    const cvvInput = document.getElementById("cvc");
    const nameOnCardInput = document.getElementById("nameOnCard");
    const payButton = document.getElementById("payButton");
    const paymentForm = document.getElementById("payment-form");

    // Apply card number masking
    $(cardNumberInput).inputmask("9999-9999-9999-9999");

    // Apply expiry date masking
    $(expiryDateInput).inputmask("99/99");

    // Apply CVV masking
    $(cvvInput).inputmask("999");

    // Function to check if all inputs are valid
    function areAllInputsValid() {
        return cardNumberInput.checkValidity() &&
               expiryDateInput.checkValidity() &&
               cvvInput.checkValidity() &&
               nameOnCardInput.checkValidity();
    }

    // Function to enable or disable the Continue button based on input validity
    function updateContinueButtonState() {
        continueButton.disabled = !areAllInputsValid();
    }

    // Add event listeners to inputs to update the Continue button state
    cardNumberInput.addEventListener("input", updateContinueButtonState);
    expiryDateInput.addEventListener("input", updateContinueButtonState);
    cvvInput.addEventListener("input", updateContinueButtonState);
    nameOnCardInput.addEventListener("input", updateContinueButtonState);

    // Add event listener to the payment form to check input validity
    paymentForm.addEventListener("input", function() {
        // Disable the Pay button if any input is invalid
        payButton.disabled = !areAllInputsValid();
    });

    continueButton.addEventListener("click", function() {
        // Check if all inputs are valid before proceeding
        if (!areAllInputsValid()) {
            alert("Please fill in all details correctly.");
            return;
        }

        // If all validations pass, proceed to the next step
        nextPage();
    });

    prevButton.addEventListener("click", function() {
        // Go back to the previous step
        prevPage();
    });
});
