const logout = document.querySelector('#logoutLink');

const logout = () => {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('user');
    localStorage.removeItem('superemail');
    localStorage.removeItem('superpassword');
    setTimeout(() => {
        window.location.replace('signin.html');
    }, 2000);
}
logout.addEventListener('click', logout);