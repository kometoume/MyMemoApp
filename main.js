'use strict';

{
  const text = document.getElementById('text');
  const save = document.getElementById('save');

  save.addEventListener('click', () => {
    localStorage.setItem('memo', text.value);
  });
}