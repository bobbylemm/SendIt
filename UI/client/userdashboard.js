const token = localStorage.getItem('x-auth-token');
const tableBody = document.querySelector('#tableBody');
const modalEdit = document.querySelector('#modal-edit');
const modalMessage = document.querySelector('#modal-message');
const loader = document.querySelector('#loader');

const url1 = `http://localhost:3000/api/v1/users/:1/parcels`;

fetch(url1, {
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
                    <td><span class="mobile-view-title">Package id:</span><span class="parcel-detail pid">${parcel.parcel_id}</span></td>
                    <td><span class="mobile-view-title">Package name:</span><span class="parcel-detail">${parcel.package_name}</span></td>
                    <td class="editMe" contenteditable="false"><span class="mobile-view-title">Dropoff location:</span><span class="parcel-detail dropofflocation" contenteditable="false" onproperty>${parcel.dropoff_location}</span></td>
                    <td><span class="mobile-view-title">Pickup location:</span><span class="parcel-detail">${parcel.pickup_location}</span></td>
                    <td><span class="mobile-view-title">Present location:</span><span class="parcel-detail">${parcel.present_location}</span></td>
                    <td><span class="mobile-view-title">Weight</span><span class="parcel-detail">${parcel.weight}</span></td>
                    <td><span class="mobile-view-title">Status</span><span class="parcel-detail">${parcel.status}</span></td>
                    <td><span class="mobile-view-title">Price:</span><span class="parcel-detail">${parcel.price}</span></td>
                    <td><span class="mobile-view-title">Cancelled:</span><span class="parcel-detail">${parcel.cancelled}</span></td>
                    <td class="td"><button class="table-action-btn fl" id="editBtn" onclick="edit(this)">Edit</button><button class="table-action-btn fr" id="deleteBtn" onclick="cancel(this)">Cancel</button></td>
        `;
        tableBody.appendChild(tr);
    })
})
.catch(err => console.log(err))

const ok = () => {
    modalEdit.style.display = 'none';
}

const edit = (e) => {
    const td = e.closest('tr').querySelector('.editMe');
    const dropofflocation = e.closest('tr').querySelector('.dropofflocation');
    const packageId = e.closest('tr').querySelector('.pid');
    const pid = packageId.innerHTML;
        if (e.innerHTML === 'Edit') {
            modalMessage.innerHTML = 'Click On The Parcel Destination To Edit'
            modalEdit.style.display = 'block';
            e.innerHTML = 'Save';
            td.setAttribute("contenteditable", true);
            dropofflocation.setAttribute("contenteditable", true);
            dropofflocation.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length === 1) {
                    dropofflocation.innerHTML = '&nbsp;'
                }
            });
        }else {
            loader.style.display = 'block';
            e.innerHTML = 'Edit';
            td.setAttribute("contenteditable", false);
            dropofflocation.setAttribute("contenteditable", false);
            dropofflocation.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length === 1) {
                    dropofflocation.innerHTML = '&nbsp;'
                }
            });
            const DropOff = dropofflocation.innerHTML;
            const splitDropOff = DropOff.split('&');
            const updatedDestination = splitDropOff[0];
            console.log(updatedDestination)
            const url2 = `http://localhost:3000/api/v1/parcels/${pid}/destination`;
            console.log(url2);
            fetch(url2, {
                method: 'PUT',
                body: JSON.stringify({
                    newdropOff: updatedDestination
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            })
            .then(res => res.json())
            .then(data => {
                loader.style.display = 'none';
                modalMessage.innerHTML = 'Parcel Destination Updated Successfully'
            modalEdit.style.display = 'block';
            })
            .catch(err => console.log(err))
        }
    }
