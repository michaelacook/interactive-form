/*
Full Stack JavaScript project 3: Interactive Form 

Michael Cook
*/


/*----------------------------------------- GLOBAL VARIABLES ----------------------------------------- */
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const otherTitleField = document.getElementById('other-title-field');
const userTitleSelect = document.getElementById('title');
const designSelect = document.getElementById('design');
const shirtColoursSelect = document.getElementById('color');
const shirtColoursField = document.getElementById('colors-js-puns');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const paymentSelect = document.getElementById('payment');
const payPalMessage = document.getElementById('paypal');
const bitCoinMessage = document.getElementById('bitcoin');
const creditCardDetails = document.getElementById('credit-card');



/*----------------------------------------- BASIC INFO SECTION ----------------------------------------- */


// set focus on first form input by default
nameInput.focus();


// set other-title input and label to display:none by default
otherTitleField.style.display = 'none';


// show other-title input and label if 'other' is clicked on in job role select
userTitleSelect.addEventListener('change', e => {
    if (userTitleSelect.value === 'other') {
        otherTitleField.style.display = 'block';
    } else {
        otherTitleField.style.display = 'none';
    }
});



/*----------------------------------------- T-SHIRT SECTION ----------------------------------------- */



// make colours field display:none by default
shirtColoursField.style.display = 'none';


// show shirtColoursField whe a design is selected and dynamically set colour options
designSelect.addEventListener('change', e => {
    const jsPunsColours = `<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
                           <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
                           <option value="gold">Gold (JS Puns shirt only)</option>`;

    const heartJSColours = `<option value="tomato">Tomato (I &#9829; JS shirt only)</option>
                            <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
                            <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>`;

    if (designSelect.value !== "Select Theme") {
        if (designSelect.value === 'js puns') {
            shirtColoursSelect.innerHTML = jsPunsColours;
        } else if (designSelect.value === 'heart js') {
            shirtColoursSelect.innerHTML = heartJSColours;
        }
        shirtColoursField.style.display = 'inline-block';
    } else {
        shirtColoursField.style.display = 'none';
    }
});



/*----------------------------------------- ACTIVITIES SECTION----------------------------------------- */


/**
 * Iterate over all checkboxes and disable inputs for conflicting workshops when target checkbox is checked 
 * When target checkbox is unchecked, iterate over checkbox inputs and remove disabled properties
 * @param {HTML element} checkbox - checkbox input being clicked
 */
const toggleConflicting = (checkbox) => {
    const time = checkbox.getAttribute('data-day-and-time');
    const name = checkbox.getAttribute('name');
    for (let i = 0; i < checkBoxes.length; i++) {
       if (checkBoxes[i].getAttribute('name') !== name &&
           checkBoxes[i].getAttribute('data-day-and-time') === time) {
               if (checkbox.checked) {
                    checkBoxes[i].setAttribute('disabled', "");
                    checkBoxes[i].setAttribute("title", "This activity conflicts with another selected activity");
                    checkBoxes[i].parentNode.style.textDecoration = 'line-through';
                    checkBoxes[i].parentNode.style.color = 'grey';
               } else {
                    checkBoxes[i].removeAttribute('disabled', "");
                    checkBoxes[i].removeAttribute('title', "");
                    checkBoxes[i].parentNode.style.textDecoration = 'none';
                    checkBoxes[i].parentNode.style.color = 'black';
               }
           }
    }
}


/**
 * Get total cost of all selected activities
 * @return {Number} total - total cost of all selected activities
 */
const getTotalCost = () => {
    let total = 0;
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            total += parseInt(checkBoxes[i].getAttribute('data-cost'));
        }
    }
    return total;
}


/**
 * Get and append a total cost message for all selected activities 
 * If cost is 0 dollars, remove cost message if it exists
 */
const appendTotalCost = () => {
    const cost = getTotalCost();
    const costMsg = document.getElementById('total');
    if (costMsg) costMsg.remove();
    if (cost > 0) {
        const h2 = document.createElement('h2');
        h2.setAttribute('id', 'total')
        h2.textContent = `Total: $${cost}`;
        document.querySelector('.activities').appendChild(h2);
    }
}


/**
 * Add an event listner to each checkbox in the activities fieldset
 * Each checkbox input listens for a change event 
 * When change event occurs, the event listener calls the toggleConflicting function and appendTotalCost function
 */
const addCheckBoxEventListeners = () => {
    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('change', e => {
            toggleConflicting(e.target);
            appendTotalCost();
        });
    }
}


// Add the event listeners to each checkbox
addCheckBoxEventListeners();


/*----------------------------------------- PAYMENT SECTION ----------------------------------------- */


// set credit card as default payment in payment select 
paymentSelect.querySelector('option[value="credit card"]').setAttribute('selected', "");


// Set the "Select Payment Method" option in the payment select menu to disabled
paymentSelect.querySelector('option[value="select method"]').setAttribute('disabled', "");


// set paypal and bitcoin option messages to display:none by default
payPalMessage.style.display = 'none'; 
bitCoinMessage.style.display = 'none'; 


