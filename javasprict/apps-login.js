const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form-2');
const notification = document.querySelector('.spacer');

const indexLoginForm = [];
const KEY_LOGIN = 'KEY_LOGIN';


/* tạo một fuction chưa thông tin sai */
function inputError(input,message){
    var parent = input.parentElement;
    input.value = input.value.trim();
    parent.classList.add('invalid');
    parent.querySelector('.form-message').innerHTML = message;
}

/* tạo một fuction chưa thông tin đúng */
function inputSuccess(input){
    var parent = input.parentElement;
    input.value = input.value.trim();
    parent.classList.remove('invalid');
    parent.querySelector('.form-message').innerHTML = ' ';
}


/* tạo funtion check form để kiểm tra khi submit nếu có 1 trường trống nó sẽ thông báo ra */
function checkFormInput(input){
    let checkBoolean = false;
    for(let i = 0; i<input.length; i++){
        if(input[i].value.trim() === ''){
            inputError(input[i],'Trường này còn trống!');
            checkBoolean = true;
        }else{
            inputSuccess(input[i])
        }
    }
    return checkBoolean;
}
 /* kiểm tra email khi nhập có đúng hay không */
email.addEventListener('blur',function(){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    function checkEmailInput(input){
        if(input.value.trim() === '')
        {
            inputError(input,'Trường này còn trống!');
        }
        else{
            if(re.test(input.value.trim())){
                inputSuccess(input);
            }else{
                inputError(input,'Email nhập không chính xác!');
            }
        }
    }
    checkEmailInput(email);
    notification.innerHTML = ' ';
})

 /* kiểm tra password khi nhập có đúng hay không */
password.addEventListener('blur',function(){
    function checkPassworrdInput(input, min){
        if(input.value.trim() === '')
        {
            inputError(input,'Trường này còn trống!');
        }
        else{
            if(input.value.trim().length < min){
                inputError(input,`Mật khẩu tối thiểu ${min} kí tự`);
            }else{
                inputSuccess(input);
            }
        }
    }
    checkPassworrdInput(password,6);
    notification.innerHTML = ' ';
})



/* sự kiện submit */
form.addEventListener('submit',function(e){
    e.preventDefault();
    const keyLocal = 'Taikhoan';
    // kiểm tra email , password có trống hay không
    if(!checkFormInput([email,password])){
        let inputEmail = email.value.trim();
        let inputPassword =password.value.trim();
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        //kiểm tra email , password khi submit nếu đúng yêu cầu hay chưa nó sẽ loạt vào
        if(regex.test(inputEmail) && inputPassword.length > 5){

            let arrayJosns = JSON.parse(localStorage.getItem(keyLocal));
            function checkLogin(gmail,pass){
                const findForm = arrayJosns.find(function(arrayJosn){
                    if(gmail === arrayJosn.email && pass === arrayJosn.password){
                        return true;
                    }else{
                        return false;
                    }
                })
                if(findForm !== undefined){
                    //alert('Bạn đã đăng nhập thành công');
                    notification.innerHTML = ' ';
                    //Logic khi đúng
                    window.location = "music.html";

                    // push vào mảng rỗng để up lên localsotore
                    indexLoginForm.push(findForm);
                    localStorage.setItem(KEY_LOGIN,JSON.stringify(indexLoginForm))
                }else{
                    notification.innerHTML = 'Email hoặc mật khẩu chưa chính xác vui lòng nhập lại';
                }
            }
            checkLogin(inputEmail,inputPassword)
        }else{
            //nếu sai yêu cầu
            notification.innerHTML = 'Email hoặc mật khẩu chưa chính xác vui lòng nhập lại';
        }
    }
})