const modal = document.getElementById('modal-admin-edit');
const close = document.getElementById('close');

const edit = () => {
        modal.style.display = 'block';
}
close.addEventListener('click', () => {
        modal.style.display = 'none';
})
      