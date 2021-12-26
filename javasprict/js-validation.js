const form = document.querySelector('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const notiPassword = document.getElementById('notiPassword')


function checkError(input,message){
    var parentInput = input.parentElement;
    input.value = input.value.trim();
    parentInput.classList.add('error');
    parentInput.querySelector('small').innerText= message;
}

function checkSuccess(input){
    var parentInput = input.parentElement;
    input.value = input.value.trim();
    parentInput.classList.remove('error');
    parentInput.querySelector('small').innerText= '';
}

function forCheck(inputArr){
    let isRequired = false;
    inputArr.forEach(function (input) {
      if (input.value.trim() === "") {
        checkError(input, 'Trường này còn trống!');
        isRequired = true;
      } else {
        checkSuccess(input);
      }
    });
  
    return isRequired;
}

//xử lý Username
username.addEventListener('blur',function(){
    function checkUsername(input){
        if(input.value.trim() == ''){
            checkError(input,'Trường này còn trống!');
        }else{
            checkSuccess(input);
        }
    }
    checkUsername(username)
})

// xử lý form email
email.addEventListener('blur',function(){
    function checkEmail(input){
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(input.value.trim() === ''){
            checkError(input,'Trường này còn trống!')
        }else{
            if(re.test(input.value.trim())){
                checkSuccess(input);
                // let checkFindEmail = arrayForm.some(function(checkArray){
                //     if(input.value.trim() === checkArray.email){
                //         return true;
                //     }else{
                //         return false;
                //     }     
                // })
                // if(checkFindEmail === true){
                //     checkError(input,'Email này đã tồn tại vui lòng nhập lại')
                // }else{
                //     checkSuccess(input);
                // }
            }else{
                checkError(input,'Email nhập chưa chính xác!');
            }
        }
    }
    checkEmail(email);
})


// xử lý form password
let arrayPassword = [password,password2];
for(let i = 0; i<arrayPassword.length; i++){
    const attPassword = arrayPassword[i];
    attPassword.addEventListener('blur',function(){
        function checkPassword(input,min){
            if(input.value.trim() === ''){
                checkError(input,'Trường này còn thiếu !');
            }else{
                if(input.value.trim().length < min){
                    checkError(input, `Mật khẩu tối thiểu ${min} kí tự`);
                }else{
                    if(attPassword === arrayPassword[1]){
                        function checkcfPassword(password,password2){
                            if(password.value.trim() !== password2.value.trim()){
                                checkError(password2,'Mật khẩu không trùng khớp!');
                            }else{
                                checkSuccess(password2);
                                }
                        }
                        checkcfPassword(password,password2);
                    }else{
                        checkSuccess(attPassword);
                    }
                }
            }
        }
        checkPassword(attPassword,6)
    })
}
const arrayForm = [];
const keyLocal = 'Taikhoan';

form.addEventListener('submit',function(e){
    e.preventDefault();
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(!forCheck([username, email, password, password2])){
        if(regex.test(email.value.trim())){  
            function checkSomeEmail(input,pass){
                let checkFindEmail = arrayForm.some(function(checkArray){
                    if(input.value.trim() === checkArray.email){
                        return true;
                    }else{
                        return false;
                    }     
                })
                //console.log(checkFindEmail)
                if(checkFindEmail === true){
                    checkError(input,'Email này đã tồn tại vui lòng nhập lại')
                }else{
                    if(password.value.trim() === password2.value.trim()){
                        const concatObj = {
                            user: `${username.value}`,
                            email: `${email.value}`,
                            password: `${password.value}`
                        }
                        arrayForm.push(concatObj);
                        localStorage.setItem(keyLocal,JSON.stringify(arrayForm));
                        //console.log(arrayForm);
            
                        username.value = '';
                        email.value = '';
                        password.value = '';
                        password2.value = '';
                        alert('Tài khoản đã đăng kí thành công');
                    }else{
                        checkError(pass,'Mật khẩu không trùng khớp vui lòng nhập lại!')
                    }
                }
            }
            checkSomeEmail(email,password2)
        }
    }
})

const test = JSON.parse(localStorage.getItem(keyLocal));
if(test !== null){
    for(let i =0 ; i<test.length; i++){
        arrayForm.push(test[i]);
    }
}
