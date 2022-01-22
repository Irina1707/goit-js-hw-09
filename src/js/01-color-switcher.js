const refs = {
    body: document.body,
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

const DELAY = 1000;
let colorIntervalID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

refs.startBtn.addEventListener('click', onColorStart);

refs.stopBtn.addEventListener('click', onColorStop);

function onColorStart() {
    
    colorIntervalID = setInterval(() => { refs.body.style.backgroundColor = getRandomHexColor() }, DELAY);
    refs.startBtn.disabled = true;
};

function onColorStop() {
    clearInterval(colorIntervalID);
    refs.startBtn.disabled = false;
};