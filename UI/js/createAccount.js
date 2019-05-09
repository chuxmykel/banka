const url = 'https://a-bank.herokuapp.com/api/v1/accounts';
const createAcct = document.getElementById('create-acct');

const accountType = document.getElementById('type');
const initialDeposit = document.getElementById('initial-deposit');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const loaderCont = document.querySelector('.mini-loader-container');

const modal = document.getElementById('myModal');
const modalContent = document.querySelector('#myModal .modal-content');
const btn = document.querySelector('.create');
const close2 = document.getElementsByClassName('close')[0];


const createNode = (element) => {
  return document.createElement(element);
}

const append = (parent, el) => {
  return parent.appendChild(el);
}

createAcct.addEventListener('submit', (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      body: JSON.stringify({
        type: accountType.value,
        initialDeposit: initialDeposit.value,
      }),
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      })
    }

    fetch(url, options)
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        const errors = response.error;
        errorCont.style.display = 'block';
        errors.forEach(error => {
          let li = createNode('li');
        li.innerText = `${error}`;
        append(errorContainer, li);
        })
        setTimeout(() => {
            errorCont.style.display = 'none';
            errorContainer.innerHTML = '';
        }, 5000);
      }
      if (response.status === 201) {
        modalContent.innerHTML = '<div class="mini-loader-container"><div class="mini-loader"></div></div>';
        modalContent.style.height = '250px';
        setTimeout(() => {
          modalContent.style.height = 'auto';
          modalContent.innerHTML = `
          <span class="close" onclick="hideModal()">&times;</span>
          <div>
            <h2 style="text-align: center; color: #161b33;">Account Created Successfully</h2>
            <br>
            <h4 style="text-align: center; color: #161b33;">Account Details</h4>
            <table class="center profile-table">
              <tr>
                <td>Acc. Number</td>
                <td>${response.data[0].accountNumber}</td>
              </tr>
              <tr>
                <td>Acc. Holder</td>
                <td>${response.data[0].firstName} ${response.data[0].lastName}</td> 
              </tr>
              <tr>
                <td>Acc. Type</td>
                <td>${response.data[0].type}</td> 
              </tr>
              <tr>
                <td>Opening Balance</td>
                <td>${response.data[0].openingBalance}</td> 
              </tr>
            </table>
          </div>
          `;
        }, 3000);
      }
    })
    .catch((error) => {
        errorCont.style.display = 'block';
        let msg = createNode('li');
        msg.innerHTML = error.message || 'Error in connecting, Please check your internet connection and try again';
        append(errorContainer, msg);
        setTimeout(() => {
            errorCont.style.display = 'none';
            errorContainer.innerHTML = '';
        }, 5000);
    });
});

btn.onclick = () => {
  modal.style.display = "block";
}

close2.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
}

const hideModal = () => {
  modal.style.display = "none";
  window.location.reload();
};
