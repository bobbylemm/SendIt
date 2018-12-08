const modalCancel = document.getElementById('modal-cancel');
let element = '';

const cancel = (e) => {
    modalCancel.style.display = 'block';
    element = e;
    return element;
}

const yesCancel = () => {
    const packageId = element.closest('tr').querySelector('.pid');
    const pid = packageId.innerHTML;
    const urlCancel = `http://localhost:3000/api/v1//parcels/${pid}/cancel`;
    const token = localStorage.getItem('x-auth-token');

    fetch(urlCancel, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            const modalEdit = document.querySelector('#modal-edit');
            const modalMessage = document.querySelector('#modal-message');
            modalCancel.style.display = 'none';
            modalMessage.innerHTML = data.message;
            modalEdit.style.display = 'block';
        }else {
            const modalEdit = document.querySelector('#modal-edit');
            const modalMessage = document.querySelector('#modal-message');
            modalCancel.style.display = 'none';
            modalMessage.innerHTML = data.message;
            modalEdit.style.display = 'block';
        }
    })
    .catch(err => {
        const modalEdit = document.querySelector('#modal-edit');
        const modalMessage = document.querySelector('#modal-message');
        modalCancel.style.display = 'none';
        modalMessage.innerHTML = 'Could not cancel this parcel order';
        modalEdit.style.display = 'block';
    })
}

const noCancel = () => {
    modalCancel.style.display = 'none';
}