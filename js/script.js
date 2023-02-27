"use strict";
import { setTime } from "./module/time.js";
import { setDate } from "./module/date.js";
import { setGreeting } from "./module/greetings.js";
import { getLocalStorage, setLocalStorage } from "./module/localStorage.js";
import { getQuote } from "./module/quotes.js";
import { weather } from "./module/weater.js";
import { createCompositionList } from "./module/audioPlayer.js";
window.addEventListener('DOMContentLoaded', () => {

  // time - date
  setTime('.time');
  setDate('.date');
  // greetings
  setGreeting();
  // localStorage, setName to input field
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
  // quotes
  getQuote();
  //wheater
  weather();
  //audio
});