import { InputOnlyNumbers } from "input-only-numbers";

/**
 * Function exec after susses fill input fields
 * 
 * @param {Event} element 
 */
function callback(element) {
    console.log(element.target)
}

let inputOnlyNumbers = new InputOnlyNumbers({
    className: 'input-only-numbers',
    callback: callback
});

inputOnlyNumbers.init();
