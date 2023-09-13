const baseURL = "https://jsonplaceholder.typicode.com/users";

async function fetchData(username, email) {
  const url = `${baseURL}?username=${username}&email=${email}`;
  
  try {
    const allUsersRes = await fetch(baseURL);
    const allUsersData = await allUsersRes.json();
    console.log(allUsersData);


    const res = await fetch(url);
    const data = await res.json();
    
    return data;
    
  } catch (e) {
    console.log('Ошибка:', e);
  }
}

const form = document.querySelector('#authForm');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const usernameFeedback = document.querySelector('#usernameFeedback');
const emailFeedback = document.querySelector('#emailFeedback');

usernameInput.addEventListener('input', validateInput);
emailInput.addEventListener('input', validateInput);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = usernameInput.value;
    const email = emailInput.value;

    const data = await fetchData(username, email);
    console.log(data);

    if (data && data.length === 0) {
        alert('Такого пользователя не существует.');
    } else {
        alert('Авторизация успешна.');
    }
});

function validateInput(event) {
    const feedback = event.target.nextElementSibling;

    if (event.target.value.trim() !== '') {
        feedback.textContent = 'Поле заполнено верно.';
    } else {
        feedback.textContent = '';
    }
}








