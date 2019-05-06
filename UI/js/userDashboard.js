const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const accountsUrl = 'https://a-bank.herokuapp.com/api/v1/user/accounts';

const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const role = document.getElementById('role');
const superUserBtn = document.getElementById('superuser');
const accountsTabContent = document.getElementById('account-content');

const options = {
  method: 'GET',
  headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  })
};

const loadProfileDetails = () => {
  userName.innerText = `${userDetails.firstName} ${userDetails.lastName}`;
  userEmail.innerText = `${userDetails.email}`;
  if (userDetails.type === 'staff') {
    role.innerText = userDetails.isAdmin? 'Admin' : 'Cashier';
  }
  if (userDetails.isAdmin === false) {
    superUserBtn.style.display = 'none';
  }
};

const loadAccountDetails = () => {
  fetch(accountsUrl, options)
    .then(res => res.json())
    .then(response => {
      let htmlList = '';
      if (response.status === 200) {
        response.accounts.forEach(account => {
          htmlList += `
          <div class="account-item">
            <div class="acct">
              <span class="item-label">${account.type} Account:</span>
              <span class="item-content">${account.accountNumber}</span>
            </div>
            <div class="acct bal">
              <span class="item-label">Account Balance:</span>
              <span class="item-content">NGN ${account.balance}</span>
            </div>
          </div>
          `;
        });
        accountsTabContent.innerHTML = htmlList;
      }

      if (response.status === 404) {
        accountsTabContent.innerText = "You do not have any accounts";
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

loadProfileDetails();
loadAccountDetails();
