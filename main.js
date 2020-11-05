function validator(options) {
    
    //Lấy element form
    var formElement = document.querySelector(options.form)
    var rulesSelector = {};
    
    //Kiểm tra value người dùng
    function validate(inputElement, rule) {
        var spanElement = inputElement.parentElement.querySelector(options.spanElement);
        var errorMessage;

        var rules = rulesSelector[rule.selector];
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        
        for (var i = 0; i < rulesSelector.lenght; ++i) {
            rulesSelector[i]
        }
                    
        if (errorMessage) {
            spanElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            spanElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }

        //Xử lý khi người dùng nhập vào input
        inputElement.oninput = function () {
            spanElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');

        }
    }

    if (formElement) {
        
        //Xử lý khi người dùng bấm submit
        formElement.onsubmit = function (e) {
            e.preventDefault();
            
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule);
                console.log(rule.selector + ': ' + inputElement.value)
            })

        }

        //Duyệt qua từng rule với sự kiện blur
        options.rules.forEach(function (rule) {
            if (Array.isArray(rulesSelector[rule.selector])) {
                rulesSelector[rule.selector].push(rule.test);
            } else {
                rulesSelector[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {

                //Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
            }
        })

        var passwordInput = formElement.querySelector(options.password); 
        var confirmPasswordInput = formElement.querySelector(options.confirmPassword);
        var spanElementConfirm = formElement.querySelector('#error');

            passwordInput.oninput = function () {
                // validate(passwordInput, options.rules[options.indexConfirmPasswordRule])
                spanElementConfirm.parentElement.classList.remove('invalid');
                spanElementConfirm.innerText = '';
            }

        
    }

}

//Danh sách các rules
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
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Email chưa hợp lệ. Xin vui lòng nhập lại !';
        }
    }
}

validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || 'Mật khẩu tối thiểu 8 ký tự';
        }
    }
}

validator.confirmPassword = function (selector, getPasswordValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getPasswordValue() ? undefined : message || 'Mật khẩu chưa trùng khớp';
        }
    }  
}