const errFlag = document.getElementById ('message-output');
const form = document.querySelector ('#form');
const loader = document.querySelector('#loader');
const apiMessageDiv = document.querySelector('#api-message-block');
const apiMessage = document.querySelector('#api-message');

const url = `/api/v1/auth/login`;

const handleSubmit = (e) => {
  e.preventDefault ();
  loader.style.display = 'block';
  const Email = document.querySelector ('#email').value;
  const password = document.querySelector ('#password').value;

  const user = JSON.stringify({
    Email,
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
    loader.style.display = 'none';
    if (data.status === 'success' && data.superAdmin === true) {
      localStorage.setItem('superemail', Email);
      localStorage.setItem('superpassword', password);
      apiMessageDiv.style.display = 'block';
      apiMessageDiv.style.backgroundColor = '#89bdd3';
        apiMessage.innerHTML = 'Welcome Super-Admin';
      setTimeout(() => {
        window.location.replace('/superadmin');
      }, 2000);
    }else if(data.status === 'success' && data.isAdmin === true) {
      localStorage.setItem('x-auth-token', data.token);
      localStorage.setItem('user', data.user);
      localStorage.setItem('admin', true);
      apiMessageDiv.style.backgroundColor = '#89bdd3';
        apiMessageDiv.style.display = 'block';
        apiMessage.innerHTML = 'Welcome Admin';
      setTimeout(() => {
        window.location.replace('/admin');
      }, 2000);
    }else if(data.status === 'success' && data.isAdmin === false) {
      localStorage.setItem('x-auth-token', data.token);
      localStorage.setItem('user', data.user);
      apiMessageDiv.style.backgroundColor = '#89bdd3';
        apiMessageDiv.style.display = 'block';
        apiMessage.innerHTML = 'Successfully Logged In';
      setTimeout(() => {
        window.location.replace('/');
      }, 2000);
    }else {
      apiMessageDiv.style.backgroundColor = '#e62739';
        apiMessageDiv.style.display = 'block';
        apiMessage.innerHTML = 'error logging in';
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
