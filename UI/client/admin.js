const token = localStorage.getItem('x-auth-token');
const tableBody = document.querySelector('#tableBody');
const modalEdit = document.querySelector('#modal-edit');
const modalMessage = document.querySelector('#modal-message');
const loader = document.querySelector('#loader');

const url1 = `http://localhost:3000/api/v1/parcels`;

if(!token) {
    window.location.replace('/');
}

fetch(url1, {
    method: 'GET',
    headers: {
        'x-auth-token': token
    }
})
.then(res => res.json())
.then(data => {
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
        tableBody.appendChild(tr);
    })
})
.catch(err => console.log(err))

const ok = () => {
    modalEdit.style.display = 'none';
}

const edit = (e) => {
    const td = e.closest('tr').querySelector('.editMe');
    const presentlocation = e.closest('tr').querySelector('.presentlocation');
    const packageId = e.closest('tr').querySelector('.pid');
    const parcelStatus = e.closest('tr').querySelector('#parcelStatus');
    const pid = packageId.innerHTML;
        if (e.innerHTML === 'Edit') {
            modalMessage.innerHTML = 'You Can Now Edit This Parcel Delivery'
            modalEdit.style.display = 'block';
            e.innerHTML = 'Save';
            td.setAttribute("contenteditable", true);
            parcelStatus.disabled = false;
            presentlocation.setAttribute("contenteditable", true);
            presentlocation.focus();
            presentlocation.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length === 1) {
                    presentlocation.innerHTML = '&nbsp;'
                }
            });
        }else {
            loader.style.display = 'block';
            e.innerHTML = 'Edit';
            td.setAttribute("contenteditable", false);
            parcelStatus.disabled = true;
            presentlocation.setAttribute("contenteditable", false);
            presentlocation.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length === 1) {
                    presentlocation.innerHTML = '&nbsp;'
                }
            });
            const newStatus = parcelStatus.options[parcelStatus.options.selectedIndex].innerHTML;
            const PresentLoca = presentlocation.innerHTML;
            const splitPresentLoca = PresentLoca.split('&');
            const updatedPresentLoca = splitPresentLoca[0];
            const url2 = `http://localhost:3000/api/v1/parcels/${pid}/status`;
            fetch(url2, {
                method: 'PUT',
                body: JSON.stringify({
                    newStatus
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const url3 = `http://localhost:3000/api/v1/parcels/${pid}/currentlocation`;
                fetch(url3, {
                method: 'PUT',
                body: JSON.stringify({
                    newLocation: updatedPresentLoca
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            })
            .then(res => res.json())
            .then(nextData => {
                if(nextData.status === 'success') {
                    loader.style.display = 'none';
                    modalMessage.innerHTML = 'Parcel Delivery Updated Successfully';
                    modalEdit.style.display = 'block';
                }else {
                    loader.style.display = 'none';
                    modalMessage.innerHTML = nextData.message;
                    modalEdit.style.display = 'block';
                }
            })
            .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
            // update the present location
        }
    }