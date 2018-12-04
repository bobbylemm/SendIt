const email = document.querySelector ('#email');
const username = document.querySelector ('#username');
const password = document.querySelector ('#password');
const errFlag = document.getElementById ('message-output');
const form = document.querySelector ('#form');
form.addEventListener ('submit', handleSubmit);
function handleSubmit (e) {
  e.preventDefault ();
  let user;
  if (email.value && password.value && username.value) {
    // console.log('hello')
    if (sessionStorage.getItem (email.value)) {
      errFlag.textContent = 'Error in Registration';
    }
    user = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    sessionStorage.setItem (email.value, JSON.stringify (user));
    // sessionStorage.setItem();
  }
}
