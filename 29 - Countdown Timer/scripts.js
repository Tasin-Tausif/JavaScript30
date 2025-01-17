let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //Clearing the time before any time starts
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000; // We'll get 'now' in ms. For that multiplying with 1000
    // console.log({now, then});//If assigned like this, it'll create an object and will be displayed according to var name and value

    displayTime(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);

        if(secondsLeft < 0){
            clearInterval(countdown);//We need to pass the setInterval method using a variable here to stop the interval.
            return;
        }
        displayTime(secondsLeft);
    }, 1000);
}

function displayTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`

    timerDisplay.textContent = display;
    document.title = display;//this will update the title of current tab in window
}

function displayEndTime(timeStamp){
    const end = new Date(timeStamp);//Creating a date object that has some builtIn methods like, getHours, getMonth(), getDate() etc
    const hour = end.getHours();
    const minute = end.getMinutes();
    
    endTime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${minute < 10 ? '0' : ''}${minute}`;
}

function startTimer(){
    timer(parseInt(this.dataset.time));//Since dataset property returns every value in string, it need to convert it into integer
}

buttons.forEach(button => button.addEventListener('click', startTimer));
//we can call a single element with it's name property like this. And we can also retrieve it's nested elements with their name properties like name.name.name
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;

    timer(mins * 60);
    this.reset();//This will clear the form values after submit event occurs
})