const parcelsDelivered = document.getElementById('p-deliv');
const viewAllParcels = document.getElementById('view-all');
const contentOne = document.getElementById('btn-one-ft');
const contentTwo = document.getElementById('btn-two-ft');
const modalEdit = document.getElementById('modal-edit');
const modalCancel = document.getElementById('modal-cancel');
const close = document.getElementById('close');

parcelsDelivered.addEventListener('click', () => {
        contentOne.style.display = 'block';
        contentTwo.style.display = 'none';
})
viewAllParcels.addEventListener('click', () => {
        contentOne.style.display = 'none';
        contentTwo.style.display = 'block';
})
// js for the modal
const edit = () => {
        modalEdit.style.display = 'block';
}
close.addEventListener('click', () => {
        modalEdit.style.display = 'none';
})
// 
const cancel = () => {
        modalCancel.style.display = 'block';
}
const noCancel = () => {
        modalCancel.style.display = 'none';
}