function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const startBtn = document.querySelector('button[data-start]');
  const stopBtn = document.querySelector('button[data-stop]');
  let timerId = null;
  const body = document.querySelector("body");


  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    timerId = setInterval(() => {
       body.style.backgroundColor = getRandomHexColor();
    }, 1000);
   
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
  });

