/*
Full Stack JavaScript project 3: Interactive Form 

Michael Cook
*/

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const otherTitleInput = document.getElementById('other-title');
const otherTitleInputLabel = document.querySelector('[for="other-title"]');
const userTitleSelect = document.getElementById('title');


// set focus on first form input by default
nameInput.focus();


// set other-title input and label to display:none by default
otherTitleInput.style.display = 'none';
otherTitleInputLabel.style.display = 'none';


// show other-title input and label if 'other' is clicked on in job role select
userTitleSelect.addEventListener('change', e => {
    if (userTitleSelect.value === 'other') {
        otherTitleInput.style.display = 'block';
        otherTitleInputLabel.style.display = 'block';
    } else {
        if (otherTitleInput.style.display === 'block' && 
            otherTitleInputLabel.style.display === 'block') {
                otherTitleInput.style.display = 'none';
                otherTitleInputLabel.style.display = 'none';
            }
    }
});
