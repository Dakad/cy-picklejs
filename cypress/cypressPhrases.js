const cypressFunctions = require('./cypressFunctions');

const REGEX = require('../common/regex');

module.exports = () => {
    // ex: I scroll to the bottom the "Modal"
    When(REGEX.SCROLL, cypressFunctions.scroll);

    // ex:  I click on the "Button"
    //      I click "Save"
    //      I click on "Save" inside the "Modal"
    //      I click on "Button" inside the "Modal" containing "Save"
    When(REGEX.CLICK, cypressFunctions.click);


    // ex:  I type "toli" into the "Username Input"
    //      I type "toli" into "Username"
    //      I type "toli" into the "Username Input" on the "SignIn form"
    When(REGEX.TYPE, cypressFunctions.type);


    // ex:  When I replace the contents of "Username" with "toli"
    //      When I replace the contents of "Username" inside of the "Login Modal" with "toli"
    When(REGEX.REPLACE, cypressFunctions.replace);


    // ex: I open the "Login Screen"
    When(REGEX.OPEN, cypressFunctions.open);


    // ex: I am on "Sign up" page
    When(REGEX.BE_ON, cypressFunctions.open);


    // @TODO: Figure out while default way isn't working
    When(REGEX.WAIT_FOR_RESULTS, cypressFunctions.waitForResults);


    // use only in cases where Cypress functions can't be used
    When(REGEX.WAIT_SECONDS, cypressFunctions.wait);


    // This is experimental and not part of the official API
    When(REGEX.DRAG_ABOVE, cypressFunctions.dragAbove);


    When(REGEX.TAKE_SNAPSHOT, cypressFunctions.takeSnapshot);


    When(REGEX.TAKE_EL_SNAPSHOT, cypressFunctions.takeElSnapshot);


    When(REGEX.TAKE_SNAPSHOT_NAMED, cypressFunctions.takeNamedSnapshot)

    
    // ex: I should be on the "Login Screen"
    Then(REGEX.ON_PAGE, cypressFunctions.onPage);


    // ex: I should be redirected to the "Login Screen"
    Then(REGEX.REDIRECTED_TO, cypressFunctions.redirectedTo);


    // I should see 3 "Buttons" in "Modal"
    Then(REGEX.N_ELEMENTS, cypressFunctions.nElements);


    // ex: I should see "Press Me" on the "Button" inside the "Modal"
    Then(REGEX.TEXT_ON_EL, cypressFunctions.textOnEl);


    // putting after because the one before exclusively works
    // for text and doesn't have a verb before it
    // ex: I should see "Press Me Button" on the "Button" inside the "Modal"
    Then(REGEX.EL_EXISTS, cypressFunctions.elExists);


    // ex:  I should not see the "Buttons" in the "Modal"
    //      I should not see "Buttons" on the "Page"
    //      I should not see the "Button"
    Then(REGEX.EL_DOES_NOT_EXIST, cypressFunctions.elDoesNotExist);


    // ex: "Username" should be "toli"
    Then(REGEX.EL_CONTAINS_TEXT, cypressFunctions.elHasValue);


    // ex: "Username's" value should be "toli"
    Then(REGEX.EL_VALUE, cypressFunctions.elHasValue);


    // ex: I should see a "red" background on the "Button"
    Then(REGEX.EL_BACKGROUND, cypressFunctions.elBackground)


    // ex: I should see a "red" border on the "Button"
    Then(REGEX.EL_BORDER, cypressFunctions.elBorder)
}
