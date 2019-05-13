const url = 'https://a-bank.herokuapp.com/api/v1/auth/superuser';
const signup = document.getElementById('superuser');
const token = localStorage.getItem('token');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const isAdmin = document.getElementById('is-admin');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const successContainer = document.querySelector('.success ul');
const successCont = document.querySelector('.success');

const createNode = (element) => {
  return document.createElement(element);
}

const append = (parent, el) => {
  return parent.appendChild(el);
}
signup.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            firstName: firstname.value,
            lastName: lastname.value,
            email: email.value,
            password: password.value,
            isAdmin: isAdmin.checked
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.status === 409) {
        errorCont.style.display = 'block';
        let li = createNode('li');
        li.innerHTML = `${response.error}, please specify a new email <br>`;
        append(errorContainer, li);
        return setTimeout(() => {
            errorCont.style.display = 'none';
            errorContainer.innerHTML = '';
        }, 5000);
      }
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
        successCont.style.display = 'block';
        let msg = createNode('li');
        msg.innerHTML = `${isAdmin.checked ? 'Admin' : 'Cashier'} account created successfully`;
        append(successContainer, msg);
        setTimeout(() => {
          successCont.style.display = 'none';
          successContainer.innerHTML = '';
          window.location = './admin.html';
        }, 5000);
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