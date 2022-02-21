import { showHome } from "./home.js";
import { showLogin } from './login.js';
import { showRegister } from './register.js';
//TODO: Add movie logic,Edit and Delete btns on movie and Register logic


//create placeholderes foe every view
//configure an test navifation
//implement modules
//- create async functions for requests
//- implement DOM logic 

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
}

document.querySelector('#logoutLink').addEventListener('click', onLogout);

const nav = document.querySelector('nav');
nav.addEventListener('click', (event) => {

    //This will return the View we need by ID-name and will trigger the necessary function
    const view = views[event.target.id];

    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }


});

//Order of Views
//x catalog (home view)
//x login and register users
//- create 
//x details 
//x likes 
//- edit (1.load data/ 2.populate form/ 3.Validation/ 4.Request)
//- delete

updateNav()
//starts the App in home view(catalog)
showHome();

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;

       [ ...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
       [ ...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');

    }else{
        [ ...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [ ...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
 }
}

async function onLogout(event) {
    event.preventDefault();

    //when we have 2 eventListeners at the same element .stopImmediatePropagation(); is recomended
    event.stopImmediatePropagation();

    const {token} = JSON.parse(sessionStorage.getItem('userData'));

    await fetch('http://localhost:3030/users/logout',{
        headers: {
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');
    showLogin();
    updateNav();
}