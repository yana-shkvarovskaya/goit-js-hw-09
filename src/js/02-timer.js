import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');

let selectedDate = 0;
let intervalId = null;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = new Date();
        if(selectedDates[0] - currentTime > 0){
        selectedDate = selectedDates[0].getTime();
        startBtn.disabled = false;
        } else {
        startBtn.disabled = true;
        Notify.failure('Please choose a date in the future');
        }
    },
  };

  const fp = flatpickr('#datetime-picker', options);

  startBtn.addEventListener('click', startTimer);

  function startTimer() {
   let intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedDate - currentTime;
        const timeDiffer = convertMs(deltaTime);
        updateClockface(timeDiffer);
  }, 1000);
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (ms <= 0) {
        clearInterval(intervalId);
        ms = 0;
      }
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }


  function updateClockface({ days, hours, minutes, seconds }) {
   document.querySelector('span[data-days]').textContent = days;
   document.querySelector('span[data-hours]').textContent = hours;
   document.querySelector('span[data-minutes]').textContent = minutes;
   document.querySelector('span[data-seconds]').textContent = seconds;
  }
