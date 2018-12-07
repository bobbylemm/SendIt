const parcelsDelivered = document.getElementById('p-deliv');
const viewAllParcels = document.getElementById('view-all');
const contentOne = document.getElementById('btn-one-ft');
const contentTwo = document.getElementById('btn-two-ft');
const modalCancel = document.getElementById('modal-cancel');


parcelsDelivered.addEventListener('click', () => {
        contentOne.style.display = 'block';
        contentTwo.style.display = 'none';
})
viewAllParcels.addEventListener('click', () => {
        contentOne.style.display = 'none';
        contentTwo.style.display = 'block';
})

// 
const cancel = () => {
        modalCancel.style.display = 'block';
}
const noCancel = () => {
        modalCancel.style.display = 'none';
}
// this is to be able to edit the table
