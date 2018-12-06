const token = localStorage.getItem('x-auth-token');
const tableBody = document.querySelector('#tableBody');

const url = `http://localhost:3000/api/v1/users/:1/parcels`;

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
                    <td><span class="mobile-view-title">Package name:</span><span class="parcel-detail">${parcel.package_name}</span></td>
                    <td class="editMe" contenteditable="false"><span class="mobile-view-title">Dropoff location:</span><span class="parcel-detail" id="dropfflocation" contenteditable="false" onproperty>${parcel.dropoff_location}</span></td>
                    <td><span class="mobile-view-title">Pickup location:</span><span class="parcel-detail">${parcel.pickup_location}</span></td>
                    <td><span class="mobile-view-title">Present location:</span><span class="parcel-detail">${parcel.present_location}</span></td>
                    <td><span class="mobile-view-title">Weight</span><span class="parcel-detail">${parcel.weight}</span></td>
                    <td><span class="mobile-view-title">Status</span><span class="parcel-detail">${parcel.status}</span></td>
                    <td><span class="mobile-view-title">Price:</span><span class="parcel-detail">${parcel.price}</span></td>
                    <td class="td"><button class="table-action-btn fl" id="editBtn" onclick="edit(this)">Edit</button><button class="table-action-btn fr" id="deleteBtn" onclick="cancel()">Cancel</button></td>
        `;
        tableBody.appendChild(tr);
        
    })
})
.catch(err => console.log(err))

const edit = (e) => {
    const td = e.closest('tr').querySelector('.editMe');
    const sp = e.closest('tr').querySelector('#dropfflocation');
        if (e.innerHTML === 'Edit') {
                e.innerHTML = 'Save';
                td.setAttribute("contenteditable", true);
                sp.setAttribute("contenteditable", true);
        }else {
            e.innerHTML = 'Edit';
            td.setAttribute("contenteditable", false);
            sp.setAttribute("contenteditable", true);
            const dropfflocation = document.querySelector('#dropfflocation');
            dropfflocation.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length == 1) {
                    dropfflocation.innerHTML = '&nbsp;'
                }
            })
            console.log('d', dropfflocation.textContent);
        }
    }
