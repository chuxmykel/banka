const userDetails = JSON.parse(localStorage.getItem('userDetails'));

const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');

const loadUserDetails = () => {
  userName.innerText = `${userDetails.firstName} ${userDetails.lastName}`;
  userEmail.innerText = `${userDetails.email}`;
};

loadUserDetails();