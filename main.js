'use strict';

{
  const text = document.getElementById('text');
  const save = document.getElementById('save');
  const message = document.getElementById('message');

  save.addEventListener('click', () => {
    message.classList.add('appear');
    setTimeout(() => {
      message.classList.remove('appear');
    }, 1000);
    localStorage.setItem('memo', text.value);
  });
}