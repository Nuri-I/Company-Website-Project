let form = document.querySelector('form');
let submit = document.querySelector('#submit');
submit.addEventListener('click', e =>{
    e.preventDefault();
    let username = form.querySelector('#username').value;
    let password = form.querySelector('#password').value;
    console.log(username);
    console.log(password);    

    axios ({
        method: "post",
        url: "http://localhost:8080/admin-panel-project/admin/backend/login.php",
        data: {
            'username': username,
            'password': password
        } }) .then(response => {
            console.log(response.data);
        })
    
})