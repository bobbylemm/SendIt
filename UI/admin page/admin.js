const editBtn = document.querySelectorAll('#editBtn');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

const edit = () => {
        modal.style.display = 'block';
}
close.addEventListener('click', () => {
        modal.style.display = 'none';
})
      