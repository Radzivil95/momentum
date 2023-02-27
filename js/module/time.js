"use strict";
function getTimeRemaining() {
  const t = new Date().toLocaleTimeString();
  return t;
}

export function setTime(selector) {
  const currentTime = document.querySelector(selector),
        timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
      const t = getTimeRemaining();
      currentTime.innerHTML = t;
  }
}