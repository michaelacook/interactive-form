/*
Full Stack JavaScript project 3: Interactive Form 

Michael Cook
*/


/*----------------------------------------- GLOBAL VARIABLES ----------------------------------------- */
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const otherTitleField = document.getElementById('other-title-field');
const userTitleSelect = document.getElementById('title');
const designSelect = document.getElementById('design');
const shirtColoursSelect = document.getElementById('color');
const shirtColoursField = document.getElementById('colors-js-puns');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');



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

