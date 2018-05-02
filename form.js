function emailCheck() {
  var emailTemplate = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/;
  var emailAddress = window.email.value;
  var emailCheckResult = emailAddress.match(emailTemplate);
  if (emailCheckResult == null) {
    window.message.className = "displayYes";
  } else {
    window.message.className = "displayNo";
  }
}
// change style of typing in the password
function changePasswStyle(event) {
  if (event.target.id === "passwordStyle") {
    if (window.password.type === "password") {
      window.password.type = "text";
      window.passwordStyle.innerHTML = "Hide";
    } else {
      window.password.type = "password";
      window.passwordStyle.innerHTML = "Show";
    }
  } else if (event.target.id === "confirmPasswordStyle") {
    if (window.confirmPass.type === "password") {
      window.confirmPass.type = "text";
      window.confirmPasswordStyle.innerHTML = "Hide";
    } else {
      window.confirmPass.type = "password";
      window.confirmPasswordStyle.innerHTML = "Show";
    }
  }
}
// at least 8 symbols length;
function passwordLengthCheck() {
  var passwordVal = window.password.value;
  if (passwordVal.length < 8) {
    window.messageLength.className = "displayYes";
  } else {
    window.messageLength.className = "displayNo";
  }
}
// at least 1 uppercase;
// at least 1 number;
// either & or _ or $;
function passwordSymbolsCheck() {
  var passwordVal = window.password.value;
  var passwUp = /[A-Z]{1,}/;
  var passwNumb = /[0-9]{1,}/;
  var passwSymb = /\$|&|_{1,}/;
  var passwCheckUp = passwordVal.match(passwUp);
  var passwCheckNumb = passwordVal.match(passwNumb);
  var passwCheckSymb = passwordVal.match(passwSymb);
  if (passwCheckUp != null && passwCheckNumb != null && passwCheckSymb != null) {
    window.messageSymbols.className = "displayNo";
  } else {
    window.messageSymbols.className = "displayYes";
  }
}
// the password is confirmed;
function checkConfirmPass() {
  var passwordVal = window.password.value;
  var confirmPassVal = window.confirmPass.value;
  if (!passwordVal) {
    window.messageWritePass.className = "displayYes";
  } else if (passwordVal === confirmPassVal) {
      window.messageWritePass.className = "displayNo";
      window.messageConfirm.className = "displayNo";
      if (window.message.className === "displayNo" && 
      window.messageLength.className === "displayNo" &&
      window.messageSymbols.className === "displayNo" && 
      window.messageWritePass.className === "displayNo" && 
      window.messageConfirm.className === "displayNo") {
        window.submitButton.disabled = false;
    }
  } else {
      window.messageConfirm.className = "displayYes";
  }
}
// check the security question is in place and submit it to the server;
function securitySubmitCheck() {
  var securityQuestionVal = window.securityQuestion.value;
  var securityQuestRespVal = window.securityQuestResponse.value;
  if (securityQuestionVal !== 1 && securityQuestRespVal) {
    window.securityQuestion.name = "securityQuestion";
    window.securityQuestResponse.name = "securityQuestResp";
  }
}

function onLoad() {
  window.email = document.getElementById("email");
  window.password = document.getElementById("password");
  window.confirmPass = document.getElementById("confirmPass");
  window.submitButton = document.getElementById("submitButton");
  window.securityQuestion = document.getElementById("securityQuest");
  window.securityQuestResponse = document.getElementById("securityQuestResp");
  window.passwordStyle = document.getElementById("passwordStyle");
  window.confirmPasswordStyle = document.getElementById("confirmPasswordStyle");
  window.message = document.getElementById("message");
  window.messageLength = document.getElementById("messageLength");
  window.messageConfirm = document.getElementById("messageConfirm");
  window.messageSymbols = document.getElementById("messageSymbols");
  window.messageWritePass = document.getElementById("messageWritePass");

  window.email.addEventListener("blur", emailCheck);
  window.password.addEventListener("blur", passwordSymbolsCheck);
  window.password.addEventListener("blur", passwordLengthCheck);
  window.confirmPass.addEventListener("blur", checkConfirmPass);
  window.securityQuestion.addEventListener("blur", securitySubmitCheck);
  window.securityQuestResponse.addEventListener("blur", securitySubmitCheck);
  window.passwordStyle.addEventListener("click", changePasswStyle);
  window.confirmPasswordStyle.addEventListener("click", changePasswStyle);
}

module.exports = {
  emailCheck,
  passwordLengthCheck,
  onLoad,
  passwordSymbolsCheck,
  checkConfirmPass,
  changePasswStyle,
  securitySubmitCheck
};
