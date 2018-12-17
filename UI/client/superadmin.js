const superemail = localStorage.getItem('superemail');
const superpassword = localStorage.getItem('superpassword');
const tableBody = document.querySelector('#tableBody');
const modalEdit = document.querySelector('#modal-edit');
const modalMessage = document.querySelector('#modal-message');
const loader = document.querySelector('#loader');

const url1 = `http://localhost:3000/api/v1/users`;

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
        let option2 = '';
        if (JSON.stringify(user.is_admin) === 'true') {
            option2 = 'false';
        }else {
            option2 = 'true';
        }
        tr.innerHTML = `
                    <td><span class="mobile-view-title">User id:</span><span class="parcel-detail uid">${user.user_id}</span></td>
                    <td><span class="mobile-view-title">User name:</span><span class="parcel-detail">${user.user_name}</span></td>
                    <td><span class="mobile-view-title">Email:</span><span class="parcel-detail adminEmail">${user.email}</span></td>
                    <td class="editMe" contenteditable="false"><span class="mobile-view-title">is-admin:</span><span class="parcel-detail isAdmin"><select id="isadminStatus" class="select" disabled>
                    <option value=${user.is_admin}>${user.is_admin}</option>
                    <option value=${option2}>${option2}</option>
                    </select></span></td>
                    <td class="td"><button class="table-action-btn fl" id="editBtn" onclick="edit(this)">Edit</button>
        `;
            if (option2 === 'true') {
                tr.querySelector('select').style.backgroundColor = '#e62739';
                tr.querySelector('select').style.color = '#fff';
            }else {
                tr.querySelector('select').style.backgroundColor = '#6ed3cf';
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
    const isAdmin = e.closest('tr').querySelector('.isAdmin');
    const adminEmail = e.closest('tr').querySelector('.adminEmail');
    const isadminStatus = e.closest('tr').querySelector('#isadminStatus');
        if (e.innerHTML === 'Edit') {
            modalMessage.innerHTML = 'Click On The admin role To Edit'
            modalEdit.style.display = 'block';
            e.innerHTML = 'Save';
            isadminStatus.disabled = false;
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
            isadminStatus.disabled = true;
            td.setAttribute("contenteditable", false);
            isAdmin.setAttribute("contenteditable", false);
            isAdmin.addEventListener('DOMSubtreeModified', (ee) => {
                if(ee.path[0].length === 1) {
                    isAdmin.innerHTML = '&nbsp;'
                }
            });
            const adminRole = isadminStatus.options[isadminStatus.options.selectedIndex].innerHTML;
            const adminEmailText = adminEmail.innerHTML;
            const parsedAdminRole = JSON.parse(adminRole);
            const url2 = `http://localhost:3000/api/v1/createadmin`;
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
