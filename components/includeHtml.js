//Made for future use with any javascript framework
//TODO: Minimize

function includeHTML() {
    var z = document.getElementsByClassName("include");
    for (var i = 0; i < z.length; i++) {
      var elmnt = z[i];
      var file = elmnt.getAttribute("include-html");
      if (file) {
        fileCss = elmnt.getAttribute("include-css");
        if (fileCss){
            document.head.innerHTML += `<link rel="stylesheet" href="${fileCss}" type="text/css"/>`;
        }    
        var xhttp = new XMLHttpRequest();
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