const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;
  if (!location) {
    return console.log('Enter a value to be searched');
  }
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(res =>
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  );
});
