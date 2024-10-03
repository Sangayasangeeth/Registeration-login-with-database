var form = document.getElementById("form");
var name1 = document.getElementById("name1");
var username = document.getElementById("username");
var gender = document.getElementById("gender");
var phonenum = document.getElementById("phonenum");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");

if (name1) {
    name1.addEventListener('input', validateName);
}
if (username) {
    username.addEventListener('input', validateUsername);
}
if (gender) {
    gender.addEventListener('change', validateGender); 
}
if (phonenum) {
    phonenum.addEventListener('input', validatePhonenum);
}
if (email) {
    email.addEventListener('input', validateEmail);
}
if (password) {
    password.addEventListener('input', validatePassword);
}
if (password2) {
    password2.addEventListener('input', validatePassword2);
}


form.addEventListener('submit', e => {
    if (!checkInput()) {
        e.preventDefault();
    }
});

function validateName() {
    var name1Value = name1.value.trim();
    if (name1Value === "") {
        setError(name1, "Name cannot be blank");
        return false;
    }
    else if(!/^.{3,}$/.test(name1Value)){
        setError(name1, "Must be minimum 3 characters")
        return false;
    }
     else {
        setSuccess(name1);
        return true;
    }
}

function validateUsername() {
    var usernameValue = username.value.trim();
    if (usernameValue === "") {
        setError(username, "Username cannot be blank");
        return false;
    } else if (!validUsername(usernameValue)) {
        setError(username, "Username must be 3-16 characters, letters, and numbers");
        return false;
    } else {
        setSuccess(username);
        return true;
    }
}

function validateGender() {
    if (gender.value === "Select") {
        setError(gender, "Choose a gender");
        return false;
    } else {
        setSuccess(gender);
        return true;
    }
}

function validatePhonenum() {
    var phonenumvalue = phonenum.value.trim();
    if (phonenumvalue === "") {
        setError(phonenum, "Phone number cannot be blank");
        return false;
    } else if (!validPhonenum(phonenumvalue)) {
        setError(phonenum, "Phone number must be 10 digits");
        return false;
    } else {
        setSuccess(phonenum);
        return true;
    }
}

function validateEmail() {
    var emailValue = email.value.trim();
    if (emailValue === "") {
        setError(email, "Email cannot be blank");
        return false;
    } else if (!validEmail(emailValue)) {
        setError(email, "Enter a valid email address");
        return false;
    } else {
        setSuccess(email);
        return true;
    }
}

function validatePassword() {
    var passwordValue = password.value.trim();
    if (passwordValue === "") {
        setError(password, "Password cannot be blank");
        return false;
    }
    else if(!/^.{5,}$/.test(password.value)){
        setError(password, "Password must be minimum 5 characters")
        return false;
    }
    else {
        setSuccess(password);
        return true;
    }
}

function validatePassword2() {
    var passwordValue = password.value.trim();
    var password2Value = password2.value.trim();
    if (password2Value === "") {
        setError(password2, "Confirm password cannot be blank");
        return false;
    } else if (passwordValue !== password2Value) {
        setError(password2, "Passwords do not match");
        return false;
    } else {
        setSuccess(password2);
        return true;
    }
}

function checkInput() {
    let isValid = true;
    if (name1 && !validateName()) isValid = false;
    if (username && !validateUsername()) isValid = false;
    if (gender && !validateGender()) isValid = false;
    if (phonenum && !validatePhonenum()) isValid = false;
    if (email && !validateEmail()) isValid = false;
    if (password && !validatePassword()) isValid = false;
    if (password2 && !validatePassword2()) isValid = false;
    return isValid;
}

function setError(input, message) {
    var parent = input.parentElement;
    var small = parent.querySelector("small");
    parent.className = "container2 error";
    small.innerText = message;
}

function setSuccess(input) {
    var parent = input.parentElement;
    parent.className = "container2 success";
}

function validPhonenum(phonenumvalue) {
    return /^[0-9]{10}$/.test(phonenumvalue);
}

function validEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
}

function validUsername(username) {
    return /^[a-zA-Z0-9_]{3,16}$/.test(username);
}
