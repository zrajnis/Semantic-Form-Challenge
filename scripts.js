// regular expressions for each input
var websiteRegex = /^[a-zA-Z0-9_.-]{2,16}$/;
var nameRegex = /^[a-zA-Z0-9.\s]{2,}$/;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex = /^[\s\S]{4,16}$/;
var creditCardRegex = /^[0-9]{16,16}$/;
var securityRegex = /^[0-9]{3,4}$/;
var expirationYearRegex = /^[0-9]{4,4}$/;

//regular expressions for credit card types
var visaRegex = /^4[0-9]{6,}$/;
var mastercardRegex = /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/;
var discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{3,}$/;
var amexRegex = /^3[47][0-9]{5,}$/;

//error messages for each container
var websiteError = 'Please enter a valid website address.';
var nameError = 'Please enter a valid name.';
var emailError = 'Please enter a valid email address.';
var passwordError = 'Password must be 4-16 characters long.';
var creditCardError = 'Please enter a valid credit card number.';
var securityCodeError = 'Please enter valid securityCode number.';
var expirationYearError = 'Please enter valid expiration year.';

// elements that will dynamically be created to form error message
var errorContainer = document.createElement('div');
    errorContainer.id = 'error-container';
    errorContainer.style.display = 'none';
var imgContainer = document.createElement('span');
    imgContainer.id = 'warning-img-container';
    imgContainer.style.display = 'none';
var image = new Image(2,16);
    image.setAttribute('src', './images/warning-icon.png');
    image.setAttribute('alt', 'warning');
    image.setAttribute('class', 'warning-img');
var label = document.createElement('label');

function determineCardType() {
  var creditCardNumber = document.getElementById('credit-card-input');
  if(visaRegex.test(creditCardNumber.value) === true){
    document.getElementById('visa-radio').checked = true;
  }
  else if(mastercardRegex.test(creditCardNumber.value) === true){
    document.getElementById('mastercard-radio').checked = true;
  }
  else if(discoverRegex.test(creditCardNumber.value) === true){
    document.getElementById('discover-radio').checked = true;
  }
  else if(amexRegex.test(creditCardNumber.value) === true){
    document.getElementById('amex-radio').checked = true;
  }
  else{
    document.getElementById('visa-radio').checked = false;
    document.getElementById('mastercard-radio').checked = false;
    document.getElementById('discover-radio').checked = false;
    document.getElementById('amex-radio').checked = false;
  }
}

function toggleVisibility() {
  var passwordInput = document.getElementById('password-input');
  if(passwordInput.type == 'password'){
    passwordInput.type = 'text';
  }
  else{
    passwordInput.type = 'password';
  }
};

function errorMsg(element,message){
  event.preventDefault();
  imgContainer.style.display = 'inline-block';
  label.className = 'error';
  label.textContent = message;
  errorContainer.style.display = 'block';
  if(element.id === 'security-code-input' || element.id === 'expiration-year-input'){
    //to prevent inputs moving, show message at the bottom of fieldset
    element = document.getElementById('expiration-date-label');
    element = element.parentElement;
  }

  element.parentElement.appendChild(errorContainer);
  errorContainer.appendChild(imgContainer);
  imgContainer.appendChild(image);
  errorContainer.appendChild(label);
};

function validateForm (){
  var websiteAddress = document.getElementById('website-input');
  var name = document.getElementById('name-input');
  var emailAddress = document.getElementById('email-input');
  var password = document.getElementById('password-input');
  var creditCardNumber = document.getElementById('credit-card-input');
  var securityCode = document.getElementById('security-code-input');
  var expirationDateMonth = document.getElementById('expiration-month-input');
  var expirationDateYear = document.getElementById('expiration-year-input');
  var currentYear = new Date().getFullYear();

  if(websiteAddress.value.trim() === '' ||
  websiteRegex.test(websiteAddress.value) === false){
    errorMsg(websiteAddress,websiteError);
    return false;
  }
  else if(name.value.trim() === '' ||
  nameRegex.test(name.value) === false){
    errorMsg(name,nameError);
    return false;
  }
  else if(emailAddress.value.trim() === '' ||
  emailRegex.test(emailAddress.value) === false){
    errorMsg(emailAddress,emailError);
    return false;
  }
  else if(password.value.trim() === '' ||
  passwordRegex.test(password.value) === false){
    errorMsg(password,passwordError);
    return false;
  }
  else if(creditCardNumber.value.trim() === '' ||
  creditCardRegex.test(creditCardNumber.value) === false){
    errorMsg(creditCardNumber,creditCardError);
    return false;
  }
  else if(securityCode.value.trim() === '' ||
  securityRegex.test(securityCode.value) === false){
    errorMsg(securityCode,securityCodeError);
    return false;
  }
  else if(expirationDateYear.value.trim() === '' ||
  expirationYearRegex.test(expirationDateYear.value) === false ||
  expirationDateYear.value > (currentYear + 5) ||
  expirationDateYear.value < currentYear){
    errorMsg(expirationDateYear,expirationYearError);
    return false;
  }
};
