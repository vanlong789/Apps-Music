const activiLogin = document.querySelectorAll('.login-list__li');
const getLogin = document.querySelector('.postion');
const containerList = document.querySelectorAll('.container-scroll__hinden');
const tabFooter = document.querySelectorAll('.icon-list');
const playlist = document.querySelector('.playlist');
const cdMusic = document.querySelector('.cd');

const playIcon = document.querySelector('.player');
const humanMusic = document.querySelector('#human-music');
const nameMusic = document.querySelector('#name-music');
const audioMusic = document.querySelector('#audio');
const imgMusic = document.querySelector('.js-thumb');
const playMusic = document.querySelector('.btn-toggle-play');
const progress = document.querySelector('#progress');


const nextMusic = document.querySelector('.btn-next');
const prevMusic = document.querySelector('.btn-prev');
const repeatMusic = document.querySelector('.btn-repeat');
const ramdomMusic = document.querySelector('.btn-random');

const nameKeyLogin = document.querySelector('.login-list__span');
const postionOut = document.querySelector('.postion');


const fromArray = [];
const KEY_FROM = 'CKT_ARRAY';//tạo 1 biến key
const CALL_KEY_LOGIN = 'KEY_LOGIN'
const callBackKeyLogin = JSON.parse(localStorage.getItem(CALL_KEY_LOGIN))
console.log(callBackKeyLogin);


