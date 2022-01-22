import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    daysTimer: document.querySelector('.value[data-days]'),
    hoursTimer: document.querySelector('.value[data-hours]'),
    minutesTimer: document.querySelector('.value[data-minutes]'),
    secondsTimer: document.querySelector('.value[data-seconds]'),
};

refs.startBtn.disabled = true;

let timeDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeDate = selectedDates[0].getTime();
       if (options.defaultDate.getTime() >= timeDate) {
           window.alert("Please choose a date in the future");
           refs.startBtn.disabled = true;
       } else {
           refs.startBtn.disabled = false;
      }
      
    }   
};

flatpickr(refs.inputEl, options);

console.log(timeDate);

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;

        
    }

    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
        
            const deltaTime = timeDate - currentTime;
           
            const time = this.convertMs(deltaTime);
            this.onTick(time);
       
             if (deltaTime - 1000 <= 0) {
            clearInterval(this.intervalId);
                 this.isActive = false;
                 refs.startBtn.disabled = true;
        }       
            //const { days, hours, minutes, seconds } = convertMs(deltaTime);
            //this.onTick({ days, hours, minutes, seconds })
           
        }, 1000);
        
    }

    convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = this.addLeadingZero(Math.floor(ms / day));
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
        
    }
    
    addLeadingZero(value) {
    return String(value).padStart(2, "0");
}
}

const timer = new Timer({
    onTick: updateClockface,
});

function updateClockface({ days, hours, minutes, seconds }) {
    refs.daysTimer.innerHTML = days;
    refs.hoursTimer.innerHTML = hours;
    refs.minutesTimer.innerHTML = minutes;
    refs.secondsTimer.innerHTML = seconds;
}

refs.startBtn.addEventListener("click", timer.start.bind(timer));



