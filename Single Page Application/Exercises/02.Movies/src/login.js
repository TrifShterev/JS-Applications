import { updateNav } from './app.js';
import { showView } from './dom.js';
import { showHome } from './home.js';
//initialization
// - find relevant section


// - detach section from Dom
const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
section.remove();

//Display logic
export function showLogin() {
    showView(section);
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const response = await fetch('http://localhost:3030/users/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/'},
            body: JSON.stringify({ email, password })
        });

        if (response.ok != true) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const result = await response.json();

        sessionStorage.setItem('userData',JSON.stringify({
            email: result.email,
            id: result._id,
            token: result.accessToken
        }));


        form.reset();
        updateNav();
        showHome();

    } catch (error) {
        alert(error.message)
    }


}