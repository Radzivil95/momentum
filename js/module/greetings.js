"use strict";
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
userName.placeholder = '[Enter name]';

const dayPart = ['Good night,','Good evening,', 'Good afternoon,', 'Good morning,'];

export function setGreeting() {
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