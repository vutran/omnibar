import * as React from 'react';
import Input from '../src/Input';
import renderer from 'react-test-renderer';

describe('Input', () => {
    it('should render an <Input />', () => {
        const handleKeyDown = jest.fn();
        const handleChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        const tree = renderer.create(
            <Input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render an <Input /> with a placeholder', () => {
        const handleKeyDown = jest.fn();
        const handleChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        const tree = renderer.create(
            <Input
                placeholder="this is a test"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render an <Input /> with a specified size', () => {
        const handleKeyDown = jest.fn();
        const handleChange = jest.fn();
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        const tree = renderer.create(
            <Input
                width={200}
                height={150}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

