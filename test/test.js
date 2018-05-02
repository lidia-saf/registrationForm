var assert = require("chai").assert;
var expect = require("chai").expect;
var form = require('../form.js');
var emailCheck = require('../form.js').emailCheck;

describe('emailCheck', _=> {
  it('should return a message.className = displayYes', () => {
    // When
    window.email = {value: 'lidia@'}
    window.message = {className: "displayNo"}
    emailCheck();
    //Then
    assert.equal(window.message.className,"displayYes");

  })
  it('should return a message.className = displayNo', () => {
    // When
    window.email = {value: 'lidia@gmail.com'}
    window.message = {className: "displayNo"}
    form.emailCheck();
    //Then
    assert.equal(window.message.className,"displayNo");
  })
})

describe('passwordLengthCheck', _=> {
  it('should return a messageLength.className = displayYes', () => {
    // When
    window.password = {value: '1234'}
    window.messageLength = {className: "displayNo"}
    form.passwordLengthCheck();
    //Then
    assert.equal(window.messageLength.className,"displayYes");
  })
  it('should return a messageLength.className = displayNo', () => {
    // When
    window.password = {value: '12345678'}
    window.messageLength = {className: "displayNo"}
    form.passwordLengthCheck();
    //Then
    assert.equal(window.messageLength.className,"displayNo");
  })
})

describe('passwordSymbolsCheck', _=> {
  it('should return a messageSymbols.className = displayYes', () => {
    // When
    window.password = {value: '12345678'}
    window.messageSymbols = {className: "displayNo"}
    form.passwordSymbolsCheck();
    //Then
    assert.equal(window.messageSymbols.className,"displayYes");
  })
  it('should return a messageSymbols.className = displayYes', () => {
    // When
    window.password = {value: '12345678I'}
    window.messageSymbols = {className: "displayNo"}
    form.passwordSymbolsCheck();
    //Then
    assert.equal(window.messageSymbols.className,"displayYes");
  })
  it('should return a messageSymbols.className = displayYes', () => {
    // When
    window.password = {value: '12345678&'}
    window.messageSymbols = {className: "displayNo"}
    form.passwordSymbolsCheck();
    //Then
    assert.equal(window.messageSymbols.className,"displayYes");
  })
  it('should return a messageSymbols.className = displayYes', () => {
    // When
    window.password = {value: 'uuuuuuuuu$'}
    window.messageSymbols = {className: "displayNo"}
    form.passwordSymbolsCheck();
    //Then
    assert.equal(window.messageSymbols.className,"displayYes");
  })

  it('should return a messageSymbols.className = displayNo', () => {
    // When
    window.password = {value: '1234567K$'}
    window.messageSymbols = {className: "displayNo"}
    form.passwordSymbolsCheck();
    //Then
    assert.equal(window.messageSymbols.className,"displayNo");
  })
})

describe('checkConfirmPass', _=> {
  it('should return a messageWritePass.className = displayYes', () => {
    // When
    window.password = {value: ''}
    window.confirmPass = {value: '12345K$'}
    window.messageWritePass= {className: "displayNo"}
    form.checkConfirmPass();
    //Then
    assert.equal(window.messageWritePass.className,"displayYes");
  })
  it('should return a messageConfirm.className = displayYes', () => {
    // When
    window.password = {value: '1234567K$'}
    window.confirmPass = {value: '12345K$'}
    window.messageConfirm = {className: "displayNo"}
    form.checkConfirmPass();
    //Then
    assert.equal(window.messageConfirm.className,"displayYes");
  })
  it('should return a messageConfirm.className = displayNo', () => {
    // When
    window.password = {value: '1234567K$'}
    window.confirmPass = {value: '1234567K$'}
    window.messageConfirm = {className: "displayNo"}
    window.submitButton = {disabled: true}
    form.checkConfirmPass();
    //Then
    assert.equal(window.messageConfirm.className,"displayNo");
  })
  it('should return a submitButton.disabled = false', () => {
    // When
    window.password = {value: '1234567K$'}
    window.confirmPass = {value: '1234567K$'}
    window.messageConfirm = {className: "displayNo"}
    window.submitButton = {disabled: true}
    window.message = {className: "displayNo"}
    window.messageLength = {className: "displayNo"}
    window.messageSymbols = {className: "displayNo"}
    window.messageWritePass = {className: "displayNo"}
    window.messageConfirm = {className: "displayNo"}
    form.checkConfirmPass();
    //Then
    assert.equal(window.submitButton.disabled,false);
  })
})