// toggle display of different payment method sections depending on value of the payment method selected
paymentSelect.addEventListener('change', e => {
    switch (paymentSelect.value) {
        case "credit card": 
            payPalMessage.style.display = 'none'; 
            bitCoinMessage.style.display = 'none';
            creditCardDetails.style.display = 'block';
            break;
        case "paypal": 
            creditCardDetails.style.display = 'none';
            bitCoinMessage.style.display = 'none';
            payPalMessage.style.display = 'block';
            break;
        case "bitcoin":
            creditCardDetails.style.display = 'none';
            payPalMessage.style.display = 'none';
            bitCoinMessage.style.display = 'block';
            break;
    }
});


/*----------------------------------------- FORM VALIDATION ----------------------------------------- */


/**
 * Determine is a form control has a value
 * @param {HTML node} el - form control to be validated
 * @return {Bool} false when el fails, true on pass 
 */
const validate = (el) => {
    if (!el.value) {
        return false;
    }
    return true;
}


/**
 * Insert a validation error message immediately after the target element
 * @param {HTML element} el - target element 
 * @param {String} message - error message to be displayed
 * @param {Bool} border - default true for red border property
 */
const insertValidationErrorMessage = (el, message, border=true) => {
    const msg = document.createElement('span');
    msg.setAttribute('class', 'error-message');
    msg.textContent = message;
    el.parentNode.insertBefore(msg, el.nextSibling);
    if (border) el.classList.add('error');
}


/**
 * Remove error message and styling from an element when it passes validation
 * @param {HTML element} el 
 */
const removeErrorMessage = (el) => {
    const sibling = el.nextElementSibling;
    if (el.classList.contains('error')) el.classList.remove('error');
    if (sibling) {
        if (el.nextElementSibling.className === 'error-message') {
            el.nextElementSibling.remove();
        }
    }
}


/**
 * Validate the nameInput input
 * @return {Bool} true if valid, false on invalid
 */
const validateNameInput = () => {
    removeErrorMessage(nameInput);
    if (!validate(nameInput)) {
        insertValidationErrorMessage(nameInput, "Please provide a name.");
        return false;
    }
    return true;
}


/**
 * Validate the emailInput input
 * @return {Bool} true if valid, false on invalid
 */
const validateEmailInput = () => {
    removeErrorMessage(emailInput);
    const regex = /[\w]+@[\w]+.(com|net|ca|io|org|co\.uk)/;
    if (!validate(emailInput)) {
        insertValidationErrorMessage(emailInput, "Please provide an email address.");
        return false;
    } else if (!regex.test(emailInput.value)) {
        insertValidationErrorMessage(emailInput, "The email you provided is not a valid email.");
        return false;
    }
    return true;
}


/**
 * Validate activities to make sure at least one activity is selected
 * @return {Bool} true if valid, false on invalid
 */
const validateActivities = () => {
    const activitiesFieldset = document.querySelector('.activities');
    removeErrorMessage(activitiesFieldset);
    let valid = false;
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            valid = true;
        }
    }
    if (!valid) {
        insertValidationErrorMessage(activitiesFieldset, "Please select at least one activity.", false);
        return false;
    }
    return true;
}


/**
 * Validate credit card section
 * If credit card is not the selected payment method do an early return
 * @return {Bool} true if all fields are valid, false if any fail
 */
const validateCreditCardInputs = () => {
    if (paymentSelect.value !== 'credit card') return true;
    let valid = true;
    const cardNumber = document.getElementById('cc-num');
    const zipCode = document.getElementById('zip');
    const cvv = document.getElementById('cvv');

    removeErrorMessage(cardNumber);
    removeErrorMessage(zipCode);
    removeErrorMessage(cvv);

    cardNumberRegex = /^\d{13}$|^\d{16}$/;
    zipCodeRegex = /^\d{5}$/;
    cvvRegex = /^\d{3}$/;

    if (!validate(cardNumber)) {
        insertValidationErrorMessage(cardNumber, "Please provide a credit card number.");
        valid = false;
    } else if (!cardNumberRegex.test(cardNumber.value)) {
        insertValidationErrorMessage(cardNumber, "The card number provided is not valid.");
        valid = false;
    }

    if (!validate(zipCode)) {
        insertValidationErrorMessage(zipCode, "Zip code required.");
        valid = false;
    } else if (!zipCodeRegex.test(zipCode.value)) {
        insertValidationErrorMessage(zipCode, "Zip code invalid.");
        valid = false;
    }

    if (!validate(cvv)) {
        insertValidationErrorMessage(cvv, "cvv required.");
        valid = false;
    } else if (!cvvRegex.test(cvv.value)) {
        insertValidationErrorMessage(cvv, "cvv invalid.");
        valid = false;
    }

    return valid;
}


/**
 * Call all validation functions and if any fail, prevent submit event
 * The logic behind the reassigning of validForm is that 
 * @param {Event} e - submit event 
 */
const validateForm = (e) => {
    validName = validateNameInput(); 
    validEmail = validateEmailInput(); 
    validActivities = validateActivities(); 
    validCc = validateCreditCardInputs();
    if (!validName ||
        !validEmail ||
        !validActivities ||
        !validCc) { 
        e.preventDefault(); 
    }
}


// submit event listener. calls the validateForm function when form is submitted
document.addEventListener('submit', e => validateForm(e));