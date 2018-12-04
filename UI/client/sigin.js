const email = document.querySelector ('#email');
const password = document.querySelector ('#password');
const form = document.querySelector ('#form');
const errFlag = document.querySelector('.message');
form.addEventListener ('submit', handleSubmit);
function handleSubmit (e) {
  e.preventDefault ();
  let data;
  if (email.value && password.value) {
    data = JSON.parse (sessionStorage.getItem (email.value));
    // console.log ('hello');
    if (email.value === data.email && password.value === data.password) {
      console.log ('Successful');
      //   errFlag.textContent = 'Error Logging  in';
    } else {
      console.log ('User Not Found');
    }
    //   console.log ();
  }
}
