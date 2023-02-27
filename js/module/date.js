"use strict";
const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
'August', 'September', 'October', 'November', 'December'];


export function setDate(selector) {
  const currentDate = new Date();
  const date = document.querySelector(selector),
        timeInterval = setInterval(updateDate, 60000);

  updateDate();

  function updateDate() {
    const d = currentDate.getDate();
    const m = currentDate.getMonth();
    const weakDay = currentDate.getDay();
    date.innerHTML = `${days[weakDay]}, ${month[m]} ${d}`;
  }
}