const btn = document.getElementsByClassName('transaction');
const modal = document.getElementById('myModal');
const close = document.getElementsByClassName('close')[0];
const confirm = document.getElementById('confirm');
const length = btn.length;


for (let index = 0; index < length; index++) {
  btn[index].onclick = () => transact(index);
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

