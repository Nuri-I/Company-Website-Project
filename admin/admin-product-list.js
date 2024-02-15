var confirmButton, form;
form = document.querySelector('form');

//load products
function renew_products(){ 
axios ({
    method: "get",
    headers: {
        'Authorization': sessionStorage.getItem('token'),
        'ConnectTo': 'showproducts.php'
    },
    url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php"
}) .then (response => {
        document.querySelector("table").innerHTML = response.data            

})
}

function renew_bools(){
axios ({
    method: "get",
    headers: {
        'Authorization': sessionStorage.getItem('token'),
        'ConnectTo': 'showproductbools.php'
    },
    url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php"
}) .then (response => {
        document.querySelector("#bools").innerHTML = response.data            

})
}
function reset_form_completely(){
    document.querySelector("form").reset();
    document.querySelector("#preview_image").src = ""
    document.querySelector(".buttons").innerHTML = `<p> Yeni Ürün Ekle:</p>
    <button id="add_product" onclick = 'new_product(event)'>
        <img src="..\\..\\components\\images\\add.svg" alt="Yeni Ürün Ekle">
    </button>`

}
document.addEventListener(onload, renew_products())
document.addEventListener(onload, renew_bools())
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
            'ConnectTo': 'newproductentry.php'
        },
        url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php"
    }) .then(response => {
        reset_form_completely();
        newProductID = response.data.product_id
        document.querySelector("#productId").value = response.data.product_id
        document.querySelector(".buttons").innerHTML = `<label for='confirm_product'>Ürünü Kaydet</label>
        <button id='confirm_product' onclick='send_new_product(event)'>
        <img src='..\/..\/components\/images\/confirm-edit.svg' alt='Ürünü Ekle'>
        </button>
        <label for='cancel_product'>Kaydı İptal Et</label>
        <button id='cancel_product' onclick='reset_form_completely(event)'>
        <img src='..\/..\/components\/images\/cancel.svg' alt='Ürünü Eklemekten Vazgeç'>
        </button>`
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
        url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php"
    }) .then(response => { 
        renew_products()
        reset_form_completely()
        })
}


// edit product
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
        url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php",
    }).then( response => {
        document.querySelector("#productId").value = response.data.product_id
        document.querySelector("#productName").value = response.data.product_name
        document.querySelector("#productDesc").value = response.data.product_description
        document.querySelector("#preview_image").src = response.data.product_image_url
        delete response.data.product_image_url
        delete response.data.product_description
        delete response.data.product_name
        delete response.data.product_id
        console.log(response.data)
        var bools = Object.keys(response.data);
        bools.forEach( key => {
           if (response.data[key] == 1)  {
            document.querySelector(`#${key}`).checked = true;
           } else {
            document.querySelector(`#${key}`).checked = false;
           }
        });
        document.querySelector('.buttons').innerHTML = `
        <label for='confirm_product'>Düzenlemeyi Kaydet</label>
        <button id='confirm_product' onclick='finalize_edit(event)'>
        <img src='..\/..\/components\/images\/confirm-edit.svg' alt='Ürünü Ekle'>
        </button>
        <label for='cancel_product'>Kaydı İptal Et</label>
        <button id='cancel_product' onclick='reset_form_completely(event)'>
        <img src='..\/..\/components\/images\/cancel.svg' alt='Ürünü Eklemekten Vazgeç'>
        </button>`
    })
}

function finalize_edit(e) {  
    e.preventDefault();
    let dataToSend=new FormData(form);
    dataToSend.append('productId', document.querySelector('#productId').value)
axios({
    method: 'POST',
    headers: {
        'Authorization' : `${sessionStorage.getItem('token')}`,
        'ConnectTo': 'editproduct.php',
    },
    data: dataToSend,
    url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php",
}).then (response => {
    renew_products()
    reset_form_completely()
})
}
// delete product
function delete_product(id,e){
    e.preventDefault();
    let deleted_product_name = document.querySelector(`#product_name_${id}`).innerHTML 
    if (confirm(deleted_product_name + " isimli ürün alıcı olarak silmek istediğinizden eminmisiniz?")){
        axios({
            method: 'post',
            headers: {
                'Authorization' : `${sessionStorage.getItem('token')}`,
                'ConnectTo': 'deleteproduct.php',
            },
            data: {'product_id': id},
            url: "http://localhost:80/Company-Website-Project/admin/backend/authenticate.php",
        }).then (response => {
            renew_products()
        })
    } else {
        console.log("oh no")
    }
}