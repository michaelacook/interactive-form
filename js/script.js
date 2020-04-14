/*
Full Stack JavaScript project 3: Interactive Form 

by Michael Cook

I am aiming for "Exceeds Expectations". Please do not let it pass if it does not meet that standard.

The real-time validation and messaging is applied to the name, email, and activities sections of the form.
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
const activitiesFieldset = document.querySelector('.activities');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const paymentSelect = document.getElementById('payment');
const payPalMessage = document.getElementById('paypal');
const bitCoinMessage = document.getElementById('bitcoin');
const creditCardDetails = document.getElementById('credit-card');



/*----------------------------------------- BASIC INFO SECTION ----------------------------------------- */


// set focus on first form input by default
nameInput.focus();


// set otherTitle input and label to display:none by default
otherTitleField.style.display = 'none';


// show otherTitle input and label if 'other' is clicked on in job role select
userTitleSelect.addEventListener('change', e => {
    if (userTitleSelect.value === 'other') {
        otherTitleField.style.display = 'block';
    } else {
        otherTitleField.style.display = 'none';
    }
});



/*----------------------------------------- T-SHIRT SECTION ----------------------------------------- */



// set shirtcoloursField to display:none by default
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
 * Iterate over all checkboxes and disable inputs for conflicting activities when target checkbox is checked 
 * When target checkbox is unchecked, iterate over checkbox inputs and remove disabled properties and styles
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


// set the "Select Payment Method" option in the payment select menu to disabled
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
    }
});


/*----------------------------------------- FORM VALIDATION ----------------------------------------- */


/**
 * Determine if a form control has a value
 * @param {HTML element} el - form control to be validated
 * @return {Bool} false when el fails, true on pass 
 */
const validate = (el) => {
    if (!el.value) {
        return false;
    }
    return true;
}


/**
 * Insert a validation error or OK message immediately after the target element
 * @param {HTML element} el - target element 
 * @param {String} message - error or OK message to be displayed
 * @param {Bool} valid - true if OK message, false if invalid
 * @param {Bool} border - default true for border property, pass false for no border
 */
const insertMessage = (el, message, valid, border=true) => {
    const msg = document.createElement('span');
    msg.textContent = message;
    if (!valid) {
        msg.setAttribute('class', 'error-message');
        if (border) el.classList.add('error');
    } else {
        msg.setAttribute('class', 'ok-message');
        if (border) el.classList.add('ok');
    }
    el.parentNode.insertBefore(msg, el.nextSibling);
}


/**
 * Remove error or OK message and styling from an element when it passes validation
 * @param {HTML element} el 
 */
const removeMessage = (el) => {
    const sibling = el.nextElementSibling;
    if (el.classList.contains('error')) {
        el.classList.remove('error');
    } else if (el.classList.contains('ok')) {
        el.classList.remove('ok');
    }
    if (sibling && 
       (sibling.className === 'error-message' ||
        sibling.className === 'ok-message')) {
        sibling.remove();
    }
}


/**
 * Validate the nameInput input
 * Invalid if empty or contains characters other than letters
 * @return {Bool} true if valid, false on invalid
 */
const validateNameInput = () => {
    removeMessage(nameInput);
    const nameRegex = /^[A-Za-z]+$/;
    if (!validate(nameInput)) {
        insertMessage(nameInput, "Please provide a name.", false);
        return false;
    } else if (!nameRegex.test(nameInput.value)) {
        insertMessage(nameInput, "Name can only contain letters.", false);
        return false;
    }
    insertMessage(nameInput, "Looks good!", true);
    return true;
}


/**
 * Validate the emailInput input
 * @return {Bool} true if valid, false on invalid
 */
const validateEmailInput = () => {
    removeMessage(emailInput);
    const regex = /\w+@[\w]+.(com|net|ca|io|org|co\.uk)$/;
    if (!validate(emailInput)) {
        insertMessage(emailInput, "Please provide an email address.", false);
        return false;
    } else if (!regex.test(emailInput.value)) {
        insertMessage(emailInput, "The email you provided is not a valid email.", false);
        return false;
    }
    insertMessage(emailInput, "Looks good!", true);
    return true;
}


/**
 * Validate activities to make sure at least one activity is selected
 * @return {Bool} true if valid, false on invalid
 */
const validateActivities = () => {
    removeMessage(activitiesFieldset);
    let valid = false;
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            valid = true;
        }
    }
    if (!valid) {
        insertMessage(activitiesFieldset, "Please select at least one activity.", false, false);
        return false;
    }
    insertMessage(activitiesFieldset, "Looks good!", true, false);
    return true;
}


/**
 * Validate credit card number
 */
const validateCardNumber = () => {
    const cardNumber = document.getElementById('cc-num');
    removeMessage(cardNumber);
    cardNumberRegex = /^\d{13}$|^\d{16}$/;
    if (!validate(cardNumber)) {
        insertMessage(cardNumber, "Please provide a credit card number.", false);
        return false;
    } else if (!cardNumberRegex.test(cardNumber.value)) {
        insertMessage(cardNumber, "Card number must be between 13 and 16 digits.", false);
        return false;
    }
    insertMessage(cardNumber, "Ok!", true);
    return true;
}


/**
 * Validate zip code
 */
const validateZip = () => {
    const zipCode = document.getElementById('zip');
    removeMessage(zipCode);
    zipCodeRegex = /^\d{5}$/;
    if (!validate(zipCode)) {
        insertMessage(zipCode, "Zip code required.", false);
        return false;
    } else if (!zipCodeRegex.test(zipCode.value)) {
        insertMessage(zipCode, "Must be 5 digits.", false);
        return false;
    }
    insertMessage(zipCode, "Ok!", true);
    return true;
}


/**
 * validateCvv
 */
const validateCvv = () => {
    const cvv = document.getElementById('cvv');
    removeMessage(cvv);
    cvvRegex = /^\d{3}$/;
    if (!validate(cvv)) {
        insertMessage(cvv, "CVV required.", false);
        return false;
    } else if (!cvvRegex.test(cvv.value)) {
        insertMessage(cvv, "Must be 3 digits.", false);
        return false;
    }
    insertMessage(cvv, "Ok!", true);
    return true;
}


/**
 * Call all functions to validate credit card data
 * If credit card is not the selected payment method do an early return
 * @return {Bool} true if all fields are valid, false if any fail
 */
const validateCreditCardInputs = () => {
    if (paymentSelect.value !== 'credit card') return true;
    
    const validCC = validateCardNumber();
    const validZip = validateZip();
    const validCvv = validateCvv();

    if (!validCC ||
        !validZip ||
        !validCvv) {
            return false;
        }
    
    return true;
}


/**
 * Call all validation functions and if any fail, prevent submit event
 * @param {Event} e - submit event 
 */
const validateForm = (e) => {
    const validName = validateNameInput(); 
    const validEmail = validateEmailInput(); 
    const validActivities = validateActivities(); 
    const validCc = validateCreditCardInputs();
    if (!validName ||
        !validEmail ||
        !validActivities ||
        !validCc) { 
        e.preventDefault(); 
    }
}


// submit event listener. calls the validateForm function when form is submitted
document.addEventListener('submit', e => validateForm(e));


/*----------------------------------------- REAL-TIME VALIDATION ----------------------------------------- */


// real time validation and messaging of basic info
[nameInput, emailInput].forEach(el => {
    el.addEventListener('keyup', e => {
        if (el.id === "name") {
            validateNameInput();
        } else if (el.id === "mail") {
            validateEmailInput();
        }
    });
});


// real time validation message for activities fieldset 
activitiesFieldset.addEventListener('change', e => {
    validateActivities();
});
