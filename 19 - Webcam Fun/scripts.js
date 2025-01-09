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
        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);

        pixels.globalAlpha = 0.1;

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

function redEffect(pixels){
    for( i = 0; i < pixels.data.length; i += 4){
        pixels.data[i + 0] = pixels.data[i + 0] +100;//red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;//green
        pixels.data[i + 2] = pixels.data[i + 2] * .5;//blue
    }

    return pixels;
}

function rgbSplit(pixels){
    for( i = 0; i < pixels.data.length; i += 4){
        pixels.data[i - 150] = pixels.data[i + 0] +100;//red
        pixels.data[i + 100] = pixels.data[i + 1] - 50;//green
        pixels.data[i - 350] = pixels.data[i + 2] * .5;//blue
    }

    return pixels;
}

function greenScreen(pixels){
    const levels = {};

    document.querySelectorAll('.rgb input').forEach(input => {
        levels[input.name] = input.value;
    });

    for(i = 0; i < pixels.data.length; i += 4){
        red = pixels[i + 0];
        green = pixels[i + 1];
        blue = pixels[i + 2];
        alpha = pixels[i + 3];

        //Here, making the vanishing the color that is selected from the slider
        if(red >= levels.rmin &&
           green >= levels.gmin &&
           blue >= levels.blue &&
           red <= levels.rmax &&
           blue <= levels.bmax &&
           green <= levels.gmax 
        )
        alpha = 0;
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);