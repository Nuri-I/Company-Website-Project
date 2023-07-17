



var form = document.querySelector("form")
let submit = document.querySelector('#send-message');
submit.addEventListener('click', e =>{
    e.preventDefault();
    let message = form.querySelector('#message').value;
    let subject = form.querySelector('#subject').value;
    let email = form.querySelector('#email').value;
    let name = form.querySelector('#name').value


    console.log(message);
    console.log(name);
    console.log(email);
    console.log(subject);

    axios ({
        method: "post",
        url: "http://localhost:8080/admin-panel-project/components/backend/submitForm.php",
        data: {
            'name': name,
            'email': email,
            'subject': subject,
            'message': message
        } }) .then(response => {
            console.log(response);
        })
    
})


var xhttp = new XMLHttpRequest();


function includeHTML() {
  var xhttp = new XMLHttpRequest();
  var z = document.getElementsByClassName("include");
  for (var i = 0; i < z.length; i++) {
    var elmnt = z[i];
    var file = elmnt.getAttribute("include-html");
    if (file) {
      fileCss = elmnt.getAttribute("include-css");
      if (fileCss) {
        document.head.innerHTML += `<link rel="stylesheet" href="${fileCss}" type="text/css"/>`;
      }
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
            elmnt.replaceWith(...elmnt.childNodes)
          }
          if (this.status == 404) { elmnt.innerHTML = "Component not found."; }
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();

      return;
    }
  }
}

function renderSiteVars() {
  var site_mails = document.getElementsByClassName("insert-main-email");
  var site_phones = document.getElementsByClassName("insert-main-phone");
  var site_adresses = document.getElementsByClassName("insert-main-adress");
  axios({
    method: "GET",
    url: "http://localhost:8080/admin-panel-project/components/backend/geteverything.php"
  })
    .then(response => {
      for (var i = 0; i < site_mails.length;) {
        var element = site_mails[i]
        element.innerHTML = response.data.email
        element.classList.remove("insert-main-email")
        for (var i = 0; i < site_phones.length;) {
          var element = site_phones[i];
          element.innerHTML = response.data.phone;
          element.classList.remove("insert-main-phone")
        }
        for (var i = 0; 0 < site_adresses.length;) {
          var element = site_adresses[i];
          element.innerHTML = response.data.adress
          element.classList.remove("insert-main-adress")
        }
      }
    })
}

var loaded = false 
window.addEventListener('scroll', function(){
  
  var element = document.querySelector("footer")
  var position = element.getBoundingClientRect();
  
  if (position.bottom && loaded == false){
    renderSiteVars();
    loaded = true;
  }
})


function renderProducts() {
  var element =   document.getElementById("product-page");
  axios({
    method: "get",
    url: "http://localhost:8080/admin-panel-project/components/backend/getProductList.php",
  })
  .then (response => {
    var products = response.data;
    for (let k = 0; k < products.length/2; k++) {
    element.innerHTML += "<div class= 'd-flex col-on-mobile product_row w-90-on-mobile' style ='flex-direction: row;'></div>"
    var insert = document.getElementsByClassName("product_row")

     for (let i = 0; i < (products.length-2*k < 2 ? products.length-2*k : 2); i++) {
      var a = k*2+i
      insert[k].innerHTML += products[a]
      
    }
  }
  })



}