const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio:false})//This will take the video from the webcam and pass a blob data
    .then(localMediaStream => {
        // console.log(localMediaStream);
        video.srcObject = localMediaStream;
        // video.src=window.URL.createObjectURL(localMediaStream);
        video.play();
    })
    .catch(err => {
            alert(`${err.message} - You've declined the camera permission`);
            console.log("You've denied the camera permission", err);
        });
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.height = height;
    canvas.width = width;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        //picking out image
        let pixels = ctx.getImageData(0, 0, width, height);
        
        //Applying effect
        pixels = redEffect(pixels);

        //Putting it back in the canvas
        ctx.putImageData(pixels);
    }, 16);
}

function takeSnap(){
    //Played the sound
    snap.currentTime = 0;
    snap.play();

    //Taking data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src=${data} alt="Handsome Man"/>`
    strip.insertBefore(link, strip.firstChild);//This is prepending(Inserting as the first element) in VanillaJS
}

function redEffect(){
    
}

getVideo();

video.addEventListener('canplay', paintToCanvas);