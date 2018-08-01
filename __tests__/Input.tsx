import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Input from '../src/Input';

describe('Input', () => {
  it('should render an <Input />', () => {
    const handleKeyDown = jest.fn();
    const handleChange = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const tree = renderer
      .create(
        <Input
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an <Input /> with a placeholder', () => {
    const handleKeyDown = jest.fn();
    const handleChange = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const tree = renderer
      .create(
        <Input
          placeholder="this is a test"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an <Input /> with a specified size', () => {
    const handleKeyDown = jest.fn();
    const handleChange = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const tree = renderer
      .create(
        <Input
          style={{ width: 200, height: 150 }}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
