const errFlag = document.getElementById ('message-output');
const form = document.querySelector ('#form');
const loader = document.querySelector('#loader');

const url = 'http://localhost:3000/api/v1/auth/register';

const handleSubmit = (e) => {
  e.preventDefault ();
  loader.style.display = 'block';
  const Email = document.querySelector ('#email').value;
  const userName = document.querySelector ('#username').value;
  const password = document.querySelector ('#password').value;

  const data = JSON.stringify({
    Email,
    userName,
    password
  })

  fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(d => {
    loader.style.display = 'hidden';
    console.log(d);
  })
  .catch(err => {
    loader.style.display = 'block';
    console.log(err);
  });

}
form.addEventListener ('submit', handleSubmit);
