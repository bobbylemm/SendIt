const superemail = localStorage.getItem('superemail');
const superpassword = localStorage.getItem('superpassword');
const tableBody = document.querySelector('#tableBody');
const modalEdit = document.querySelector('#modal-edit');
const modalMessage = document.querySelector('#modal-message');
const loader = document.querySelector('#loader');

const url1 = `/api/v1/users`;

if(!superemail) {
    window.location.replace('/');
}

fetch(url1, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        superemail,
        superpassword
    }
})
.then(res => res.json())
.then(data => {
    data.allUsers[0].forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td><span class="mobile-view-title">User id:</span><span class="parcel-detail uid">${user.user_id}</span></td>
                    <td><span class="mobile-view-title">User name:</span><span class="parcel-detail">${user.user_name}</span></td>
                    <td><span class="mobile-view-title">Email:</span><span class="parcel-detail adminEmail">${user.email}</span></td>
                    <td class="editMe" contenteditable="false"><span class="mobile-view-title">is-admin:</span><span class="parcel-detail isAdmin">${user.is_admin}</span></td>
                    <td class="td"><button class="table-action-btn fl" id="editBtn" onclick="edit(this)">Edit</button>
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
    const isAdmin = e.closest('tr').querySelector('.isAdmin');
    const adminEmail = e.closest('tr').querySelector('.adminEmail');
        if (e.innerHTML === 'Edit') {
            modalMessage.innerHTML = 'Click On The admin role To Edit'
            modalEdit.style.display = 'block';
            e.innerHTML = 'Save';
            td.setAttribute("contenteditable", true);
            isAdmin.setAttribute("contenteditable", true);
            isAdmin.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length === 1) {
                    isAdmin.innerHTML = '&nbsp;'
                }
            });
        }else {
            loader.style.display = 'block';
            e.innerHTML = 'Edit';
            td.setAttribute("contenteditable", false);
            isAdmin.setAttribute("contenteditable", false);
            isAdmin.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length === 1) {
                    isAdmin.innerHTML = '&nbsp;'
                }
            });
            const adminRole = isAdmin.innerHTML;
            const splitAdminRole = adminRole.split('&');
            const updatedAdminRole = splitAdminRole[0];
            const adminEmailText = adminEmail.innerHTML;
            const parsedAdminRole = JSON.parse(updatedAdminRole);
            const url2 = `/api/v1/createadmin`;
            fetch(url2, {
                method: 'PUT',
                body: JSON.stringify({
                    adminEmail: adminEmailText,
                    isadmin: parsedAdminRole
                }),
                headers: {
                    'Content-Type': 'application/json',
                    superemail,
                    superpassword
                }
            })
            .then(res => res.json())
            .then(data => {
                loader.style.display = 'none';
                modalMessage.innerHTML = data.message;
                modalEdit.style.display = 'block';
            })
            .catch(err => {
                loader.style.display = 'none';
                modalMessage.innerHTML = 'this action failed';
                modalEdit.style.display = 'block';
                console.log(err);
            })
        }
    }
