const token = localStorage.getItem('x-auth-token');
const profileLink = document.querySelector('#profileLink');
const loginLink = document.querySelector('#loginLink');
const signUpLink = document.querySelector('#signUpLink');
const logoutLink = document.querySelector('#logoutLink');

if (token) {
    profileLink.classList.remove('disabled');
    loginLink.classList.add('disabled');
    signUpLink.classList.add('disabled');
    logoutLink.classList.remove('disabled');
}else {
    profileLink.classList.add('disabled');
    loginLink.classList.add('enabled');
    signUpLink.classList.add('enabled');
    logoutLink.classList.add('disabled');
}