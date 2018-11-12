const parcelsDelivered = document.getElementById('p-deliv');
const viewAllParcels = document.getElementById('view-all');
const contentOne = document.getElementById('btn-one-ft');
const contentTwo = document.getElementById('btn-two-ft');

parcelsDelivered.addEventListener('click', () => {
        contentOne.style.display = block;
        contentTwo.style.display = none;
})
viewAllParcels.addEventListener('click', () => {
        contentOne.style.display = none;
        contentTwo.style.display = block;
})