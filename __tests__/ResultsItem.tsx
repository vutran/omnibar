import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ResultsItem from '../src/ResultsItem';

describe('ResultsItem', () => {
  it('should render a <ResultsItem />', () => {
    const item = { title: 'Google', url: 'https://google.com' };
    const tree = renderer
      .create(React.createElement(ResultsItem, { item, children: null }))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a highlighted <ResultsItem />', () => {
    const item = { title: 'Google', url: 'https://google.com' };
    const tree = renderer
      .create(
        React.createElement(ResultsItem, {
          item,
          isSelected: true,
          children: null,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
