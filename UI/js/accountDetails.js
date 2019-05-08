const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const accountContainer = document.getElementById('account');
const transactionContainer = document.getElementById('transaction-table');
const accountNumber = localStorage.getItem('accNumber');
const loaderCont = document.querySelector('.mini-loader-container');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const token = localStorage.getItem('token');

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

const loadAccountDetails = () => {
  accountContainer.innerHTML = `
  <h2 style="text-align: center; color: #161b33;">Account Details</h2>
    <br>
  <table class="center profile-table">
    <tr>
      <td>Acc. Holder</td>
      <td>${userDetails.firstName} ${userDetails.lastName}</td> 
    </tr>
    <tr>
      <td>Acc. Number</td>
      <td>${accountNumber}</td>
    </tr>
    <tr>
      <td>Acc. Type</td>
      <td>${localStorage.getItem('accType')}</td> 
    </tr>
    <tr>
      <td>Balance</td>
      <td>${localStorage.getItem('accBalance')}</td> 
    </tr>
  </table>
  `;
};

const loadTransactionDetails = () => {
  const url = `https://a-bank.herokuapp.com/api/v1/accounts/${accountNumber}/transactions`;

  fetch(url, options)
  .then(res => res.json())
  .then(response => {
    loaderCont.style.display = 'block';
    let htmlList = '';
    if (response.message) {
      let msg = createNode('li');
      msg.innerHTML = response.message;
      msg.style.color = '#161b33';
      append(errorContainer, msg);
      return loaderCont.style.display = 'none';
    }
    if (response.status === 200) {
      loaderCont.style.display = 'none';
      response.data.forEach(transaction => {
        htmlList += `
        <tr>
          <td>${transaction.transactionId}</td>
          <td><i class="fas fa-long-arrow-alt-${transaction.type === 'credit'? 'up': 'down'} ${transaction.type}"></i></td>
          <td>NGN ${transaction.amount}</td>
          <td>${new Date(transaction.createdOn).getDate()}-${new Date(transaction.createdOn).getMonth()+1}-${new Date(transaction.createdOn).getFullYear()}</td>
          <td>${new Date(transaction.createdOn).getHours()}:${new Date(transaction.createdOn).getMinutes()}</td>
        </tr>
        `;
      });
      transactionContainer.innerHTML += htmlList;
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

loadAccountDetails();
loadTransactionDetails();