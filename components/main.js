






var xhttp = new XMLHttpRequest();
let form = document.querySelector('form');


window.addEventListener('scroll', function loadAllVars() {
  if (document.querySelector("footer")) {
    renderSiteVars();
    window.removeEventListener('scroll', loadAllVars)
  }
})



if (form) {
  let submit = document.querySelector('#send-message');
  submit.addEventListener('click', e => {
    e.preventDefault();
    let name = form.querySelector('#name');
    let email = form.querySelector('#email');
    let subject = form.querySelector('#subject');
    let message = form.querySelector('#message');
    axios({
      method: "post",
      url: "http://localhost:8080/admin-panel-project/components/backend/submitForm.php",
      data: {
        'name': name.value,
        'email': email.value,
        'subject': subject.value,
        'message': message.value
      }
    }).then(response => {
      if (document.querySelector("#success")) {
        document.querySelector("#success").remove();
      }
      if (response.data === "success") {
        form.after(document.createElement("replaceable"))
        document.querySelector('replaceable').innerHTML = `<div class="alert alert-success d-flex align-items-center" id = "success" role="alert">
              <img src = "components/images/success.svg" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
              <div>
                Mesajınız bize iletilmiştir
              </div>`;
        document.querySelector('replaceable').replaceWith(...document.querySelector('replaceable').childNodes)
        return;
      }
      if (/.*name.*/.test(response.data)) {
        console.log("name missing")
      }
      if (/.*email.*/.test(response.data)) {
        console.log("email missing")
      }
      if (/.*subject.*/.test(response.data)) {
        console.log("subject missing")
      }
      if (/.*message.*/.test(response.data)) {
        console.log("message missing")
      }
      if (/.*notmail*/.test(response.data)) {
        console.log("not email")
      }
    })

  })
}




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


function renderProducts() {
  var element = document.getElementById("product-page");
  axios({
    method: "get",
    url: "http://localhost:8080/admin-panel-project/components/backend/getProductList.php",
  })
    .then(response => {
      var products = response.data;
      for (let k = 0; k < products.length / 2; k++) {
        element.innerHTML += "<div class= 'd-flex col-on-mobile product_row w-90-on-mobile' style ='flex-direction: row;'></div>"
        var insert = document.getElementsByClassName("product_row")

        for (let i = 0; i < (products.length - 2 * k < 2 ? products.length - 2 * k : 2); i++) {
          var a = k * 2 + i
          insert[k].innerHTML += products[a]

        }
      }
    })

  axios({
    method: "get",
    url: "http://localhost:8080/admin-panel-project/components/backend/getProductSpesifics.php",
  })
    .then(response => {
      var element_specs = document.getElementById("choose-list");
      var product_specs = response.data;
      for (let k = 0; k < product_specs.length; k++) {
        element_specs.innerHTML += product_specs[k]
      }
    })


}

function renderAgainProducts(p) {
  var element = document.querySelector("#product-page");
  element.replaceChildren("") 
  axios({
    method: "POST",
    url: "http://localhost:8080/admin-panel-project/components/backend/adjustProducts.php",
    data: {
      'adjusting': p
    }
  })
    .then(response => {
      var products = response.data;
      for (var k = 0; k < products.length / 2; k++) {
        element.innerHTML += "<div class= 'd-flex col-on-mobile product_row w-90-on-mobile' style ='flex-direction: row;'></div>"
        var insert = document.getElementsByClassName("product_row")
        for (var i = 0; i < (products.length - 2 * k < 2 ? products.length - 2 * k : 2); i++) {
          var a = k * 2 + i
          insert[k].innerHTML += products[a]
        }
      }
    })
}