const {
    PAGES,
    STATE,
    setState,
} = require('../common/variables');

const { getSelector, hex2rgbCSS, getNormalized } = require('../common/functions');

// MORE SPECIALIZED FUNCTIONs (catching Regex)

const scroll = (direction) => {
    let windowObj;
    cy.window()
        .then(win => {
            windowObj = win;
            return cy.get('body');
        })
        .then(body => {
            const { scrollHeight } = body[0];
            const px = direction === 'top'
                ? 0
                : scrollHeight + 100;

            windowObj.scrollTo(0, px);
        });
}

const click = (el, parent, text) => (
    getNormalized([parent, el], { text })
        .first()
        .click()
);

const type = (text, input, parent) => {
   // Accept : user_<random:userId>  or  <random:9:appId>
   const randomVariableRegex = /<random(?::(?<digits>\d))?:(?<var>\w+)>/;
    const foundRandomVar = text.match(randomVariableRegex);

    if (foundRandomVar) {
        const digits = foundRandomVar.groups('digits') || 1;
        const randomNumber = Math.round(Math.random() * Math.pow(10, digits)).toString();
        text = text.replace(randomVariableRegex, randomNumber);
        setState(foundRandomVar.groups['var'] || "random",  randomNumber);
    }

    const stateVariableRegex = /<var:(\w+) >/;
    const stateVariable = text.match(stateVariableRegex);

    if (stateVariable) {
        text = text.replace(stateVariableRegex, STATE[stateVariable[1]]);
    }

    getNormalized([parent, input]).type(text);
}

const replace = (input, parent, contains, text) => {
    getNormalized([parent, input], { text: contains })
        .clear()
        .type(text);
}

const wait = (secs = 1) => {
    cy.wait(secs * 1000);
}

const waitForResults = _ => wait(1);

// Experimental, not nailed down yet
const dragAbove = (el1, el1Parent, el1Contains, el2, el2Parent, el2Contains) => {
    const $el1 =  getNormalized([el1Parent, el1], { text: el1Contains });
    $el1.trigger('mousedown', { which: 1, force: true });
    
    let el2X = 0;
    let el2Y = 0;
    
    getNormalized([el2Parent, el2], { text: el2Contains }).then($el => {
        const { x, y } = $el[0].getBoundingClientRect();
        el2X = x;
        el2Y = y;
        
        return getNormalized('Ranking Form');
    }).then($el => {
        const { x: containerX, y: containerY } = $el[0].getBoundingClientRect();
        
        const newPosOpts = {
            x: 400,
            y: 100,
            force: true
        };
        
        $el
        .trigger('mousemove', newPosOpts)
        .trigger('mouseup', newPosOpts);
    });
}

// threshold for entire image
const snapshotOptions = {
    failureThreshold: 0.10,
    failureThresholdType: 'percent',
}



const open = pageName => {
    const url = PAGES[pageName];

    if(!url) throw Error(`Page '${pageName}' has no specified URL`);

    cy.visit(url);
}

const onPage = pageName => {
    cy.url().should('contain', PAGES[pageName]);
}

const redirectedTo = onPage;

const nElements = (number, el, parent, text) => {
    getNormalized([parent, el], { singular: true, text })
        .should('have.length', number);
};

const elExists = (el, parent, { text } = {}) => (
    getNormalized([parent, el], { text }).first().should('exist')
);

const elHasValue = (el, parent, contains, text) => (
    getNormalized([parent, el]).should('have.value', text)
);

const textOnEl = (text, el, parent) => elExists(el, parent, { text });

const elDoesNotExist =  (el, parent, text) => {
    getNormalized([parent, el], { text, singular: true })
        .should('have.length', 0);
}

const elBackground = (background, el, parent) => {
    getNormalized([parent, el]).should('have.css', 'background-color', hex2rgbCSS(background))
};

const elBorder = (background, el, parent) => {
    getNormalized([parent, el]).should('have.css', 'border-color', hex2rgbCSS(background))
}

module.exports = {
    getNormalized,
    scroll,
    click,
    type,
    replace,
    open,
    wait,
    waitForResults,
    dragAbove,
    onPage,
    redirectedTo,
    nElements,
    textOnEl,
    elExists,
    elHasValue,
    elDoesNotExist,
    elBackground,
    elBorder,
};
