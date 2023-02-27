"use strict";
const userName = document.querySelector('.name');
const weaterCity = document.querySelector('.city');
export function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', weaterCity.value);
}


export function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.setAttribute('value', localStorage.getItem('name'));
  }
  if(localStorage.getItem('city')) {
    weaterCity.setAttribute('value', localStorage.getItem('city'));
  }
}

