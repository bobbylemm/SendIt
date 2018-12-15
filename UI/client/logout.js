const logoutPath = document.querySelector('#logoutLink');

const logout = () => {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('user');
    localStorage.removeItem('superemail');
    localStorage.removeItem('superpassword');
    localStorage.removeItem('admin');
    setTimeout(() => {
        window.location.replace('signin.html');
    }, 2000);
}
logoutPath.addEventListener('click', logout);