// Stopwatch functionality
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let lapCounter = 1;

function startStopwatch() {
  if (!timer) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    document.getElementById('startBtn').innerText = 'Pause';
  } else {
    clearInterval(timer);
    timer = null;
    document.getElementById('startBtn').innerText = 'Resume';
  }
}

function stopStopwatch() {
  clearInterval(timer);
  timer = null;
  document.getElementById('startBtn').innerText = 'Start';
}

function resetStopwatch() {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  lapCounter = 1;
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('startBtn').innerText = 'Start';
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  updateDisplay(elapsedTime);
}

function updateDisplay(time) {
  let ms = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  let displayString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
  document.getElementById('display').innerText = displayString;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

// Lap time functionality
function recordLap() {
  if (timer) {
    let lapTime = elapsedTime;
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'lap-time');
    listItem.innerHTML = `<span class="font-weight-bold">Lap ${lapCounter}</span>: ${formatTime(lapTime)}`;
    lapCounter++;
    document.getElementById('laps').appendChild(listItem);
  }
}

function formatTime(time) {
  let ms = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
}

