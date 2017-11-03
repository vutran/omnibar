import search from '../src/search';

describe('search', () => {
  const a = jest.fn(() => [{ title: 'John' }, { title: 'Jane' }]);
  const b = jest.fn(() => []);
  const c = jest.fn(() =>
    Promise.resolve([{ title: 'Jim' }, { title: 'Joe' }])
  );
  const extensions = [a, b, c];
  const results = search('foo', extensions);

  it('should call all extensions', () => {
    expect(a).toBeCalled();
    expect(b).toBeCalled();
    expect(c).toBeCalled();
  });

  it('should resolve a list of items', () => {
    expect(results).resolves.toContainEqual({ title: 'John' });
    expect(results).resolves.toContainEqual({ title: 'Jane' });
    expect(results).resolves.toContainEqual({ title: 'Jim' });
    expect(results).resolves.toContainEqual({ title: 'Joe' });
  });

  it('should not contain Xavier', () => {
    expect(results).resolves.not.toContainEqual({ title: 'Xavier' });
  });
});
