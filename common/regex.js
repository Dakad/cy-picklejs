const {
    re,
    string,
    number,
    elInEl,
    page,
} = require('./regexBuilder');

module.exports = {
    SCROLL: re(`I scroll to the (top|bottom) of the page`),
    SCROLL_TO: re(`I scroll to${elInEl}`),

    CLICK: re(`I click${elInEl}`),
    TYPE: re(`I type ${string}${elInEl}`),
    REPLACE: re(`I replace the contents${elInEl} with ${string}`),

    OPEN: re(`I open${page}`),

    WAIT_FOR_RESULTS: re(`I wait for results to load`),
    WAIT_SECONDS: re(`I wait for ${number} seconds`),

    DRAG_ABOVE: re(`I drag${elInEl} above${elInEl}`),

    TAKE_SNAPSHOT:  re(`I take a snapshot`),
    TAKE_EL_SNAPSHOT: re(`I take a snapshot of${elInEl}`),
    TAKE_SNAPSHOT_NAMED: re(`I take a snapshot named ${string}`),
    
    ON_PAGE: re(`I should be on${page}`),
    REDIRECTED_TO: re(`I should be redirected to${page}`),
    
    N_ELEMENTS: re(`I should see ${number}${elInEl}`),
    TEXT_ON_EL: re(`I should see ${string}${elInEl}`),
    EL_EXISTS: re(`I should see${elInEl}`),
    EL_DOES_NOT_EXIST: re(`I should not see${elInEl}`),
    EL_CONTAINS_TEXT: re(`${elInEl} should (?:be|contain) ${string}`),
    EL_VALUE: re(`${elInEl} value should be ${string}`),
    EL_BACKBGROUND: re(`I should see a ${string} background${elInEl}`),
    EL_BORDER: re(`I should see a ${string} border${elInEl}`),
};
