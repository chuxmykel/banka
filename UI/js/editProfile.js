const modal1 = document.getElementById('myModal1');
const btn1 = document.getElementById('edit');
const close1 = document.getElementsByClassName('close')[0];

btn1.onclick = () => {
  modal1.style.display = "block";
}

close.onclick = () => {
  modal1.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
}