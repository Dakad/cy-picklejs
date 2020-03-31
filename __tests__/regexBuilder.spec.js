import {
    re,
    or,
    string,
    number,
    elInEl,
    page,
} from '../common/regexBuilder';

describe('RegexBuilder', () => {
    describe('re', () => {
        it('creates a regex that matches from start to finish', () => {
            const hello = re('hello');
            expect('hello'.match(hello)[0]).toBe('hello');
        })

        it('won\'t match if there is extra characters at the start or end', () => {
            const hello = re('hello');
            expect('1hello1'.match(hello)).toBeFalsy();
        })
    });

    describe('or', () => {
        it('matches against a required list', () => {
            const list = or(['toli', 'randy', 'axel'], { required: true });

            expect('I am toli'.match(list)[0]).toBe('toli')
        });

        it('doesn\'t match against a required list if the subject is not present', () => {
            const list = or(['toli', 'randy', 'axel'], { required: true });
        
            expect('I am Groot'.match(list)).toBeNull()
        });

        it('matches if the list is not required', () => {
            const list = or(['toli', 'randy', 'axel']);
        
            expect('I am Groot'.match(list)[0]).toBe('')
        });

        it('captures the item if capturing is enabled', () => {
            const list = or(['toli', 'randy', 'axel'], { capture: true, required: true });
        
            expect('I am toli'.match(list)[1]).toBe('toli')
        });
    });

    describe('string', () => {
        it('matches a string in quotes', () => {
            expect('I am "Groot"'.match(string)[1]).toBe('Groot');
        });

        it('does not match a string without quotes', () => {
            expect('I am Groot'.match(string)).toBeNull();
        });
    });

    describe('number', () => {
        it('matches an number', () => {
            expect('I am #1'.match(number)[1]).toBe('1');
        });

        it('matches a number', () => {
            expect('I m running for 15 minutes'.match(number)[1]).toBe("15");
        });

        it('matches a string with quotes', () => {
            expect('I have "7" books'.match(number)[1]).toBe("7")
        });

        it('does not match a string without quotes', () => {
            expect('I am # one'.match(number)).toBeNull();
        });
    });

    describe('elInEl', () => {
        it('matches basic element', () => {
            expect('I should see an "Element"'.match(elInEl)[1]).toBe('Element');
        });

        it('matches element with no space in the front', () => {
            expect('"Username" should be red'.match(elInEl)[1]).toBe('Username');
        });

        it('matches an element with a parent', () => {
            const m = 'I should see a "Button" in the "Modal"'.match(elInEl);
            expect(m[1]).toBe('Button');
            expect(m[2]).toBe('Modal');
        });

        it('matches an element with text', () => {
            const m = 'I should see a "Button" in the "Modal" containing "Submit"'.match(elInEl);
            expect(m[1]).toBe('Button');
            expect(m[2]).toBe('Modal');
            expect(m[3]).toBe('Submit');
        });


        it('works with other verbs', () => {
            const m = 'I should see a "Button" on the "Modal" containing "Submit"'.match(elInEl);
            expect(m[1]).toBe('Button');
            expect(m[2]).toBe('Modal');
            expect(m[3]).toBe('Submit');
        });
    });

    describe('page', () => {
        it('should match a page', () => {
            const m = 'I should be on "Home"'.match(page);
            expect(m[1]).toBe('Home');
        });

        it('should match with a page suffix', () => {
            const m = 'I should be on "Home" Page'.match(page);
            expect(m[1]).toBe('Home');
        });

        it('should match a page with the in front', () => {
            const m = 'I should be on the "Home" Page'.match(page);
            expect(m[1]).toBe('Home');
        });
    });
})