import { command } from '../src/decorators';

describe('decorators', () => {
    describe('command', () => {
        // build the regular extension
        const ext = (query: string) => ([
            { title: 'Google', url: 'https://google.com' },
        ]);
        // enhance the extension with our custom command prefix "foo"
        const enhancedExt = command(ext, 'foo');

        it('should return something', () => {
            expect(ext('google'))
                .toContainEqual({ title: 'Google', url: 'https://google.com' });
            expect(enhancedExt('foo google'))
                .toContainEqual({ title: 'Google', url: 'https://google.com' });
        });

        it('should not return anything', () => {
            expect(enhancedExt('google'))
                .not.toContainEqual({ title: 'Google', url: 'https://google.com' });
            expect(enhancedExt('google'))
                .toEqual([]);
            expect(enhancedExt('foofoo'))
                .toEqual([]);
            expect(enhancedExt('foogoogle'))
                .toEqual([]);
        });
    });
});
