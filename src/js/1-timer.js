import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentTime = new Date();
    let userSelectedDate = selectedDates[0];
    if (userSelectedDate <= currentTime) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: 'rgba(239, 64, 64, 1.0)',
        progressBarColor: 'rgba(181, 62, 27, 1.0)',
        messageColor: 'rgba(255, 255, 255, 1.0)',
        iconColor: 'rgba(255, 255, 255, 1.0)',
        close: false,
      });
      elements.startButton.disabled = true;
    } else {
      elements.startButton.disabled = false;
      elements.datetimePicker.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer(targetDate) {
  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const difference = targetDate - currentTime;

    if (difference < 0) {
      elements.startButton.disabled = false;
      elements.datetimePicker.disabled = false;
      clearInterval(countdownInterval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);
    elements.days.textContent = addLeadingZero(days);
    elements.hours.textContent = addLeadingZero(hours);
    elements.minutes.textContent = addLeadingZero(minutes);
    elements.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? String(value).padStart(2, '0') : value;
}

elements.startButton.addEventListener('click', () => {
  const selectedDate = new Date(elements.datetimePicker.value).getTime();
  elements.startButton.disabled = true;
  elements.datetimePicker.disabled = true;
  startTimer(selectedDate);
});
