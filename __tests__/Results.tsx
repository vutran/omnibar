import * as React from 'react';
import Results from '../src/Results';
import ResultsItem from '../src/ResultsItem';
import renderer from 'react-test-renderer';

describe('Results', () => {
  const items = [
    { title: 'Google', url: 'https://google.com' },
    { title: 'Dropbox', url: 'https://dropbox.com' },
  ];

  it('should render a <Results />', () => {
    const tree = renderer
      .create(
        React.createElement(Results, {
          items,
          selectedIndex: -1,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <Results /> with a selected item', () => {
    const tree = renderer
      .create(
        React.createElement(Results, {
          items,
          selectedIndex: 0,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <Results /> with a max height', () => {
    const tree = renderer
      .create(
        React.createElement(Results, {
          items,
          selectedIndex: -1,
          maxHeight: 200,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <Results /> with a row height', () => {
    const tree = renderer
      .create(
        React.createElement(Results, {
          items,
          selectedIndex: -1,
          maxHeight: 200,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a <Results /> with a custom row renderer', () => {
    const rowRenderer = ({ item }: { item: any }) => (
      <div>Title: {item.title}</div>
    );
    const tree = renderer
      .create(
        React.createElement(Results, {
          children: rowRenderer,
          items,
          selectedIndex: -1,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
