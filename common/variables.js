// will hold element selectors throughout the test
let ELEMENT_SELECTORS = {};

// will hold page urls throughout the test
let PAGES = {};

// will hold variables used throughout the test suite 
let STATE = {};



/**
 * https://stackoverflow.com/a/59787588
 * 
 * Flatten 
 * 
 * @param {Object} ob      The object to flatten
 * @param {String} key_prefix  (Optional) The prefix to add before each key, also used for recursion
 **/
function flattenObject(obj, key_prefix) {
    const flatted = {};
    
    key_prefix = key_prefix ? key_prefix + ' > ' : '' ; 
    
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursion on deeper objects
            Object.assign(flatted, flattenObject(obj[key], key_prefix + key));
        } else {
            flatted[key_prefix + key] = obj[key];
        }
    }

    return flatted;
}


/**
 * Append element selectors to element selectors holder.
 * Keep the original and flatten version of the given selectors.
 * 
 * @param {Object} selectors 
 * @param {String} pageName 
 */
const setElementSelector = (selectors, pageName) => {
    Object.assign(
        ELEMENT_SELECTORS, 
        selectors, 
        flattenObject(selectors)
    );
};


/**
 * 
 * @param {Object} pages THe pages identified by it name
 */
const setPages = pages=> {
    Object.assign(PAGES, pages, flattenObject(pages));
}


/**
 * 
 * Store a value reference by a variable
 * 
 * @param {string}  variable    Variable name used as key to store/get the value stored
 * @param {any}     value       Varible value to store 
 */
const setState = (variable, value) => {
    STATE[variable] = value;
}


module.exports = {
    ELEMENT_SELECTORS,
    PAGES,
    STATE,
    setElementSelector,
    setPages,
    setState,
};
