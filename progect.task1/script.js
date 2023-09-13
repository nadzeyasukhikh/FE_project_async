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

    if (data && data.length > 0) {
        renderUser(data[0]);
        alert('Авторизация успешна.');
    } else {
        alert('Такого пользователя не существует.');
    }
});

function validateInput(event) {
    const feedback = event.target.nextElementSibling;

    if (event.target.value.trim() !== '') {
        feedback.textContent = 'Поле заполнено верно.';
        feedback.style.color = "#32CD32";
    } else {
        feedback.textContent = 'Поле заполнено не верно.';
        feedback.style.color = "#FF0000"; 
    }
}

function renderUser(user) {
    const container = document.querySelector('#userDetails');
    form.style.display = "none";
    container.style.display = "block";
    container.innerHTML = `
        <p>ID: ${user.id}</p>
        <p>Name: ${user.name}</p>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Website: <input id="websiteInput" value="${user.website}"></p>
        <button id="updateWebsite">Редактировать Website</button>
    `;

    document.querySelector('#updateWebsite').addEventListener('click', () => {
        user.website = document.getElementById('websiteInput').value;
        alert('Website отредактирован!');
    });
}








