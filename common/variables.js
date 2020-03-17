// will hold element selectors throughout the test
let ELEMENT_SELECTORS = {};

// will hold page urls throughout the test
let PAGES = {};

// will hold variables used throughout the test suite 
let STATE = {};

const setElementSelector = selectors => {
    Object.assign(ELEMENT_SELECTORS, selectors);
};

const setPages = pages => {
    Object.assign(PAGES, pages);
}

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
