const btn = document.getElementsByClassName('delete');
const modal = document.getElementById('myModal');
const close = document.getElementsByClassName('close')[0];
const confirmDelete = document.getElementById('confirm');
const cancelDelete = document.getElementById('cancel');
const length = btn.length;


for (let index = 0; index < length; index++) {
  btn[index].onclick = () => deleteAcct(index);
}

const deleteAcct = (i) => {
  modal.style.display = "block";

  confirmDelete.addEventListener('click', () => {
    document.getElementsByClassName('accounts')[i].style.display = 'none';
    modal.style.display = "none";
  });

  cancelDelete.addEventListener('click', () => {
    modal.style.display = "none";
  });
};

close.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

