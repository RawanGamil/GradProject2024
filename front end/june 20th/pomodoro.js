// variables
let workTitle = document.getElementById("work");
let breakTitle = document.getElementById("break");

let workTime = 25;
let breakTime = 5;

let seconds = "00";
let isPomodorPaused = false;
let intervalId;

let remainingSeconds = 0; // Variable to store remaining seconds when paused

// display
window.onload = () => {
  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = seconds;

  workTitle.classList.add("active");
};

// start timer
function start() {
  if (!isPomodorPaused) {
    // change button
    document.getElementById("start").style.display = "none";
    document.getElementById("pause").style.display = "block";
    document.getElementById("reset").style.display = "block";

    // start countdown
    startCountdown();
  } else {
    // If paused, resume countdown from remaining time
    isPomodorPaused = false;
    startCountdown();
  }
}

// Start countdown from remaining time
function startCountdown() {
  let totalSeconds;
  if (remainingSeconds === 0) {
    totalSeconds = workTime * 60;
  } else {
    totalSeconds = remainingSeconds;
  }

  intervalId = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML =
      seconds < 10 ? "0" + seconds : seconds;

    if (totalSeconds === 0) {
      clearInterval(intervalId);
      handleTimerEnd();
    } else {
      totalSeconds--;
    }
  }, 1000);
}

// pause timer
function pause() {
  isPomodorPaused = true;
  clearInterval(intervalId);
  remainingSeconds = calculateRemainingSeconds();
  document.getElementById("pause").style.display = "none";
  document.getElementById("start").style.display = "block";
}

// Reset timer and pause state
function reset() {
  clearInterval(intervalId);
  isPomodorPaused = false;
  remainingSeconds = 0;
  document.getElementById("start").style.display = "block";
  document.getElementById("pause").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = "00";
  workTitle.classList.add("active");
  breakTitle.classList.remove("active");
}

// Calculate remaining seconds based on current time
function calculateRemainingSeconds() {
  let minutes = parseInt(document.getElementById("minutes").innerHTML);
  let seconds = parseInt(document.getElementById("seconds").innerHTML);
  return minutes * 60 + seconds;
}

// Handle timer end
function handleTimerEnd() {
  if (workTitle.classList.contains("active")) {
    workTitle.classList.remove("active");
    breakTitle.classList.add("active");
    startCountdown();
  } else {
    workTitle.classList.add("active");
    breakTitle.classList.remove("active");
    startCountdown();
  }
}
