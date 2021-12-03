# input-only-numbers

Setting number of digits, successful and unsuccessful fill classes, function callback on successful completion

![](https://habrastorage.org/webt/lt/ij/yv/ltijyvo4sdcwhwaxfxzpkuuexq4.gif)

## Install
```bash
npm i -S input-only-numbers
```
or
```bash
yarn add input-only-numbers
```
## Usage
```javascript
// js/app.js
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
```
```html
<!-- index.html -->
    <input type="text"
        class="input-only-numbers demostration"
        data-limit="10"
        data-valid="success"
        data-invalid="fail">
    <script src="./js/app.js"></script>
```



