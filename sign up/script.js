var myForm = document.getElementById('btn') 
myForm.addEventListener('click', function(e){
    e.preventDefault();

    var firstName = document.getElementById('firstName')
    var lastName = document.getElementById('lastName')
    var email = document.getElementById('email')
    var password = document.getElementById('password')
    var confirmPassword = document.getElementById('confirmPassword')
  
      document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

    var nameRegex = /^[A-Za-z]{2,20}$/; // only letters, from 2–20
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email pattern
    var passwordRegex = /^[A-Za-z0-9]{6,}$/; // at least 6 chars (letters or numbers)

    //array of registered users
   
     users= JSON.parse(localStorage.getItem('users')) || []; 
 
     if (!Array.isArray(users)) {
   users = [users];
 }
 

 var hasError = false;

   if (firstName.value.trim() === '' || !nameRegex.test(firstName.value.trim())) {

     var fNameError= document.getElementById('firstNameError')
    fNameError.style.display = 'block';
    
    hasError = true;
  }

   if (lastName.value.trim() === '' || !nameRegex.test(lastName.value.trim())) {
    document.getElementById('lastNameError').style.display = 'block';
    hasError = true;
  }

   if (email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
    document.getElementById('emailError').style.display = 'block';
    hasError = true;
  }

   if (password.value.trim() === '' || !passwordRegex.test(password.value.trim())) {
    document.getElementById('passwordError').style.display = 'block';
    hasError = true;
  }


   if (confirmPassword.value.trim() === '' ) {
    document.getElementById('confirmPasswordError').style.display = 'block';
    hasError = true;
  }
  
  else if (confirmPassword.value.trim() !== password.value.trim()) {
  const confirmError = document.getElementById('confirmPasswordError');
  confirmError.textContent = 'Passwords do not match';
  confirmError.style.display = 'block';   
} else 
  {
   const confirmError = document.getElementById('confirmPasswordError');
  confirmError.style.display = 'none';
  confirmError.textContent = 'this field is required'; 
}
if (hasError) {
    return;
  }
   

  var newUser = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    };
  users.push(newUser)

  localStorage.setItem('users', JSON.stringify(users));
    console.log(users)
  window.location.href ="../signIn.html";
})

