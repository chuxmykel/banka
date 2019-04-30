const status = document.getElementsByClassName('status');
const checkBox = document.getElementsByClassName('form-input');
const modal = document.getElementById('myModal');
const close = document.getElementsByClassName('close')[0];
const confirmDeact = document.getElementById('confirm');
const cancelDeact = document.getElementById('cancel');
const length = checkBox.length;



for (let index = 0; index < length; index++) {
  checkBox[index].onclick = () => activate(index);
}

const activate = (i) => {
  const checked = checkBox[i].checked;
  if(!checked) {
    modal.style.display = "block";
    confirmDeact.addEventListener('click', () => {
      modal.style.display = "none";
    });
  
    cancelDeact.addEventListener('click', () => {
      modal.style.display = "none";
    });
  
    close.onclick = () => {
      modal.style.display = "none";
    }
    
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    status[i].className = status[i].className.replace(' active', ' dormant');
    status[i].innerText = 'Dormant';
  } else {
    status[i].className = status[i].className.replace(' dormant', ' active');
    status[i].innerText = 'Active';
  }
};

