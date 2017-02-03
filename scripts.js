//TODO event handler
// regular expressions for each input
var websiteRegex = /^[a-zA-Z0-9_.-]{2,16}$/;
var nameRegex = /^[a-zA-Z0-9.\s]{2,}$/;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex = /^[\s\S]{4,16}$/;
var creditCardRegex = /^[0-9\s]{16,20}$/;
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
var creditCardTypeError = 'Credit card type is not recognized.';
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
  var ccNumberWithNoSpaces = creditCardNumber.value.replace(/\s/g,'');
  if(visaRegex.test(ccNumberWithNoSpaces)){
    //document.getElementById('visa-radio').checked = true;
    disableCardImages('visa-label');
  }
  else if(mastercardRegex.test(ccNumberWithNoSpaces)){
    disableCardImages('mastercard-label');
  }
  else if(discoverRegex.test(ccNumberWithNoSpaces)){
    disableCardImages('discover-label');
  }
  else if(amexRegex.test(ccNumberWithNoSpaces)){
    disableCardImages('amex-label');
  }
  else{
    document.getElementById('visa-label').style.opacity = 0.25;
    document.getElementById('mastercard-label').style.opacity = 0.25;
    document.getElementById('discover-label').style.opacity = 0.25;
    document.getElementById('amex-label').style.opacity = 0.25;
  }
};

function disableCardImages(cardId) {
  var cardIdArray = ['visa-label','mastercard-label', 'discover-label',
  'amex-label'];
  for( var cnt = 0; cnt < 4; cnt ++){
    if(cardId === cardIdArray[cnt]){
      document.getElementById(cardIdArray[cnt]).style.opacity = 1;
    }
    else{
      document.getElementById(cardIdArray[cnt]).style.opacity = 0.25;
    }
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

function errorMsg(event,element,message){ //event is passed because firefox requires a handle
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

function validateForm (event){
  var websiteAddress = document.getElementById('website-input');
  var name = document.getElementById('name-input');
  var emailAddress = document.getElementById('email-input');
  var password = document.getElementById('password-input');
  var visaLabel = document.getElementById('visa-label');
  var creditCardNumber = document.getElementById('credit-card-input');
  var ccNumberWithNoSpaces = creditCardNumber.value.replace(/\s/g,'');
  var securityCode = document.getElementById('security-code-input');
  var expirationDateMonth = document.getElementById('expiration-month-input');
  var expirationDateYear = document.getElementById('expiration-year-input');
  var currentYear = new Date().getFullYear();

  if(websiteAddress.value.trim() === '' ||
  !websiteRegex.test(websiteAddress.value)){
    errorMsg(event,websiteAddress,websiteError);
    return false;
  }
  else if(name.value.trim() === '' || !nameRegex.test(name.value)){
    errorMsg(event,name,nameError);
    return false;
  }
  else if(emailAddress.value.trim() === '' ||
  emailRegex.test(emailAddress.value) === false){
    errorMsg(event,emailAddress,emailError);
    return false;
  }
  else if(password.value.trim() === '' ||
  !passwordRegex.test(password.value)){
    errorMsg(event,password,passwordError);
    return false;
  }
  else if(creditCardNumber.value.trim() === '' ||
  !creditCardRegex.test(creditCardNumber.value)){
    errorMsg(event,creditCardNumber,creditCardError);
    return false;
  }
  else if(!visaRegex.test(ccNumberWithNoSpaces) &&
  !mastercardRegex.test(ccNumberWithNoSpaces) &&
  !discoverRegex.test(ccNumberWithNoSpaces) &&
  !amexRegex.test(ccNumberWithNoSpaces)){
    errorMsg(event,visaLabel,creditCardTypeError);
    return false;
  }
  else if(securityCode.value.trim() === '' ||
  !securityRegex.test(securityCode.value)){
    errorMsg(event,securityCode,securityCodeError);
    return false;
  }
  else if(expirationDateYear.value.trim() === '' ||
  !expirationYearRegex.test(expirationDateYear.value) ||
  expirationDateYear.value > (currentYear + 5) ||
  expirationDateYear.value < currentYear){
    errorMsg(event,expirationDateYear,expirationYearError);
    return false;
  }

};
