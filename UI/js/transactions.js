const btn = document.getElementsByClassName('transaction');
const delBtn = document.getElementsByClassName('delete');
const modal = document.getElementById('myModal');
const delModal = document.getElementById('delete-modal');
const close = document.getElementsByClassName('close')[0];
const deleteClose = document.getElementsByClassName('close')[1];
const confirm = document.getElementById('confirm');
const delConfirm = document.getElementById('del-confirm');
const cancelDelete = document.getElementById('cancel');
const length = btn.length;


for (let index = 0; index < length; index++) {
  btn[index].onclick = () => transact(index);
  delBtn[index].onclick = () => deleteAcct(index);
}

const transact = (i) => {
  modal.style.display = "block";

  confirm.addEventListener('click', () => {
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

///////////////////////////////////////////////////

for (let index = 0; index < length; index++) {
  
}

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

deleteClose.onclick = () => {
  delModal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == delModal) {
    delModal.style.display = "none";
  }
}

