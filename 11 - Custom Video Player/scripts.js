//Call all the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Build function
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method](); //similar to video.play() and video.pause()
}

function UpdateButton(){
    const icon = this.paused ? '▶️' : '⏸️';//Press win + . for emojis
    toggle.textContent = icon;// To add something in the element
}

function skip(){
    console.dir(video);//If detail of an element is not showing, use console.dir to get the whole element
    video.currentTime += parseInt(this.dataset.skip);//To get value of the attribute written like data-something, use this.dataset.something
}

function updateRangeValue(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percentage = (this.currentTime/this.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;//flexBasis is a css element that we've used earlier and updating it now
}

function scrub(e){
    const scrubTime = (e.offsetX / this.offsetWidth) * video.duration;//offsetX will give mousePointer value of X axis and offsetWidth will give total width of the x axis. After division, we'll get a value which will be between 0 to 1 and we'll multiply that with the total duration
    video.currentTime = scrubTime;
}

//Hook Up the events
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', UpdateButton);
video.addEventListener('pause', UpdateButton);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', updateRangeValue))
ranges.forEach(range => range.addEventListener('mousemove', updateRangeValue))

video.addEventListener('timeupdate', handleProgress);//Timeupdate event will occur after every time change of the element

progress.addEventListener('click', scrub);

let mouseMoved = false;
progress.addEventListener('mousedown', mouseMoved = true);
progress.addEventListener('mouseUp', mouseMoved = false);

progress.addEventListener('mousemove', e => mouseMoved && scrub(e));//If it finds mouseMoved variable true, it'll go to scrub method with the event.