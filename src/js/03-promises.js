import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });  
      } else {
        reject({ position, delay });  
      }
    }, delay);
      
  });
}

const form = document.querySelector(".form");

form.addEventListener("submit", onFormSubmit);
form.addEventListener('input', onInput);

let formData = {}; 

function onInput(event) {
 const name = event.target.name;
 const value = event.target.value;

    formData[name] = value; 
}

function onFormSubmit(event) {
  event.preventDefault();
  
  for (let i = 0; i < formData.amount; i += 1) {
    let delay = Number(formData.delay);
    let step = Number(formData.step);
    delay = delay + step * i;
    let position = i + 1;
 
    createPromise(position, delay).then(onFulfilled).catch(onRejected);
  
} 
}

function onFulfilled({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);


};

function onRejected({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`)
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}; 