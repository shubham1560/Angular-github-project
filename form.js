import { formValid } from './formValidation.js'

var g_form = new formValid();
// console.log(g_form.__proto__);
// document.getElementsByTagName("body")[0].onload(
//     document.getElementsByName("firstname")[0].setAttribute("required", true)
// );

g_form.setDisplay("firstname", true);
// g_form.setMandatory("firstname", true);
// g_form.setReadOnly("lastname", true);
// g_form.setValue("lastname", "Hell Yeah!");
// g_form.addInfoMessage("Hell Yeah");
// g_form.addErroMessage("Hell");
// g_form.addOption("cars", "maruti", "hatchback");
// g_form.addOption("cars", "marui", "chback");