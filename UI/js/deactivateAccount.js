const status = document.getElementsByClassName('status');
const checkBox = document.getElementsByClassName('form-input');
const length = checkBox.length;



for (let index = 0; index < length; index++) {
  checkBox[index].onclick = () => activate(index);
}

const activate = (i) => {
  const checked = checkBox[i].checked;
  if(!checked) {
    status[i].className = status[i].className.replace(' active', ' dormant');
    status[i].innerText = 'Dormant';
  } else {
    status[i].className = status[i].className.replace(' dormant', ' active');
    status[i].innerText = 'Active';
  }
};

