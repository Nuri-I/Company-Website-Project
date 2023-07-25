
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
//add products
var addButton = document.querySelector("#add_product");
var editedProductID = 0
var timesChange
var preview_image = document.querySelector("#product_image");
var preview = ""

function show_preview(e) {
    console.log(preview)
    preview = URL.createObjectURL(e.target.files[0])
    console.log(preview)
    document.querySelector("#preview_image").setAttribute('src', `${preview}`)
}

addButton.addEventListener('click', e =>{
    e.preventDefault();
    axios ({
        method: "get",
        headers: {
            'Authorization' : sessionStorage.getItem('token'),
            'ConnectTo': 'getproductmax.php'
        },
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then(response => {
        editedProductID = response.data.productid;
        document.querySelector("form").reset();
        document.querySelector("#preview_image").src = ""
        document.querySelector("#product_id").setAttribute("placeholder", response.data.productid)
        document.querySelector(".buttons").innerHTML = response.data.buttons
        activate_edit();
    })
})

function activate_edit() {
let form = document.querySelector('form');
let confirmButton = document.querySelector("#confirm_product");
confirmButton.addEventListener('click', e =>{
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("id", editedProductID)
    image = form.querySelector('#product_image').files[0]
    newName = editedProductID.toString() + "." + image.name.split('.').pop()
    console.log(newName)
    formdata.append("productImg", image, newName)
    
    console.log(formdata.getAll('productName'))
    axios ({
        method: "post",
        headers: {
            'Authorization' : sessionStorage.getItem('token'),
            'ConnectTo': 'addimg.php'

        },
        data: formdata,
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then(response => {
        axios ({
            method: "post",
            headers: {
                'Authorization' : sessionStorage.getItem('token'),
                'ConnectTo': 'addproduct.php'
            },
            url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php",
            data: {
                "id" : editedProductID,
                "name": form.querySelector('#product_name').value,
                "desc":  form.querySelector('#product_desc').value
            }
        }) .then (last => {
            console.log(last)
        })
    })
})   
}

var cancelButton = document.querySelector("#cancel_product");