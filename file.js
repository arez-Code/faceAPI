const overLay = document.getElementById('overlay')
let video = document.getElementById('video')
const getPhoto = document.getElementById('getPhoto')
const takePhoto = document.getElementById('takePhoto')
const openWebCam = document.getElementById('webCam')
const doneBtn = document.getElementById('done')
const videoEl = $('#video').get(0)
let mediaStream;

async function onPlay() {
  
  if(videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
  return setTimeout(() => onPlay())
  
  const options = getFaceDetectorOptions()
  const result = await faceapi.detectSingleFace(videoEl, options)
  
  if (result) {
    const canvas = $('#overlay').get(0)
    const accuracy = result._score
    const dims = faceapi.matchDimensions(canvas, videoEl, true)
    faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
    
    if(accuracy >= 0.98){
      overLay.style.border = '10px solid green';
      takePhoto.disabled = false;
    }else{
      overLay.style.border = '10px solid red';
      takePhoto.disabled = true;
    }
  }
  
  setTimeout(() => onPlay())
}

async function run() {
  await faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
  changeInputSize(128)
  openWebCam.addEventListener('click', async ()=>{
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video : true,
    });
    const video = document.getElementById('video')
    video.srcObject = mediaStream;
  })
}

takePhoto.addEventListener('click',()=>{
  getPhoto.getContext('2d').drawImage(video, 0, 0, getPhoto.width , getPhoto.height);
  let image_data_irl = getPhoto.toDataURL('image/jpeg');
  const getValue = document.getElementById('user_photo');
  getValue.value = image_data_irl
})

const reset = document.getElementById('reset')
function remove(){
  const image = getPhoto.getContext('2d');
  const getValue = document.getElementById('user_photo');
  image.clearRect(0,0,getPhoto.width,getPhoto.height)
  if(getValue.value != ''){
    getValue.value = '';
  }
}

    function updateResults() {}

    $(document).ready(function() {
      renderNavBar('#navbar', 'webcam_face_detection')
      initFaceDetectionControls()
      run()
    })

    doneBtn.addEventListener('click', async () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
    });

  function showPassword(ev){
    var pwd_input = document.getElementById("pwd");
    var btn_text = document.getElementById("btn-label");
    var pwd_btn = document.getElementById("pwd-btn")
    
    ev.preventDefault();
    if(pwd_input.className === "group hide-input"){
      pwd_input.className += " show-input";
      btn_text.className += " hide-input";
      pwd_btn.className += " hide-input";
    }else{
      pwd_input.className = "group hide-input";
    }
  }




// popup js
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
});


// Enable/disable sign in button
let input = document.getElementById('user_photo').value;
let button = document.querySelector('button[name="signUp"]');
if (input === "") {
      button.disabled = true; //button remains disabled
    } else {
      button.disabled = false; //button is enabled
    }
