import { ELEMENT_SELECTORS, STATE, setPages } from '../common/variables';
import {
    hex2rgbCSS,
    buildClassSelector,
    parseNumberEls,
    getSelector
} from '../common/functions';

jest.mock('../common/variables');

describe('functions', () => {

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


    });

    describe('hex2rbgCSS', () => {
        it('converts a color with no alpha', () => {
            expect(hex2rgbCSS('F2F2F2')).toEqual('rgb(242, 242, 242)');
        });

        it('converts a color with an alpha', () => {
            expect(hex2rgbCSS('F2F2F280')).toEqual('rgb(242, 242, 242, 0.5)');
        })
	});

    describe('buildClassSelector', () => {
        it('Converts a class to an attribute', () => {
            expect(buildClassSelector('.test-class')).toEqual('[class*="test-class"]')
        });
        
        it('Attaches :modifiers to the end', () => {
            expect(buildClassSelector('.test-class:hover')).toEqual('[class*="test-class"]:hover')
        });

        it('Handles Child Classes', () => {
            expect(buildClassSelector('.test-class .class-2')).toEqual('[class*="test-class"] [class*="class-2"]')
        });

        it('Handles Multiple Classes', () => {
            expect(buildClassSelector('.test-class.class-2')).toEqual('[class*="test-class"][class*="class-2"]')
        });

        it('Handles :contains()', () => {
            expect(buildClassSelector('.test-class:contains("Good Stuff")')).toEqual('[class*="test-class"]:contains("Good Stuff")')
        });

        it('Handles weird Combos of Classes', () => {
            expect(buildClassSelector('.test-class.class-2:active .class3:hover > .class4'))
                .toEqual('[class*="test-class"][class*="class-2"]:active [class*="class3"]:hover > [class*="class4"]')
        });
	});

    describe('parseNumberEls', () => {
        it('handles numbered elements', () => {
            expect(parseNumberEls('third Button')).toEqual({
                ordinal: 3,
                el: 'Button'
            });

            expect(parseNumberEls('fifty-sixth Button')).toEqual({
                ordinal: 56,
                el: 'Button'
            });
        });

        it('handles last element', () => {
            expect(parseNumberEls('last Button')).toEqual({
                ordinal: 'last',
                el: 'Button'
            });
        });

        it('handles elements without a number', () => {
            expect(parseNumberEls('Button')).toEqual({
                el: 'Button'
            });
        });
	});

    describe('getSelector', () => {
        it('accepts just the element', () => {
            expect(getSelector('Button')).toBe('[class*="button"]');
        });

        it('an element and its parent', () => {
            expect(
                getSelector(['Modal', 'Button'])
            ).toBe('[class*="modal"] [class*="modal-button"]');
        });

        it('filters out undefined elements', () => {
            expect(getSelector([null,'Button'])).toBe('[class*="button"]');
        });

        it('Gets rid of \'s', () => {
            expect(getSelector(['Button\'s']))
                .toBe('[class*="button"]');
        })

        it('Makes an element singular if the singular option is passed in' , () => {
            expect(getSelector(['Buttons'], { singular: true }))
                .toBe('[class*="button"]')
        });

        it('parses out ordinals', () => {
            expect(getSelector(['third Button'])).toBe('[class*="button"]');
            expect(getSelector(['last Button'])).toBe('[class*="button"]');
        });

        it('throws an error if the selector is not defined', () => {
            expect(() =>{
                getSelector(['Link']);
            }).toThrow('The className was not defined for Link')

            expect(() =>{
                getSelector(['Modal', 'Link']);
            }).toThrow('The className was not defined for Modal>Link')


            expect(() =>{
                getSelector(['Header', 'Link']);
            }).toThrow('The className was not defined for Header')
        });

        it('selects the correct element if text is passed', () => {
            expect(getSelector('Button', { text: 'Hi There' }))
                .toBe('[class*="button"]:contains("Hi There")')
        });
    });


})