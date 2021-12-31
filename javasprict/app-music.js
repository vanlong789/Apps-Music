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



const dashboard = document.querySelector('.dashboard');
const buttonCheck = document.querySelector('.login-check__button');
const logincheck = document.querySelector('.login-check');
const searchInput = document.querySelector('.listSearch-input');
const callIndexMusic = document.querySelector('.listMusic-call');

const clockMusic = document.querySelector('.clockMusic');
const clickClock = document.querySelector('.listClock-link');
const toptreding = document.querySelector('.top-graph__block');


const fromArray = [];
const arrayTopTreding = [];
const TRENDING_MUSIC = 'TRENDING_MUSIC'
const KEY_FROM = 'CKT_ARRAY';//tạo 1 biến key
const CALL_KEY_LOGIN = 'KEY_LOGIN'
const callBackKeyLogin = JSON.parse(localStorage.getItem(CALL_KEY_LOGIN))
const getFormIndex = JSON.parse(localStorage.getItem(KEY_FROM))



//xử lý bật tắt đổi màu background
logincheck.onclick = function(){
    buttonCheck.classList.toggle('open');
    dashboard.classList.toggle('open');
}




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
    if(input <= 4){
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




    // xử lí bảng xếp hảng bài hát
    setTimeout(function(){
        arrayTopTreding.splice(0,arrayTopTreding.length);
    },1000)
   setTimeout(function(){
        const getArrayStorage = JSON.parse(localStorage.getItem(KEY_FROM))

    //đếm số lần xuất hiện trong array
        function count_element_in_array(array, x){
            let count = 0;
            for(let i=0;i<array.length;i++){
                if(array[i]==x) //Tìm thấy phần tử giống x trong mảng thì cộng biến đếm
                count ++;
            }
            arrayTopTreding.push({
                IndexSong: `${x}`,
                repeatSong: `${count}`
            })

            localStorage.setItem(TRENDING_MUSIC,JSON.stringify(arrayTopTreding))
            // sắp xếp giảm dân array trong mảng arraytoptreding
            const getTrendingMusic = JSON.parse(localStorage.getItem(TRENDING_MUSIC))
            setTimeout(function(){
                const sortArrayStorage = getTrendingMusic.sort((a,b) =>{
                    return b.repeatSong - a.repeatSong;
                })
                
                //dung array map để lặp và in ra màn hình
                const mapArraySort = sortArrayStorage.map((value,index) => {
                    return `
                    <div class="song" data-index="">
                        <div class="top-graph__noti">
                            <h2>${index + 1}</h2>
                        </div>
                        <div class="thumb" style="background-image: url('${songMusic[value.IndexSong].image}')"></div>
                        <div class="body">
                            <h3 class="title">${songMusic[value.IndexSong].name}</h3>
                            <p class="author">${songMusic[value.IndexSong].singer}</p>
                        </div>
                        <div class="option-trending">
                            <span class="option-span">${value.repeatSong}</span>
                            <i class="bi bi-heart-fill"></i>
                        </div>
                    </div>
                    `
                })
                toptreding.innerHTML = mapArraySort.join("");//in ra màn hình html
            },1000)
        }
    /*Xóa phần tử trùng nhau và lấy các phần tử duy nhất*/
        let arrayWithNoDuplicates = getArrayStorage.reduce(function (accumulator, element) {
        if (accumulator.indexOf(element) === -1) {
            accumulator.push(element)
        }
            return accumulator
        }, [])
    
    
    /*đếm số lần xuất hiện của các phần tử duy nhất*/
        for (let i = 0; i < arrayWithNoDuplicates.length; i++){
            count_element_in_array(getArrayStorage, arrayWithNoDuplicates[i]);
        } 
            
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
                audioMusic.currentTime = 1;
            }
        }
       }else{
        repeatMusic.classList.remove('active')
        audioMusic.onended = function(){
            if(audioMusic.currentTime == audioMusic.duration){
                n++;
                editMusic(n);
                audioMusic.play();
                audioMusic.currentTime = 1;
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
                            audioMusic.currentTime = 1;
                    }
                }
        }else{
            ramdomMusic.classList.remove('active');
            audioMusic.onended = function(){
                if(audioMusic.currentTime == audioMusic.duration){
                    n++;
                    editMusic(n);
                    audioMusic.play();
                    audioMusic.currentTime = 1;
                }
            }
            checkRamdom = 1;
        }
    }

    //xử lý sau khi hết bài hát nó sẽ phát bài tiếp theo
    audioMusic.onended = function(){
        if(audioMusic.currentTime == audioMusic.duration){
            n++;
            if(n > songMusic.length - 1){
                n = 0;
                editMusic(n);
                audioMusic.currentTime = 1;
                audioMusic.pause()
                playIcon.classList.remove('playing');
                cdMusic.classList.remove('playing');
            }else{
                editMusic(n);
                audioMusic.currentTime = 1;
                audioMusic.play();   
            }        
        }
    }
     editMusic(n)
 }



 //***************************************************** */
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


    // xử lý phần tìm kiếm bài hát

    function searchMusicIndex(indexValue){
        // dùng hàm filter để tìm kiếm nếu tìm thấy cái phần tử giống nhau sẽ được in ra
        const filterIndex = songMusic.filter(value => {
            if(indexValue.toLowerCase() === value.name.toLowerCase() || indexValue.toLowerCase() === value.singer.toLowerCase()){
                return true;
            }else{
                return false;
            }
        })
        //nếu filter bằng false tức là trong mảng đó o có phần tử nó yên cho mình một cái thông tin
        if(filterIndex.length === 0){
            callIndexMusic.innerHTML = "Không tìm thấy bài hát!!!"
        }else{//ngược lại nếu bằng true nó sẽ ra danh sách cho mình
            const mapIndex = filterIndex.map((value,index) =>{
                return `
                     <div class="song song-callback" index-data="${index}" data-name="${value.name}">
                        <div class="thumb thumb-callback" style="background-image: url('${value.image}')">
                        </div>
                        <div class="body">
                          <h3 class="title title-callback">${value.name}</h3>
                          <p class="author author-callback">${value.singer}</p>
                        </div>
                    </div>
                `;
            })
            callIndexMusic.innerHTML = mapIndex.join("");
        }

        //khi bạn click vào bài hát được tìm kiếm nó sẽ in cho bạn một cái attchibiu
        callIndexMusic.onclick = function(e){
            const searchIndexcallBackMusic = e.target.closest('.song:not(.active)')
            //nếu không cick vào bài hát đc active thì nó sẽ dược loạt vào
            if(searchIndexcallBackMusic){   
                const indexDataNode = Number(searchIndexcallBackMusic.getAttribute('index-data')); 
                const getDataNode = callIndexMusic.querySelectorAll('.song')[indexDataNode];          
                const valueDataName = searchIndexcallBackMusic.getAttribute('data-name');   
                //dùng array find để tìm kiếm trong array list music          
                const checkDataName = songMusic.find((value,index) =>{
                    if(value.name === valueDataName){
                        value.Index = index;
                        return true;                       
                    }
                })
                logicMusic(checkDataName.Index);
                //console.log( checkDataName.Index);
                //console.log( indexDataNode);
                for(let i = 0; i < callIndexMusic.querySelectorAll('.song').length ; i++){
                    const removeClild = callIndexMusic.querySelectorAll('.song')[i];
                    removeClild.classList.remove('active');
                }
                getDataNode.classList.add('active');    
                audioMusic.play();
                playIcon.classList.add('playing');
                cdMusic.classList.add('playing');           
            }            
        }
    }

    searchInput.onchange = function(){
        searchMusicIndex(searchInput.value)
    } 



    //xử lí lịch sử đã nghe nhạc
    if(getFormIndex !== null && getFormIndex.length > 1){
        for(let i=0;i < getFormIndex.length - 1;i++){
            fromArray.push(getFormIndex[i]);
        }
    }

    if(getFormIndex !== null){
        const clockIndex = getFormIndex.map(index => {
            return `
                <div class="song song-callback">
                    <div class="thumb thumb-callback" style="background-image: url('${songMusic[index].image}')"></div>
                    <div class="body">
                        <h3 class="title title-callback">${songMusic[index].name}</h3>
                        <p class="author author-callback">${songMusic[index].singer}</p>
                    </div>
                </div>
            `
        })
        
        clockMusic.innerHTML = clockIndex.join("");
    }

    clickClock.onclick = function(){
        clockMusic.classList.toggle('open');
    }


 // xử lý điều kiện ( sau khi load trang lại nó vẫn liệu lại bài hát đã nghe)
    //console.log(getFormIndex)
    if(getFormIndex === null){
        logicMusic(0);
    }else{
        const indexNumber = getFormIndex[getFormIndex.length -1];
        logicMusic(indexNumber);
    }
}