const button = document.getElementById("changeColorBtn");

function changeBackgroundColor() {
    const colors = ["lightblue", "lightgreen", "lightcoral", "lightgoldenrodyellow", "lightpink", "lightskyblue"]; 
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

button.addEventListener("click", changeBackgroundColor);

const colorButton = document.getElementById("changeColorBtn");
const fetchButton = document.getElementById("fetchDataBtn");

const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");

function fetchPost() {
    fetch("https://api.adviceslip.com/advice")  
        .then(response => response.json())  
        .then(data => {
            // const postTitle = document.getElementById("postTitle");  
            // const postBody = document.getElementById("postBody");
            
            postTitle.textContent = "Got_It #" + data.slip.id;   
            postBody.textContent = data.slip.advice;              
        })
        .catch(error => {
            console.error("Error fetching data:", error);  
            postTitle.textContent = "Failed to load advice";
            postBody.textContent = "";
        });
}
// colorButton.addEventListener("click", changeBackgroundColor);
fetchButton.addEventListener("click", fetchPost);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

        const name = document.getElementById('yourname').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('msg').value.trim();

        clearErrors();
        let hasError = false;

        if (name === '') {
            showError('yourname', 'Name is required.');
            hasError = true;
        }
        if (subject === '') {
            showError('subject', 'Subject is required.');
            hasError = true;
        }
        if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address.');
            hasError = true;
        }
        if (message.length < 10) {
            showError('msg', 'Message must be at least 10 characters.');
            hasError = true;
        }

        if (!hasError) {
            displaySuccessMessage();
            form.reset(); 
        }
    });

    function showError(inputId, message) {
        const inputField = document.getElementById(inputId);

        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '14px';
        errorElement.textContent = message;

        inputField.style.border = '1px solid red';
        inputField.insertAdjacentElement('afterend', errorElement);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());

        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => input.style.border = '1px solid #ccc'); 
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function displaySuccessMessage() {
        let successMessage = document.getElementById('success-message');

        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.id = 'success-message';
            successMessage.style.color = 'green';
            successMessage.style.fontSize = '16px';
            successMessage.style.textAlign = 'center';
            successMessage.style.marginTop = '20px';
            successMessage.textContent = 'Form submitted successfully!';
            form.parentElement.appendChild(successMessage);
        } else {
            successMessage.textContent = 'Form submitted successfully!';
            successMessage.style.display = 'block';
        }

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
});