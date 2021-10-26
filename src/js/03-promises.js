import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   form: document.querySelector('.form'),
   submitBtn: document.querySelector('button'), 
   delay: document.querySelector('input[name="delay"]'),
   step: document.querySelector('input[name="step"]'),
   amount: document.querySelector('input[name="amount"]'),

}

refs.submitBtn.addEventListener('click', getResult);

function createPromise(position, delay) {
  return new Promise ((resolve,reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  });
}

function getResult(evt) {
  evt.preventDefault();
  const firstDelay = Number(refs.delay.value);
  const delayStep = refs.step.value;
  const amount = refs.amount.value;
  let delay = firstDelay;

  for (let position = 1; position <= amount; position += 1){
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }); 

    delay = firstDelay +  delayStep * position;
  }

}

