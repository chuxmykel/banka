const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const url = 'https://a-bank.herokuapp.com/api/v1/accounts';

const accountsContainer = document.getElementById('all-accounts');
const token = localStorage.getItem('token');
const cashierBtn = document.getElementById('transaction');
const loaderCont = document.querySelector('.mini-loader-container');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');

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
            <div class="">
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

loadAccoutns();