const token1 = localStorage.getItem('x-auth-token');
const user1 = localStorage.getItem('user');

const url3 = `/api/v1/user/:uid/num-undelivered-parcels`;
const url4 = `/api/v1/user/:uid/num-delivered-parcels`;
fetch(url3, {
    method: 'GET',
    headers: {
        'x-auth-token': token1
    }
})
.then(res => res.json())
.then(data => {
    const parcelsUnDelivered = document.querySelector('#parcelsUnDelivered');
    parcelsUnDelivered.innerHTML = data.count;
})
.catch(err => console.log(err));

fetch(url4, {
    method: 'GET',
    headers: {
        'x-auth-token': token1
    }
})
.then(res => res.json())
.then(data => {
    const parcelsDelivered = document.querySelector('#parcelsDelivered');
    parcelsDelivered.innerHTML = data.count;
})
.catch(err => console.log(err));
