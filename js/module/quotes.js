"use strict";

const randomQuoteBtn = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

randomQuoteBtn.addEventListener('click', () => {
  getQuote();
});

export function getQuote() {
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