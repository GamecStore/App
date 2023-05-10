function validate(form) {

    document.getElementById('nameError').innerHTML = '';
    document.getElementById('name').style.border = '';
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('email').style.border = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('password').style.border = '';
    document.getElementById('confirmPasswordError').innerHTML = '';
    document.getElementById('confirmPassword').style.border = '';
    document.getElementById('dobError').innerHTML = '';
    document.getElementById('dob').style.border = '';
    document.getElementById('adminError').innerHTML = '';
    document.getElementById('admin').style.border = '';


    let error = true;
    if (form.name.value.trim() == '') {
        document.getElementById('nameError').innerHTML = 'Enter a user name';
        document.getElementById('nameError').style.color = 'red';
        document.getElementById('name').style.border = 'red solid 2px';
        error = false;
    }
    if (form.email.value.trim() == '') {
        document.getElementById('emailError').innerHTML = 'Enter an email';
        document.getElementById('emailError').style.color = "red";
        document.getElementById('email').style.border = 'red solid 2px';
        error = false;

    }
    if (form.password.value.trim() == '') {
        document.getElementById('passwordError').innerHTML = 'Enter your password';
        document.getElementById('passwordError').style.color = "red";
        document.getElementById('password').style.border = 'red solid 2px';
        error = false;

    }

    if (form.confirmPassword.value.trim() == '') {
        document.getElementById('confirmPasswordError').innerHTML = ' cannot be left empty';
        document.getElementById('confirmPasswordError').style.color = "red";
        document.getElementById('confirmPassword').style.border = 'red solid 2px';
        error = false;

    }


    if (form.confirmPassword.value !== form.password.value) {
        document.getElementById('confirmPasswordError').innerHTML = ' passwords need to match';
        document.getElementById('confirmPasswordError').style.color = "red";
        document.getElementById('confirmPassword').style.border = 'red solid 2px';
        console.log("hello");
        error = false;
    }


    if (form.password.value.length < 8 || form.password.value.length > 20) {
        document.getElementById('passwordError').innerHTML = 'Password must be between 8-20 characters long';
        document.getElementById('passwordError').style.color = "red";
        document.getElementById('password').style.border = 'red solid 2px';
        error = false;
    }



    let dobInput = document.getElementById("dob");

    let dobValue = dobInput.value;

    let dob = new Date(dobValue);

    let ageDiff = Date.now() - dob.getTime();
    let ageDate = new Date(ageDiff);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    // Check if the age is less than 18
    if (age < 18) {

        document.getElementById('dobError').innerText = 'You must be at least 18 years old to register.';
        document.getElementById('dobError').style.color = 'red';
        error = false;
    }

    if (!dobValue) {
        document.getElementById('dobError').innerText = 'You must enter a date of birth';
        document.getElementById('dobError').style.color = 'red';
        error = false;
    }

    if (!form.admin.checked && !form.user.checked) {
        document.getElementById('adminError').innerText = 'You must choose a user type';
        document.getElementById('adminError').style.color = 'red';
    }



    return error;





}


function validateSearch() {
    let error = true;

    if (document.getElementById('search').value === '') {
        document.getElementById('search').placeholder = 'Enter something';
        document.getElementById('search').style.border = "red solid 2px";
        error = false;
    }
    return error;
}

function validateLogin(form) {

    // document.getElementById('nameError').innerHTML = '';
    // document.getElementById('name').style.border = '';
    // document.getElementById('emailError').innerHTML = '';
    // document.getElementById('email').style.border = '';
    // document.getElementById('passwordError').innerHTML = '';
    // document.getElementById('password').style.border = '';



    let error = true;

    if (document.getElementById('email').value === '') {
        document.getElementById('emailError').innerHTML = 'Enter an email';
        document.getElementById('emailError').style.color = "red";
        document.getElementById('email').style.border = 'red solid 2px';
        error = false;

    }
    else {
        document.getElementById('emailError').innerHTML = '';
        document.getElementById('email').style.border = 'none';
    }
    if (document.getElementById('password').value.trim() === '') {
        document.getElementById('passwordError').innerHTML = 'Enter your password';
        document.getElementById('passwordError').style.color = "red";
        document.getElementById('password').style.border = 'red solid 2px';
        error = false;

    }
    else {
        document.getElementById('passwordError').innerHTML = '';
        document.getElementById('password').style.border = 'none';
    }
    return false;
}

function validateProfile() {

}

function validatePaymentDetails() {


}