const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const url = 'https://a-bank.herokuapp.com/api/v1/accounts';

const accountsContainer = document.getElementById('all-accounts');
const token = localStorage.getItem('token');
const cashierBtn = document.getElementById('transaction');
const loaderCont = document.querySelector('.mini-loader-container');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const warnContainer = document.getElementById('warn-modal');
const warningContainer = document.getElementById('warning-container');
const warnMessage = document.getElementById('warning');
const confirm = document.getElementById('del-confirm');
const cancel = document.getElementById('cancel');

const options = {
  method: 'GET',
  headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  })
};

const createNode = (element) => {
  return document.createElement(element);
}

const append = (parent, el) => {
  return parent.appendChild(el);
}

const changeAccountStatus = (checked, accountNumber, toggleSwitch) => {
  const url = `https://a-bank.herokuapp.com/api/v1/accounts/${accountNumber}`;
  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      status: `${checked ? 'active' : 'dormant'}`,
    }),
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
  };

  warnContainer.style.display = 'block';
  warnMessage.innerText = `Are you sure you want to ${checked ? 'activate' : 'deactivate'} this account? This can be undone later by toggling the switch`;
  confirm.innerText = `${checked ? 'activate' : 'deactivate'}`;

  cancel.onclick = () => {
    warnContainer.style.display = "none";
    if(checked === true) {
      toggleSwitch.checked = false
    } else {toggleSwitch.checked = true};
  }

  confirm.onclick = () => {
    fetch(url, options)
    .then(res => res.json())
    .then(response => {
      warningContainer.innerHTML = '<div class="mini-loader-container"><div class="mini-loader"></div></div>';
      warningContainer.style.height = '250px';
      if (response.status === 400) {
        warningContainer.style.height = 'auto';
          warningContainer.innerHTML = `
          <span class="close" onclick="hideModal()">&times;</span>
          <p style="font-size: 20px; padding-bottom: 25px;">Account Number is invalid.
          This shouldn't happen. Please contact the admin for clarification</p>`;
      }
      if (response.status === 200) {
        setTimeout(() => {
          warningContainer.style.height = 'auto';
          warningContainer.innerHTML = `
          <span class="close" onclick="hideModal()">&times;</span>
          <div>
            <h2 style="text-align: center; color: #161b33;">Account ${response.data[0].status === 'active'? 'Activated' : 'Deactivated'} Successfully</h2>
            <br>
            <h4 style="text-align: center; color: #161b33;">Account Details</h4>
            <table class="center profile-table">
              <tr>
                <td>Acc. Number</td>
                <td>${response.data[0].accountNumber}</td>
              </tr>
              <tr>
                <td>Acc. Status</td>
                <td>${response.data[0].status}</td> 
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
  };
};

const loadAccoutns = () => {
  if (userDetails.isAdmin === true) {
    cashierBtn.style.display = 'none';
  }

  fetch(url, options)
    .then(res => res.json())
    .then(response => {
      let htmlList = '';
      if (response.status === 200) {
        response.data.forEach(account => {
          htmlList += `
          <div class="accounts">
            <span class="balance">NGN ${account.balance}</span>
            <div class="accounts-flex">
              <div class="account-details">
                <span class="item-label">Account Holder:</span>
                <span class="item-content">${account.firstName} ${account.lastName}</span>
                <span class="item-label">Account Number:</span>
                <span class="item-content">${account.accountNumber}</span>
                <span class="item-label">Account Type:</span>
                <span class="item-content">${account.type}</span>
                <span class="item-label">Account Status:</span>
                <span class="item-content ${account.status === 'active'? 'active': 'dormant'}">${account.status}</span>
              </div>
              <div class="account-operations">
                <span class="item-label">Toggle Account Status</span>
                <label class="switch">
                  <input class="form-input" ${account.status === 'active'? 'checked ': ''} onclick="changeAccountStatus(this.checked, ${account.accountNumber}, this)" type="checkbox" name="status">
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="account-operations">
              <button class="delete">Delete</button>
              <button class="details" onclick="location.href='account-details.html'">Details</button>
            </div>
          </div>
          `;
        });
        loaderCont.style.display = 'none';
        accountsContainer.innerHTML += htmlList;
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
};

const hideModal = () => {
  warnContainer.style.display = "none";
  window.location.reload();
};

loadAccoutns();