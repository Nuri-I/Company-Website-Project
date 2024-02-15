



function bringadminlist(){
    axios ({
        method: "get",
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'ConnectTo': 'showadminlist.php'
        },
        url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php"
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
        url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php"
    }) .then (response => {
            document.querySelector("table").innerHTML = response.data            

    })
}
