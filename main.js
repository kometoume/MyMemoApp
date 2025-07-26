'use strict';

{
  const text = document.getElementById('text');
  const save = document.getElementById('save');

  save.addEventListener('click', () => {
    alert(text.value);
  });
}