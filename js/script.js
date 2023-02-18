"use strict";
window.addEventListener('DOMContentLoaded', () => {
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'];
  const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday', 'Sunday'];



  function getTimeRemaining() {
    const t = new Date().toLocaleTimeString();
    return t;
  }

  function setTime(selector) {
    const currentTime = document.querySelector(selector),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining();
            currentTime.innerHTML = t;
        }
    }

    setTime('.time');

    function setDate(selector) {
      const currentDate = new Date();
      const date = document.querySelector(selector),
            timeInterval = setInterval(updateDate, 60000);
    
            updateDate();
    
            function updateDate() {
              const d = currentDate.getDate();
              const m = currentDate.getMonth();
              const weakDay = currentDate.getDay();

              date.innerHTML = `${daysArr[weakDay]}, ${monthArr[m]} ${d}`;
            }
    }

    setDate('.date');
});