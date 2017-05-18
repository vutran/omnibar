import { flatten, debounce } from '../src/utils';

describe('utils', () => {
    describe('flatten', () => {
        it('should do nothing to empty lists', () => {
            expect(flatten([]))
                .toEqual([]);
        });
        it('should flatten a list of lists', () => {
            expect(flatten([
                [1, 2],
                [2, 3],
                [3, 4],
            ]))
                .toEqual([1, 2, 2, 3, 3, 4]);
        });
    });

    describe('debounce', () => {
        jest.useFakeTimers(); // uses fake timers
        const fn = jest.fn();
        const debouncedFn = debounce(fn, 1);
        it('should not yet call the mocked function', () => {
            debouncedFn(); // not yet called since we're using fake timers
            expect(fn).not.toBeCalled();
        });

        it('should call the mocked function', () => {
            jest.runAllTimers(); // tick-tock
            expect(fn).toBeCalled();
        });
    });
});
