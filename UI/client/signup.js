const errFlag = document.getElementById ('message-output');
const form = document.querySelector ('#form');
const loader = document.querySelector('#loader');
const apiMessageDiv = document.querySelector('#api-message-block');
const apiMessage = document.querySelector('#api-message');

const url = '/api/v1/auth/register';

const handleSubmit = (e) => {
  e.preventDefault ();
  loader.style.display = 'block';
  const Email = document.querySelector ('#email').value;
  const userName = document.querySelector ('#username').value;
  const password = document.querySelector ('#password').value;

  const user = JSON.stringify({
    Email,
    userName,
    password
  })

  fetch(url, {
    method: 'POST',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    loader.style.display = 'none';
    if(data.status === 'success') {
      localStorage.setItem('x-auth-token', data.token);
      localStorage.setItem('user', data.user);
      apiMessageDiv.style.backgroundColor = '#89bdd3';
        apiMessageDiv.style.display = 'block';
        apiMessage.innerHTML = 'successfully registered';
      setTimeout(() => {
        window.location.replace('index.html');
      }, 2000);
    }else {
      apiMessageDiv.style.backgroundColor = '#e62739';
        apiMessageDiv.style.display = 'block';
        apiMessage.innerHTML = 'error in registration';
      setTimeout(() => {
        apiMessageDiv.style.display = 'none';
      }, 2000);
    }
  })
  .catch(err => {
    loader.style.display = 'none';
    console.log(err);
  });

}
form.addEventListener ('submit', handleSubmit);