describe('changePasswStyle', _=> {
  it('should return a type of password.type = text', () => {
    // Given
    var event = {target: {id: 'passwordStyle'}}
    window.password = {type: 'password'}
    window.passwordStyle = {innerHTML: 'Show'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.password.type,"text");
  })
  it('should return a passwordStyle.innerHTML = Hide', () => {
    // Given
    var event = {target: {id: 'passwordStyle'}}
    window.password = {type: 'password'}
    window.passwordStyle = {innerHTML: 'Show'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.passwordStyle.innerHTML, "Hide");
  })
  it('should return a password.type = password', () => {
    // Given
    var event = {target: {id: 'passwordStyle'}}
    window.password = {type: 'text'}
    window.passwordStyle = {innerHTML: 'Hide'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.password.type,"password");
  })
  it('should return a passwordStyle.innerHTML = Show', () => {
    // Given
    var event = {target: {id: 'passwordStyle'}}
    window.password = {type: 'text'}
    window.passwordStyle = {innerHTML: 'Hide'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.passwordStyle.innerHTML, "Show");
  })
  it('should return a confirmPass.type = "text"', () => {
    // Given
    var event = {target: {id: 'confirmPasswordStyle'}}
    window.confirmPass = {type: 'password'}
    window.confirmPasswordStyle = {innerHTML: 'Show'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.confirmPass.type, "text");
  })
  it('should return a confirmPasswordStyle.innerHTML = "Hide"', () => {
    // Given
    var event = {target: {id: 'confirmPasswordStyle'}}
    window.confirmPass = {type: 'password'}
    window.confirmPasswordStyle = {innerHTML: 'Show'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.confirmPasswordStyle.innerHTML, "Hide");
  })
  it('should return a confirmPass.type = "password"', () => {
    // Given
    var event = {target: {id: 'confirmPasswordStyle'}}
    window.confirmPass = {type: 'text'}
    window.confirmPasswordStyle = {innerHTML: 'Hide'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.confirmPass.type, "password");
  })
  it('should return a confirmPasswordStyle.innerHTML = "Show"', () => {
    // Given
    var event = {target: {id: 'confirmPasswordStyle'}}
    window.confirmPass = {type: 'text'}
    window.confirmPasswordStyle = {innerHTML: 'Hide'}
    // When
    form.changePasswStyle(event);
    //Then
    assert.equal(window.confirmPasswordStyle.innerHTML, "Show");
  })
})

describe("securitySubmitCheck", _=> {
  it('should return a securityQuestion.name = "securityQuestion"', () => {
    //Given
    window.securityQuestion = {value: "value2"}
    window.securityQuestResponse = {value: "answer"}
    //When
    form.securitySubmitCheck()
    //Then
    assert.equal(window.securityQuestion.name, "securityQuestion")
  })
  it('should return a securityQuestResponse.name = "securityQuestResp"', () => {
      //Given
      window.securityQuestion = {value: "value2"}
      window.securityQuestResponse = {value: "answer"}
      //When
      form.securitySubmitCheck()
      //Then
      assert.equal(window.securityQuestResponse.name, "securityQuestResp")
  })
})

var EVENT_LIST = [
  {
    id: "email",
    eventName: "blur",
    callBack: form.emailCheck
  },
  {
    id: "password",
    eventName: "blur",
    callBack: form.passwordSymbolsCheck
  },
  {
    id: "password",
    eventName: "blur",
    callBack: form.passwordLengthCheck
  },
  {
    id: "confirmPass",
    eventName: "blur",
    callBack: form.checkConfirmPass
  },
  {
    id: "securityQuest",
    eventName: "blur",
    callBack: form.securitySubmitCheck
  },
  {
    id: "securityQuestResp",
    eventName: "blur",
    callBack: form.securitySubmitCheck
  },
  {
    id: "passwordStyle",
    eventName: "click",
    callBack: form.changePasswStyle
  },
  {
    id: "confirmPasswordStyle",
    eventName: "click",
    callBack: form.changePasswStyle
  }
]

describe("onLoad", _=> {
  it('should call addEventListener for email', () =>{
    //Given
    var calledEventList = []
    window.document.getElementById = function(id) {
      return {
        addEventListener: function (eventName, callBack) {
          calledEventList.push({id, eventName, callBack});
        }
      }
    }
    //When
    form.onLoad()
    //Then
    assert.equal(EVENT_LIST.length, calledEventList.length);
    for (var i = 0; i < EVENT_LIST.length; ++i){
      expect(EVENT_LIST[i]).to.deep.equal(calledEventList[i]);
    } 
      }
  )

})




