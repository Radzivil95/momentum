"use strict";
window.addEventListener('DOMContentLoaded', () => {
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'];
  const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday', 'Sunday'];
  const dayPart = ['Good night,','Good evening,', 'Good afternoon,', 'Good morning,'];

  // time - date
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

  // greetings
  const greeting = document.querySelector('.greeting');
  const name = document.querySelector('.name');
  name.placeholder = '[Enter name]';

  function setGreeting() {
    const dateTime = new Date().getHours();
    if(dateTime >= 0 && dateTime < 6) {
      greeting.innerHTML = dayPart[0];
    }
    if(dateTime >= 6 && dateTime < 12) {
      greeting.innerHTML = dayPart[3];
    }
    if(dateTime >= 12 && dateTime < 18) {
      greeting.innerHTML = dayPart[2];
    }
    if(dateTime >= 12 && dateTime <= 23) {
      greeting.innerHTML = dayPart[2];
    }
  }

  setGreeting();

  name.addEventListener('input', () => {
    localStorage.setItem('name', name.value);
  });
    if(localStorage.getItem('name')) {
      name.setAttribute('value', localStorage.getItem('name'));
    }


});