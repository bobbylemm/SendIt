const token = localStorage.getItem('x-auth-token');
const admin = localStorage.getItem('admin');
const profileLink = document.querySelector('#profileLink');
const loginLink = document.querySelector('#loginLink');
const signUpLink = document.querySelector('#signUpLink');
const logoutLink = document.querySelector('#logoutLink');
const adminLink = document.querySelector('#adminLink');

if (token) {
    profileLink.classList.remove('disabled');
    loginLink.classList.add('disabled');
    signUpLink.classList.add('disabled');
    logoutLink.classList.add('enabled');
}if (admin) {
    adminLink.classList.add('enabled');
}if (!admin) {
    adminLink.classList.add('disabled');
}if (!token) {
    profileLink.classList.add('disabled');
    loginLink.classList.add('enabled');
    signUpLink.classList.add('enabled');
    logoutLink.classList.add('disabled');
}