//nếu callBackeyLogin này mà khác null login bên trong sẽ được thực hiện
// tránh trường hợp người hacker không đăng nhập tài khoản mà trực tiếp 
// đăng nhập vào file music nó sẽ hiển thị trang rỗng
if(callBackKeyLogin !== null){

 // xử lý hiển thị thông tin tài khoản
 callKeyLogin(callBackKeyLogin)

 function callKeyLogin(input){
    nameKeyLogin.innerHTML = input[0].user

    postionOut.onclick = function(){
        window.location = "login.html";
        localStorage.removeItem(CALL_KEY_LOGIN);
        localStorage.removeItem(KEY_FROM);
    }
 }

 // xử lý nút đăng xuất
 let index = 0;
 function checkLogin(){
    index ++;
    if(index === 1){
        getLogin.classList.add('open');
    }else if(index === 2){
        getLogin.classList.remove('open');
        index = 0;
    }
 }


 // xử lý phần click các thanh chọn taskBar
 let tabIndex = 0;
 logicTabskBar(tabIndex);

 function onTaskBar(n){
    logicTabskBar(n);
 }

 function logicTabskBar(input){
    if(input <= 1){
        let i;
    for(i = 0; i<containerList.length; i++){
        containerList[i].style.display = "none";
    }
    for(i = 0; i<tabFooter.length; i++){
        tabFooter[i].classList.remove('activi-color');
    }
     containerList[input].style.display = "block";
     tabFooter[input].classList.add('activi-color');
    }
 }


 // xuất list bài hát
 const keyStore = 'CKT_MUSIC'
 let songMusic = JSON.parse(localStorage.getItem(keyStore))


 function render(input){
    const htmls = input.map(function(song,index){
        return `
        <div class="song" data-index="${index}">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
        </div>
        `
    })
    playlist.innerHTML = htmls.join("");
 }
 render(songMusic);



 //*************************************************** */

 // xử lý hiển thị bài , play bài , pause bài hát ...
 function editMusic(number){
    
    humanMusic.innerHTML = `${songMusic[number].singer}`;
    nameMusic.innerHTML = `${songMusic[number].name}`;
    imgMusic.style.backgroundImage = `url('${songMusic[number].image}')`;
    audioMusic.src = songMusic[number].path;
    
    // xử lý logic đổ màu lên danh sách bài hát
    function callSong(){
    for(let i = 0; i < songMusic.length ; i++){
        const callMusicRemove = playlist.querySelectorAll('.song')[i];
        callMusicRemove.classList.remove('active');
    }
    const callMusicAdd = playlist.querySelectorAll('.song')[number];
    callMusicAdd.classList.add('active');
   }
   callSong();


    let testPlay = 0;
    playMusic.onclick = function(){
    testPlay ++;
    if(testPlay == 1){
        audioMusic.play();
        playIcon.classList.add('playing');
        cdMusic.classList.add('playing');
    }else{
        audioMusic.pause();
        playIcon.classList.remove('playing');
        cdMusic.classList.remove('playing');
        testPlay = 0;
        }
    } 

    // xử lí lấy thời gian bài hát
    audioMusic.ontimeupdate = function(){
        if(audioMusic.duration){
            const returnTime = Math.floor((audioMusic.currentTime/audioMusic.duration)*100);
            progress.value = returnTime;
            
        }
    }
    // xử lý tua bài hát khi nghe
    progress.onchange = function(){
        const onchangeTimeMusic = (progress.value/100)*audioMusic.duration;
        audioMusic.currentTime = onchangeTimeMusic;
    }

    // xử lý thêm chỉ mục bài hát vào mảng rỗng
    // mục đích để khi reat lại nó vẫn dử lại bài đã nghe
    setTimeout(function(){
       fromArray.push(number);
       localStorage.setItem(KEY_FROM,JSON.stringify(fromArray))
    },1000)
 }


 //**********************************************-** */

 //xử lý logic Music gồm(tời bài hát , lùi bài,...)
  function logicMusic(n){

    // nhấn nút xử lý tời bài hát lên
    nextMusic.onclick = function(){
        n++;
        if(n > songMusic.length - 1){
            n = 0;
        }
        editMusic(n);
        audioMusic.play();
        playIcon.classList.add('playing');
        cdMusic.classList.add('playing');
    }

    // nhấn nút xử lý lùi bài hát xuống
    prevMusic.onclick = function(){
        n--;
        if(n < 0){
            n = songMusic.length - 1;
        }
        editMusic(n);
        audioMusic.play();
        playIcon.classList.add('playing');
        cdMusic.classList.add('playing');
    }
    
    //xử lý dữ nguyên bài hát
    let checkRepeat = 1;
    repeatMusic.onclick = function(){
    checkRepeat ++;
        if(checkRepeat === 2){
        repeatMusic.classList.add('active')
        audioMusic.onended = function(){
            if(audioMusic.currentTime == audioMusic.duration){
                n;
                editMusic(n);
                audioMusic.play();
            }
        }
       }else{
        repeatMusic.classList.remove('active')
        audioMusic.onended = function(){
            if(audioMusic.currentTime == audioMusic.duration){
                n++;
                editMusic(n);
                audioMusic.play();
            }
        }
        checkRepeat = 1;
       } 
    }

    //xử lí ramdom bài hát khi nghe
    let checkRamdom = 1;
    ramdomMusic.onclick = function(){
        checkRamdom ++;
        if(checkRamdom === 2){
            ramdomMusic.classList.add('active');
                audioMusic.onended = function(){
                    if(audioMusic.currentTime == audioMusic.duration){
                        let indexRamdom;
                    do{
                        indexRamdom = Math.floor(Math.random() * songMusic.length);
                    }while(indexRamdom === n)
                        n = indexRamdom;
                        editMusic(n);
                        audioMusic.play();
                    }
                }
        }else{
            ramdomMusic.classList.remove('active');
            audioMusic.onended = function(){
                if(audioMusic.currentTime == audioMusic.duration){
                    n++;
                    editMusic(n);
                    audioMusic.play();
                }
            }
            checkRamdom = 1;
        }
    }

    //xử lý sau khi hết bài hát nó sẽ phát bài tiếp theo
    audioMusic.onended = function(){
        if(audioMusic.currentTime == audioMusic.duration){
            n++;
            editMusic(n);
            audioMusic.play();
        }
    }
     editMusic(n)
 }



 //***************************************************** */

 // xử lý chọn bài hát trong danh sách
 function clickMusic(){

     // xử lý khi click vào bài hát
    playlist.onclick = function(e){
        const songNode = e.target.closest('.song:not(.active)');
        if(songNode || e.target.closest('.option')){
            //xử lý khi click khi chọn bài hát
            if(songNode){
                const valueNode = Number(songNode.getAttribute('data-index'));
                logicMusic(valueNode);
                audioMusic.play();
                playIcon.classList.add('playing');
                cdMusic.classList.add('playing');
            }
            
            //xử lý khi nhấn vào nút option
            if(e.target.closest('.option')){
               //logic
            }
        }
    }
 }

 clickMusic()

 
 // xử lý điều kiện ( sau khi load trang lại nó vẫn liệu lại bài hát đã nghe)
 const getFormIndex = JSON.parse(localStorage.getItem(KEY_FROM))
    if(getFormIndex === null){
        logicMusic(0);
    }else{
        const indexNumber = getFormIndex[getFormIndex.length -1];
        logicMusic(indexNumber);
    }
}