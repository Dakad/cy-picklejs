import { ELEMENT_SELECTORS, STATE, setPages } from '../common/variables';
import {
    getNormalized,

    scroll,
    click,
    type,
    replace,
    open,
    waitForResults,
    onPage,
    redirectedTo,
    nElements,
    textOnEl,
    elExists,
    elDoesNotExist,
    elBackground,
    elBorder,
} from '../cypress/cypressFunctions';

jest.mock('../common/variables');

describe('functions', () => {
    let get;
    let last;
    let eq;
    let first;
    let should;
    let window;
    let then;
    let scrollTo;
    let clickFn;
    let typeFn;
    let clearFn;
    let visitFn;
    let wait;
    let matchImageSnapshot;
    let url;

    beforeEach(() => {
        ELEMENT_SELECTORS['Button'] = '.button';
        ELEMENT_SELECTORS['Input'] = '.input';
        ELEMENT_SELECTORS['Modal'] = {
            "_default": '.modal',
            "Button": '.modal-button',
        };

        setPages({
            'Home': '/home',
            'Login': '/login',
            'Signup': '/sign_in',
            'Sign up': '/sign_in'
        });

        last = jest.fn();
        eq = jest.fn();
        should = jest.fn();
        clickFn = jest.fn();
        first = jest.fn().mockReturnValue({
            should,
            click: clickFn
        });


        then = jest.fn();
        scrollTo = jest.fn();

        typeFn = jest.fn();

        clearFn = jest.fn().mockReturnValue({
            type: typeFn
        });

        visitFn = jest.fn();

        wait = jest.fn();

        matchImageSnapshot = jest.fn();

        url = jest.fn().mockReturnValue({
            should
        })

        window = jest.fn().mockReturnValue({
            then: then
                .mockImplementation((func) => {
                    func({ scrollTo });

                    return {
                        then: (func) => {
                            func([{ scrollHeight: 1000 }] )
                        }
                    }
                })
        })

        get = jest.fn().mockReturnValue({
            last,
            eq,
            first,
            type: typeFn,
            click: clickFn,
            clear: clearFn,
            matchImageSnapshot,
            should,
        })

        global.cy = {
            get,
            window,
            click: clickFn,

            visit: visitFn,
            wait,
            matchImageSnapshot,
            url: url,
        };
    });

    describe('getNormalized', () => {
        it('accepts just the element', () => {
            getNormalized('Button');

            expect(get).toBeCalledWith('[class*="button"]')
        });

        it('accepts an element and its parent', () => {
            getNormalized(['Modal', 'Button']);

            expect(get).toBeCalledWith('[class*="modal"] [class*="modal-button"]')
        });

        it('filters out undefined elements', () => {
            getNormalized([null,'Button']);

            expect(get).toBeCalledWith('[class*="button"]')
        });

        it('Gets rid of \'s', () => {
            getNormalized(['Button\'s']);

            expect(get).toBeCalledWith('[class*="button"]');
        })

        it('Makes an element sigular if the singular option is passed in' , () => {
            getNormalized(['Buttons'], { singular: true });

            expect(get).toBeCalledWith('[class*="button"]')
        });

        it('parses out ordinals', () => {
            getNormalized(['third Button']);
            getNormalized(['last Button']);

            expect(get).toBeCalledWith('[class*="button"]')
            expect(eq).toBeCalledWith(2)
            expect(last).toBeCalled()
        });

        it('selects the correct element if text is passed', () => {
            getNormalized('Button', { text: 'Hi There' });

            expect(get).toBeCalledWith('[class*="button"]:contains("Hi There")')
        });

        it('throws an error if the selector is not defined', () => {
            expect(() =>{
                getNormalized(['Link']);
            }).toThrow('The className was not defined for Link')

            expect(() =>{
                getNormalized(['Modal', 'Link']);
            }).toThrow('The className was not defined for Modal>Link')


            expect(() =>{
                getNormalized(['Header', 'Link']);
            }).toThrow('The className was not defined for Header')
        });
	});
    
    test.skip('elExists', () => {
        elExists('Button');
        
        expect(get).toBeCalledWith('[class*="button"]')
        expect(first).toBeCalled();
        expect(should).toBeCalledWith('exist');
	});

    // gotta figure out how to test this...
    describe.skip('scroll', () => {
        it('scrolls to the top', () => {
            scroll('top');
            
            expect(window).toHaveBeenCalled();
            expect(get).toHaveBeenCalledWith('body');
            expect(scrollTo).toHaveBeenCalledWith(0, 0);
        });

        it('scrolls to the bottom', () => {
            scroll('bottom');
            
            expect(window).toHaveBeenCalled();
            expect(get).toHaveBeenCalledWith('body');
            expect(scrollTo).toHaveBeenCalledWith(0, 1100);
        });
    });

    test.skip('click', () => {
        click('Button', 'Modal', { text: 'Hello' });

        expect(clickFn).toBeCalled();
	});

    describe.skip('type', () => {
        it('works with text', () => {
            type('hello', 'Input');
            expect(typeFn).toBeCalledWith('hello');
        })
        it('works with a random variable', () => {
            type('user<rand:userId>', 'Input');

            // not sure how to match random
            expect(typeFn).toBeCalledWith(
                expect.stringMatching(/user\d+/)
            );
        })

        it('generates a random variable, saves it and then allows it to be used`', () => {
            type('user<rand:userId>', 'Input');

            expect(STATE.userId).toEqual(
                expect.stringMatching(/\d+/)
            );

            type('user<var:userId>', 'Input');

            expect(typeFn).toHaveBeenCalledWith(
                'user' + STATE.userId
            );
        })
	});

    test.skip('replace', () => {
        replace('Input', '', '', 'hello');

        expect(clearFn).toHaveBeenCalled();
        expect(typeFn).toBeCalledWith('hello')
	});

    test.skip('open', () => {
        open('Home');

        expect(visitFn).toBeCalledWith('/home');

	});

    test.skip('waitForResults', () => {
        waitForResults();

        expect(wait).toBeCalledWith(1000)
	});

    // Experimental, not nailed down yet
    describe.skip('dragAbove', () => {

	});

    test.skip('onPage', () => {
        onPage('Home');

        expect(should).toBeCalledWith(
            'contain',
            '/home'
        );
	});

    test.skip('redirectedTo', () => {
        redirectedTo('Home');

        expect(should).toBeCalledWith(
            'contain',
            '/home'
        );
	});

    test.skip('nElements', () => {
        nElements(3, 'Input')
        expect(should).toHaveBeenCalledWith(
            'have.length',
            3
        );
    });
    
    test.skip('elExists', () => {
        elExists('Input');

        expect(should).toHaveBeenCalledWith('exist')
	});

    test.skip('textOnEl', () => {
        textOnEl('Text', 'Button', 'Modal');

        expect(should).toHaveBeenCalledWith('exist')

	});

    test.skip('elDoesNotExist', () => {
        elDoesNotExist('Input');

        expect(should).toHaveBeenCalledWith(
            'have.length',
            0
        )
	});

    test.skip('elBackground', () => {
        elBackground('#ffffff', 'Input');

        expect(should).toHaveBeenLastCalledWith(
            'have.css',
            'background-color',
            'rgb(255, 255, 255)'
        );
	});

    test.skip('elBorder', () => {
        elBorder('#ffffff', 'Input');

        expect(should).toHaveBeenLastCalledWith(
            'have.css',
            'border-color',
            'rgb(255, 255, 255)'
        );
	});
})