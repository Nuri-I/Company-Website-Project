
//load products
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
axios ({
    method: "get",
    headers: {
        'Authorization': sessionStorage.getItem('token'),
        'ConnectTo': 'showproductbools.php'
    },
    url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
}) .then (response => {
        document.querySelector("#bools").innerHTML = response.data            

})
//add products
var addButton = document.querySelector("#add_product");
var editedProductID = 0
var preview_image = document.querySelector("#product_image");
var preview = ""

function show_preview(e) {
    preview = URL.createObjectURL(e.target.files[0])
    document.querySelector("#preview_image").setAttribute('src', `${preview}`)
}

addButton.addEventListener('click', e =>{
    e.preventDefault();
    axios ({
        method: "get",
        headers: {
            'Authorization' : sessionStorage.getItem('token'),
            'ConnectTo': 'newentry.php'
        },
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then(response => {
        editedProductID = response.data.productid;
        document.querySelector("#productId").value = `${response.data.productid}`
        document.querySelector(".buttons").innerHTML = response.data.buttons
        activate_edit();
    })
})

function activate_edit() {
let form = document.querySelector('form');
let confirmButton = document.querySelector("#confirm_product");
confirmButton.addEventListener('click', e =>{
    e.preventDefault();
    let dataToSend=new FormData(form);
    dataToSend.append("productId", editedProductID)
    console.log(dataToSend)
    axios ({
        method: "post",
        headers: {
            'Authorization' : `${sessionStorage.getItem('token')}`,
            'ConnectTo': 'addproduct.php',
            enctype: "multipart/form-data"
        },
        data: dataToSend,
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then(response => {


        axios ({
            method: "get",
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'ConnectTo': 'showproducts.php'
            },
            url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
        }) .then (response => {
                document.querySelector("table").innerHTML = response.data            
                document.querySelector("form").reset();
            })
        })
})   
}

var cancelButton = document.querySelector("#cancel_product");