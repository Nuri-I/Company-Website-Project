
let form = document.querySelector('form');
let submit = document.querySelector('#submit');
submit.addEventListener('click', e =>{
    e.preventDefault();
    let username = form.querySelector('#username').value;
    let password = form.querySelector('#password').value;

    axios ({
        method: "post",
        url: "http://localhost:8080/admin-panel-project/admin/backend/login.php",
        data: {
            'username': username,
            'password': password
        } }) .then(response => {
            if (response.data.token){

                window.sessionStorage.setItem('token', response.data.token)
                window.location.assign('adminList.html')
            } else if (!document.querySelector('.alert')){
                form.after(document.createElement("replaceable"))
                document.querySelector("replaceable").innerHTML = `<div style="border: 2px solid #721d1d; background: #db5555; color:black; border-radius: 10px; width: 400px; height: 50px; display:flex; align-items: center;" class="alert">
                <strong style="margin-left: 10px;">${response.data.message}</strong>
                </div>`
                document.querySelector("replaceable").replaceWith(...document.querySelector("replaceable").childNodes)

            } else {
                document.querySelector(".alert").after(document.createElement("replaceable"))
                document.querySelector(".alert").remove()
                document.querySelector("replaceable").innerHTML = `<div style="border: 2px solid #721d1d; background: #db5555; color:black; border-radius: 10px; width: 400px; height: 50px; display:flex; align-items: center;" class="alert">
                <strong style="margin-left: 10px;">${response.data.message}</strong>
                </div>`
                document.querySelector("replaceable").replaceWith(...document.querySelector("replaceable").childNodes)


            }
            })
    
})


function bringadminlist(){
    axios ({
        method: "get",
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'ConnectTo': 'showadminlist.php'
        },
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then (response => {
            document.querySelector("table").innerHTML = response.data            

    })
}
function bringsitevars(){
    axios ({
        method: "get",
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'ConnectTo': 'showsitevars.php'
        },
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then (response => {
            document.querySelector("table").innerHTML = response.data            

    })
}
function bringproducts(){
    axios ({
        method: "get",
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'ConnectTo': 'showproducts.php'
        },
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then (response => {
            document.querySelector("table").innerHTML = response.data            

    })
}