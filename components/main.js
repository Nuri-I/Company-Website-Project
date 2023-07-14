

var xhttp = new XMLHttpRequest();
function includeHTML() {
    var xhttp = new XMLHttpRequest();
    var z = document.getElementsByClassName("include");
    for (var i = 0; i < z.length; i++) {
      var elmnt = z[i];
      var file = elmnt.getAttribute("include-html");
      if (file) {
        fileCss = elmnt.getAttribute("include-css");
        if (fileCss){
            document.head.innerHTML += `<link rel="stylesheet" href="${fileCss}" type="text/css"/>`;
        }    
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;
            elmnt.replaceWith(...elmnt.childNodes)}
            if (this.status == 404) {elmnt.innerHTML = "Component not found.";}
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

function renderAll() {
var site_mails = document.getElementsByClassName("insert-main-email");
var site_phones = document.getElementsByClassName("insert-main-phone");
var site_adresses = document.getElementsByClassName("insert-main-adress");
axios ({
        method: "GET",
        url: "http://localhost:8080/admin-panel-project/components/backend/geteverything.php"
    })
    .then (response =>{ 
    for (var i = 0; i < site_mails.length;) {
        console.log(site_mails);
        var element = site_mails[i]
        element.innerHTML = response.data.email
        element.classList.remove("insert-main-email")    
    for (var i = 0; i < site_phones.length;) {
        console.log(site_phones)
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