var errorMessage = { 'why': "", "resolution": "" };

export function formValid() {
    this.intro = "form validation";
}

formValid.prototype.setMandatory = function(value, status) {
    var set = setInterval(function docReady() {
        var element = document.getElementsByName(value);

        if (document.readyState == "complete") {
            clearInterval(set);
            if (element.length == 1) {
                if (status) {
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