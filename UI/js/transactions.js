const transaction = document.getElementById('transact');
const amount = document.getElementById('amount');
const accountNumber = document.getElementById('account-number');
const type = document.getElementById('type');

const delBtn = document.getElementsByClassName('delete');
const modal = document.getElementById('myModal');
const modalContent = document.getElementById('transaction-modal');
const close = document.getElementsByClassName('close')[0];
const modalErrorContainer = document.querySelector('.modal-errors ul');
const modalErrorCont = document.querySelector('.modal-errors');

const transact = () => {
  modal.style.display = "block";
};

transaction.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = `https://a-bank.herokuapp.com/api/v1/transactions/${accountNumber.value}/${type.value}`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      amount: amount.value,
    }),
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
  };

  fetch(url, options)
    .then(res => res.json())
    .then(response => {
      if (response.status >= 400) {
        modalErrorCont.style.display = 'block';
        let li = createNode('li');
        li.innerHTML = `${response.error}<br>`;
        append(modalErrorContainer, li);
        return setTimeout(() => {
          modalErrorCont.style.display = 'none';
          modalErrorContainer.innerHTML = '';
        }, 5000);
      }

      if (response.status === 200) {
        modalContent.innerHTML = '<div class="mini-loader-container"><div class="mini-loader"></div></div>';
        modalContent.style.height = '250px';
        setTimeout(() => {
          modalContent.style.height = 'auto';
          modalContent.innerHTML = `
          <span class="close" onclick="hideTransactionModal()">&times;</span>
          <div>
            <h2 style="text-align: center; color: #161b33;">Transaction Successful</h2>
            <br>
            <h4 style="text-align: center; color: #161b33;">Transaction Details</h4>
            <table class="center profile-table">
              <tr>
                <td>Transaction ID</td>
                <td>${response.data[0].transactionId}</td> 
              </tr>
              <tr>
                <td>Acc. Number</td>
                <td>${response.data[0].accountNumber}</td>
              </tr>
              <tr>
                <td>Transaction Amount</td>
                <td>NGN ${response.data[0].amount}</td> 
              </tr>
              <tr>
                <td>Previous Balance</td>
                <td>NGN ${response.data[0].oldBalance}</td> 
              </tr>
              <tr>
                <td>New Balance</td>
                <td>NGN ${response.data[0].accountBalance}</td> 
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
          modalErrorCont.style.display = 'none';
          modalErrorContainer.innerHTML = '';
        }, 5000);
    });
  }
);


close.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const hideTransactionModal = () => {
  modal.style.display = "none";
  window.location.reload();
};
