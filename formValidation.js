var errorMessage = { 'why': "", "resolution": "" };

export function formValid() {
    // this.intro = "form validation";
}

formValid.prototype.setMandatory = function(value, status) {
    var set = setInterval(function docReady() {
        var element = document.getElementsByName(value);

        if (document.readyState == "complete") {
            clearInterval(set);
            if (element.length == 1) {
                if (status) {
                    // if (element[0].hasAttribute("readonly")) { 
                    // console.error("Can't be set to mandatory as the field is readonly")
                    // }
                    element[0].setAttribute("required", true);
                } else {
                    element[0].removeAttribute("required");
                }
            } else {
                if (element.length < 1) {
                    errorMessage.why = "No form fields with the name: " + value;
                    errorMessage.resolution = "Check for the name passed in the function parameter!";
                } else {
                    errorMessage.why = "Multiple inputs with name: " + value;
                    errorMessage.resolution = " Check that there are not many field with same name ";
                }
                console.error("Reason: " + errorMessage.why);
                console.error("Resolution: " + errorMessage.resolution);
            }
        }
    }, 1);
}


formValid.prototype.setReadOnly = function(value, status) {
    var element = document.getElementsByName(value);
    var set = setInterval(function readonly() {
        if (document.readyState == "complete") {
            clearInterval(set);
            if (element.length == 1) {
                if (status === true) {
                    element[0].style.backgroundColor = "#ddd";
                    element[0].setAttribute("readonly", true);
                } else if (status === false) {
                    if (element[0].hasAttribute("readonly")) {
                        element[0].removeAttribute("readonly");
                    }
                } else {
                    console.error("the second argument should be boolean");
                }
            } else {
                console.error("error for length");
            }
        }
    }, 1)
}

formValid.prototype.setValue = function(fieldname, value) {

    var set = setInterval(function() {
        var element = document.getElementsByName(fieldname)[0];
        if (document.readyState == "complete") {
            element.setAttribute("value", value);
            console.log(document.readyState);
            clearInterval(set);
        } else {
            console.log(document.readyState);
        }
    }, 1);

}


formValid.prototype.addInfoMessage = function(message) {

    var a = document.createElement("div");
    // a.setAttribute("id", "info");
    a.setAttribute("class", "message");
    a.style.marginTop = "10px";
    a.style.backgroundColor = "#b5dde5";
    a.style.border = "1px solid #6abecf";
    a.style.padding = "2px 5px 2px 5px";
    a.style.borderRadius = "2px";
    a.innerHTML = message;
    document.getElementsByTagName("form")[0].appendChild(a);
}


formValid.prototype.addErroMessage = function(message) {

    var a = document.createElement("div");
    a.setAttribute("class", "message");
    // a.setAttribute("id", "info");
    a.style.marginTop = "10px";
    a.style.backgroundColor = "#ff9999";
    a.style.border = "1px solid Red";
    a.style.padding = "2px 5px 2px 5px";
    a.style.borderRadius = "2px";
    a.innerHTML = message;
    document.getElementsByTagName("form")[0].appendChild(a);
}


formValid.prototype.addOption = function(choiceName, value, label) {
    var a = document.createElement("option")
    a.setAttribute("value", value)
    a.innerText = label
    document.getElementsByName(choiceName)[0].appendChild(a);
}