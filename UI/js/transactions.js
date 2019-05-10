const delBtn = document.getElementsByClassName('delete');
const modal = document.getElementById('myModal');
const delModal = document.getElementById('delete-modal');
const close = document.getElementsByClassName('close')[0];
const delConfirm = document.getElementById('del-confirm');
const cancelDelete = document.getElementById('cancel');
const length = delBtn.length;

for (let index = 0; index < length; index++) {
  delBtn[index].onclick = () => deleteAcct(index);
}

const transact = () => {
  modal.style.display = "block";

};

close.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

///////////////////////////////////////////////////


const deleteAcct = (i) => {
  delModal.style.display = "block";

  delConfirm.addEventListener('click', () => {
    document.getElementsByClassName('accounts')[i].style.display = 'none';
    delModal.style.display = "none";
  });

  cancelDelete.addEventListener('click', () => {
    delModal.style.display = "none";
  });
};

window.onclick = (event) => {
  if (event.target == delModal) {
    delModal.style.display = "none";
  }
}

