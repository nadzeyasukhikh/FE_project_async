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
    console.log('Error:', e);
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
        
    } else {
        alert('This user does not exist.');
    }
});

function validateInput(event) {
    const feedback = event.target.nextElementSibling;

    if (event.target.value.trim() !== '') {
        feedback.textContent = 'The field is filled in correctly.';
        feedback.style.color = "#32CD32";
    } else {
        feedback.textContent = 'The field is filled in incorrectly.';
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
        <button id="updateWebsite">Edit Website</button>
        <button id="btnSearch">Search</button>
    `;
    const updateWebsite = document.querySelector('#updateWebsite')
    const websiteInput = document.querySelector('#websiteInput')
    updateWebsite.addEventListener('click', () => {
        user.website = websiteInput.value;
        alert('Website edited!');
    });

    const btnSearch = document.querySelector("#btnSearch");
    const nextPage = document.querySelector('#nextPage')
    btnSearch.addEventListener("click", () => {
        container.style.display = 'none';
        nextPage.style.display = 'block';
    });
}



const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');
const btnAlbums = document.querySelector('#btnAlbums');
const btnTodos = document.querySelector('#btnTodos');
const btnPosts = document.querySelector('#btnPosts')

let currentSearchType = "";

btnAlbums.addEventListener('click', () => {
    currentSearchType = "albums";
    toggleSearchPage();
});

btnTodos.addEventListener('click', () => {
    currentSearchType = "todos";
    toggleSearchPage();
});

btnPosts.addEventListener('click', () => {
    currentSearchType = "posts";
    toggleSearchPage();
});

function toggleSearchPage() {
    const nextPage = document.querySelector('#nextPage')
    const searchContainer = document.querySelector('#searchContainer')
    nextPage.style.display = 'none';
    searchContainer.style.display = 'block';
    searchInput.value = '';
    searchResults.innerHTML = '';
}

searchInput.addEventListener('input', async (event) => {
    const query = event.target.value;
    if (query) {
        const results = await searchByTitle(query, currentSearchType);
        displayResults(results);
    } else {
        searchResults.innerHTML = '';
    }
});

async function searchByTitle(query, type) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${type}`);
        const data = await response.json();

        return data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    } catch (e) {
        console.log('Error:', e);
    }
}

function displayResults(results) {
    searchResults.innerHTML = results.map(item => `<div>${item.title}</div>`).join('');
}












