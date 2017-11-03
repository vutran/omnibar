import * as React from 'react';
import ResultsItem from '../src/ResultsItem';
import renderer from 'react-test-renderer';

describe('ResultsItem', () => {
  it('should render a <ResultsItem />', () => {
    const item = { title: 'Google', url: 'https://google.com' };
    const tree = renderer
      .create(React.createElement(ResultsItem, { item }))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a highlighted <ResultsItem />', () => {
    const item = { title: 'Google', url: 'https://google.com' };
    const tree = renderer
      .create(React.createElement(ResultsItem, { item, highlighted: true }))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
