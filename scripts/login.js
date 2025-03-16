function login() {
    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    console.log(password);
    if (username === "") {
        alert('Please enter your username !!!!!');
        return;
    }
    if (password === "123456") { 
        alert(`Welcome, ${username}!`);
        document.getElementById('hero').style.display = 'none';
    } else {
        alert('Wrong password! Please try again.');
    }
}