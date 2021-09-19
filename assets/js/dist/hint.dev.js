'use strict';

{
  var cardToggle = function cardToggle(event) {
    var content = event.currentTarget.parentNode;
    content.classList.toggle('is-open');
  };

  var cardOpen = document.querySelectorAll(".card__title");

  for (var i = 0; i < cardOpen.length; i++) {
    cardOpen[i].addEventListener('click', cardToggle);
  }
}