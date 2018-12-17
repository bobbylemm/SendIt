const token2 = localStorage.getItem('x-auth-token');
const filterButton = document.querySelector('#filterButton');
const usernameInput = document.querySelector('#usernameInput');
const tableBody1 = document.querySelector('#tableBody');
const modalEdit1 = document.querySelector('#modal-edit');
const modalMessage1 = document.querySelector('#modal-message');

const url3 = `http://localhost:3000/api/v1/parcels/:uid/users`;
const getParcelsByUser = () => {
    const userName = usernameInput.value;
    fetch(url3, {
        method: 'POST',
        body: JSON.stringify({
            userName
        }),
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token2
        }
    })
    .then(res => res.json())
    .then(data => {
        modalMessage1.innerHTML = data.message;
        modalEdit1.style.display = 'block';
        data.allParcels[0].forEach(parcel => {
            const tr = document.createElement('tr');
            let option1 = '';
            let option2 = '';
            if (parcel.status === 'processing') {
                option1 = 'in-transit';
                option2 = 'delivered';
            }else if (parcel.status === 'in-transit') {
                option1 = 'processing';
                option2 = 'delivered';
            }else {
                option1 = 'processing';
                option2 = 'in-transit';
            }
            tr.innerHTML = `
                        <td><span class="mobile-view-title">Package id:</span><span class="parcel-detail pid">${parcel.parcel_id}</span></td>
                        <td><span class="mobile-view-title">User name:</span><span class="parcel-detail">${parcel.user_name}</span></td>
                        <td><span class="mobile-view-title">Package name:</span><span class="parcel-detail">${parcel.package_name}</span></td>
                        <td class="editMe" contenteditable="false"><span class="mobile-view-title">Dropoff location:</span><span class="parcel-detail dropofflocation" contenteditable="false" onproperty>${parcel.dropoff_location}</span></td>
                        <td><span class="mobile-view-title">Pickup location:</span><span class="parcel-detail">${parcel.pickup_location}</span></td>
                        <td class="editMe" contenteditable="false"><span class="mobile-view-title">Present location:</span><span class="parcel-detail presentlocation" contenteditable="false" onproperty>${parcel.present_location}</span></td>
                        <td><span class="mobile-view-title">Weight</span><span class="parcel-detail">${parcel.weight}</span></td>
                        <td><span class="mobile-view-title">Status</span><span class="parcel-detail"><select id="parcelStatus" disabled>
                        <option value=${parcel.status}>${parcel.status}</option>
                        <option value=${option1}>${option1}</option>
                        <option value=${option2}>${option2}</option>
                        </select></span></td>
                        <td><span class="mobile-view-title">Price:</span><span class="parcel-detail">${parcel.price}</span></td>
                        <td><span class="mobile-view-title">Cancelled:</span><span class="parcel-detail">${parcel.cancelled}</span></td>
                        <td class="td"><button class="table-action-btn fl" id="editBtn" onclick="edit(this)">Edit</button>
            `;
            if (parcel.status === 'processing') {
                tr.querySelector('select').style.backgroundColor = '#fae596';
                tr.querySelector('select').style.color = '#333';
            }else if (parcel.status === 'in-transit') {
                tr.querySelector('select').style.backgroundColor = '#22264b';
                tr.querySelector('select').style.color = '#fff';
            }else {
                tr.querySelector('select').style.backgroundColor = '#173e43';
                tr.querySelector('select').style.color = '#fff';
            }
            tableBody1.appendChild(tr);
        })
    })
    .catch(err => console.log(err))
}
filterButton.addEventListener('click', getParcelsByUser);