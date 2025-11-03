function handleLogin(event) {
    event.preventDefault(); 
    console.log("login called");
    clearErrors();

    if (validateForm()) {
        login();
    }
}

function validateForm() {
    let inputEmail = document.getElementById("inputEmail").value.trim();
    let inputPassword = document.getElementById("inputPassword").value.trim();
    let isValid = true;

    if (inputEmail === "") {
        document.getElementById("emailError").textContent = "Please enter your email";
        isValid = false;
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
        document.getElementById("emailError").textContent = "Email format is incorrect";
        isValid = false;
    }

    if (inputPassword === "") {
        document.getElementById("passwordError").textContent = "Please enter your password";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
}

function login() {
    let inputEmail = document.getElementById("inputEmail").value;
    let inputPassword = document.getElementById("inputPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === inputEmail && u.password === inputPassword);

    if (user) {
        window.location.href = "../Exam page/exam.html";
    } else {
        document.getElementById("passwordError").textContent = "Invalid email or password";
    }

}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("inputEmail").addEventListener("input", function() {
        document.getElementById("emailError").textContent = "";
    });
    document.getElementById("inputPassword").addEventListener("input", function() {
        document.getElementById("passwordError").textContent = "";
    });
});


