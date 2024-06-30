import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (evt) {
  evt.preventDefault();
  const delay = document.querySelector('input[name="delay"]').value;
  const state = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        messageColor: 'rgba(255, 255, 255, 1.0)',
        color: 'rgba(89, 161, 13, 1.0)',
        progressBarColor: 'rgba(50, 97, 1, 1.0)',
        icon: '',
        close: false,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        messageColor: 'rgba(255, 255, 255, 1.0)',
        color: 'rgba(239, 64, 64, 1.0)',
        progressBarColor: 'rgba(181, 27, 27, 1.0)',
        icon: '',
        close: false,
      });
    });
});
