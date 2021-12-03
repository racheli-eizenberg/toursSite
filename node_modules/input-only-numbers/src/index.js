'use strict'
/**
 * 
 * 
 * @class InputOnlyNumbers
 */
class InputOnlyNumbers {
    /**
     * Creates an instance of InputOnlyNumbers.
     * @param {any} config 
     * @memberof InputOnlyNumbers
     */
    constructor(config) {
        if (config == null) {
            throw `
            Class 'InputOnlyNumbers' need config as object
            {
                className: <string>
            }
            `
        }
        if (typeof (config.className) == 'undefined') {
            throw `
            Not found 'className' property
            `
        }
        if (typeof (config.callback) == 'undefined') {
            throw `
            Not found 'callback' property
            `
        }
        this.className = config.className
        this.callback = config.callback
    }
    /**
     * Add EventListener for all inputs whith `className`
     * 
     * @memberof InputOnlyNumbers
     */
    init() {
        this.elements = document.getElementsByClassName(this.className)
        for (let counter = 0; counter < this.elements.length; counter++) {
            this.elements[counter].addEventListener(
                'keydown',
                (e) => {
                    setTimeout(
                        () => {
                            this.checkValue(e)
                        },
                        0
                    )
                }
            )
        }
    }
    /**
     * Toggle class for element and start callback 
     * 
     * @param {Event} e 
     * @memberof InputOnlyNumbers
     */
    checkValue(e) {
        e.target.value = e.target.value.replace(
            /\D/g,
            ''
        )
        const value = e.target.value
        const classList = e.target.classList
        const validClass = e.target.dataset.valid ? e.target.dataset.valid : null
        const invalidClass = e.target.dataset.invalid ? e.target.dataset.invalid : null
        const limit = e.target.dataset.limit ? e.target.dataset.limit : null
        if (value.length < limit) {
            classList.add(invalidClass)
            if (classList.contains(validClass)) {
                classList.remove(validClass)
            }
        } else {
            classList.add(validClass)
            if (classList.contains(invalidClass)) {
                classList.remove(invalidClass)
            }
            e.target.value = value.substr(0, limit)
            this.callback(e)
        }
    }
}


export {
    InputOnlyNumbers
};