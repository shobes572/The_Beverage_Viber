const loginButton = document.querySelector('#form-login');
const signupButton = document.querySelector('#form-signup');
const logoutButton = document.querySelector('#logout');

if (signupButton) {
    // event listener for form submit to signup
    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#username-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        if (username && password && email) {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, password, email }), 
                headers: { 'Content-Type': 'application/json' }});
            if (response.ok) document.location.replace('/bevselect');
            else alert(response.statusText)
        }
    });
}

if (loginButton) {
    // event listener for form submit to login
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#username-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();
    
        if (username && password) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }), 
                headers: { 'Content-Type': 'application/json' }});
            if (response.ok) document.location.replace('/bevselect')
            else alert(response.statusText)
        }
    });
}

if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        const response = await fetch('/api/users/logout', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }});
        if (response.ok) document.location.replace('/')
        else alert(response.statusText)
    });
}