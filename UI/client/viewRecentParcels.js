const token = localStorage.getItem('x-auth-token');
const user = localStorage.getItem('user');
const admin = localStorage.getItem('admin');
const adminLink = document.querySelector('#adminLink');
const tableBody = document.querySelector('#tableBody');
const url = `/api/v1/user/:1/parcels`;

if (!token) {
    window.location.replace('/');
}if (!admin) {
    adminLink.classList.add('enabled');
}if (!admin) {
    adminLink.classList.add('disabled');
}

fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
    }
})
.then(res => res.json())
.then(data => {
    data.parcels[0].forEach(parcel => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td><span class="mobile-view-title">package name:</span><span class="parcel-detail">${parcel.package_name}</span></td>
                <td><span class="mobile-view-title">pickup location:</span><span class="parcel-detail">${parcel.pickup_location}</span></td>
                <td><span class="mobile-view-title">dropoff location:</span><span class="parcel-detail">${parcel.dropoff_location}</span></td>
                <td><span class="mobile-view-title">present location:</span><span class="parcel-detail">${parcel.present_location}</span></td>
                <td><span class="mobile-view-title">weight:</span><span class="parcel-detail">${parcel.weight}</span></td>
                <td><span class="mobile-view-title">quantity:</span><span class="parcel-detail">${parcel.weight}</span></td>
                <td><span class="mobile-view-title">cancelled:</span><span class="parcel-detail">${parcel.cancelled}</span></td>
                <td><span class="mobile-view-title">price:</span><span class="parcel-detail">${parcel.price}</span></td>
                <!-- <td></td> -->
        `;
        tableBody.appendChild(tr);
        
    })
})
.catch(err => console.log(err))