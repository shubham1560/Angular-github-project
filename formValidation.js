(function() {

    function formValid() {
        this.intro = "form validation";
    }

    formValid.prototype.setMandatory = function(value, status) {
        var set = setInterval(function docReady() {
            console.log(value, status);
            if (document.readyState == "complete") {
                if (status) {
                    document.getElementsByName(value)[0].setAttribute("required", true);
                } else {
                    document.getElementsByName(value)[0].removeAttribute("required");
                }
                clearInterval(set);
            }
        }, 1);
    }


    var a = new formValid();
    a.setMandatory("lastname", true);


}())