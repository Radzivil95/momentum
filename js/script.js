"use strict";
window.addEventListener('DOMContentLoaded', () => {
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'];
  const daysArr = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
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
      console.log(weakDay);
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

  // quotes
  const randomQuoteBtn = document.querySelector('.change-quote');
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  randomQuoteBtn.addEventListener('click', () => {
    getQuote()
  });
  function getQuote() {
    const request = new XMLHttpRequest();

    request.open('GET','js/quotes.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    request.addEventListener('load', () => {
      if( request.status === 200) {
        const data = JSON.parse(request.response);
        const currentQuote = data.quotes[randomInteger(0,100)]
        quote.innerHTML = currentQuote.quote;
        author.innerHTML = currentQuote.author;
      } 
      });
  }

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  getQuote();
});