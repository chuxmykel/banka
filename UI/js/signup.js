const url = 'https://a-bank.herokuapp.com/api/v1/auth/signup';
const signup = document.getElementById('signup');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const loader = document.querySelector('.loader');
const loaderCont = document.querySelector('.loader-container');
const alert = document.querySelector('.alert');

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
        }),
        headers: {
            'Content-Type': 'application/json',
        }
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
        loaderCont.style.display = 'block';
        setTimeout(() => {
          window.location = './user-dashboard.html'
        }, 3000);
        localStorage.setItem('token', response.data[0].token);
        localStorage.setItem('userDetails', JSON.stringify(response.data[0]));
        localStorage.setItem('loggedIn', true);
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