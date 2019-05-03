const userDetails = JSON.parse(localStorage.getItem('userDetails'));

const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const role = document.getElementById('role');
const superUserBtn = document.getElementById('superuser');

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

loadProfileDetails();