var formElement = document.querySelector('#form1')

if (formElement) {

    function validator (options) {
        options.rules.forEach(function (rule) {
            inputElement = formElement.querySelector(rule.selector);
            inputElement.onblur = function () {

                var errorElement = inputElement.parentElement.querySelector('.form-message');
                console.log(inputElement)
                var messageError = rule.test(inputElement.value);
                // console.log(inputElement)
                if (messageError) {
                    errorElement.innerText = messageError;
                } else {
                    errorElement.innerText = '';

                }
            }
        })
    }
}

validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}
validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            
        }
    }
}
validator.minLength = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            
        }
    }
}
validator.confirmPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            
        }
    }
}