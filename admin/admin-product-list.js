var confirmButton, form;


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

function new_product(e) {
    e.preventDefault();
    axios ({
        method: "get",
        headers: {
            'Authorization' : sessionStorage.getItem('token'),
            'ConnectTo': 'newentry.php'
        },
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php"
    }) .then(response => {
        newProductID = response.data.productid;
        document.querySelector("#productId").value = `${response.data.productid}`
        document.querySelector(".buttons").innerHTML = response.data.buttons
        document.querySelector("form").reset();
        document.querySelector("#preview_image").setAttribute("src", "")
        form = document.querySelector('form');
        confirmButton = document.querySelector("#confirm_product");
    })
}

function send_new_product(e) {
    e.preventDefault();

    let dataToSend=new FormData(form);
    dataToSend.append("productId", newProductID)
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
                reset_form_completely(e)
            })
        })
}

function reset_form_completely(e){
    e.preventDefault();
    document.querySelector("form").reset();
    document.querySelector("#preview_image").src = ""
    document.querySelector(".buttons").innerHTML = `<p> Yeni Ürün Ekle:</p>
    <button id="add_product" onclick = 'new_product(event)'>
        <img src="..\\..\\components\\images\\add.svg" alt="Yeni Ürün Ekle">
    </button>`

}

function edit_product(id, e) {
    e.preventDefault();
    axios({
        method: 'post',
        headers: 
        {
            'Authorization' : `${sessionStorage.getItem('token')}`,
            'ConnectTo': 'readyproductedit.php',
        },


        data: {
            'product_id': id
        },
        url: "http://localhost:8080/admin-panel-project/admin/backend/authenticate.php",
    }).then( response => {
        document.querySelector("#productId").value = response.data.product_id
        document.querySelector("#productName").value = response.data.product_name
        document.querySelector("#productDesc").value = response.data.product_description
        document.querySelector("#preview_image").src = response.data.product_image_url
        delete response.data.product_name
        delete response.data.product_description
        delete response.data.product_image_url
        delete response.data.product_id
        var bools = Object.keys(response.data);
        bools.forEach( key => {
           if (response.data[key] == 1)  {
            document.querySelector(`#${key}`).checked = true;
           } else {
            document.querySelector(`#${key}`).checked = false;
           }
        });

    })
}

var cancelButton = document.querySelector("#cancel_product");