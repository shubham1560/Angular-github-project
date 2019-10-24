import { formValid } from './formValidation.js'

var a = new formValid();
console.log(a);
a.setMandatory("firstname", false);