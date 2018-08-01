import * as React from 'react';
import Input from './Input';
import Results from './Results';
import search from './search';
import { KEYS, BLUR_DELAY, DEFAULT_HEIGHT } from './constants';
import AnchorAction from './modifiers/anchor/AnchorAction';
import { debounce } from './utils';

export default class Omnibar<T> extends React.PureComponent<
  Omnibar.Props<T>,
  Omnibar.State<T>
> {
  // TODO - fix generic container
  static defaultProps: Omnibar.Props<any> = {
    children: null,
    extensions: [],
    inputDelay: 100,
    maxResults: null,
    maxViewableResults: null,
    render: null, // alias of children
    resultStyle: {},
    rootStyle: { position: 'relative' },
  };

  state: Omnibar.State<T> = {
    displayResults: false,
    hoveredIndex: -1,
    results: [],
    selectedIndex: 0,
  };

  constructor(props: Omnibar.Props<T>) {
    super(props);
    this.query = debounce(this.query, this.props.inputDelay);
  }

  query = (value: string) => {
    if (this.props.extensions.length > 0) {
      search<T>(value, this.props.extensions).then(results => {
        this.setState({
          results:
            this.props.maxResults > 0
              ? results.slice(0, this.props.maxResults)
              : results,
          displayResults: results.length > 0,
        });
        this.props.onQuery && this.props.onQuery(results);
      });
    }
  };

  reset() {
    this.setState({
      results: [],
      displayResults: false,
    });
  }

  prev = () => {
    this.setState((prevState: Omnibar.State<T>) => {
      const selectedIndex = prevState.selectedIndex - 1;
      if (selectedIndex >= 0) {
        return { selectedIndex };
      }
    });
  };

  next = () => {
    this.setState((prevState: Omnibar.State<T>) => {
      const selectedIndex = prevState.selectedIndex + 1;
      if (selectedIndex < prevState.results.length) {
        return { selectedIndex };
      }
    });
  };

  action = () => {
    // uses the hovered index if the user is currently
    // mousing over an item, falls back on the
    // selected index
    const idx =
      this.state.hoveredIndex > -1
        ? this.state.hoveredIndex
        : this.state.selectedIndex;
    const item = this.state.results[idx];
    const action = this.props.onAction || AnchorAction;
    action.call(null, item);
  };

  handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (value) {
      this.query(value);
    } else {
      this.reset();
    }
  };

  handleKeyDown = (evt: any /* Event */) => {
    switch (evt.keyCode) {
      case KEYS.UP:
        this.prev();
        break;
      case KEYS.DOWN:
        this.next();
        break;
      case KEYS.ENTER:
        this.action();
        break;
    }
  };

  handleMouseEnterItem = (hoveredIndex: number) => {
    this.setState({ hoveredIndex });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: -1 });
  };

  handleBlur = () => {
    setTimeout(() => this.setState({ displayResults: false }), BLUR_DELAY);
  };

  handleFocus = () => {
    this.setState({ displayResults: true });
  };

  handleClickItem = (e: any) => {
    e.preventDefault();
    if (this.state.hoveredIndex > -1) {
      this.action();
    }
  };

  render() {
    let {
      children,
      render,
      maxResults,
      maxViewableResults,
      extensions,
      inputDelay,
      rootStyle,
      resultStyle,
      onQuery,
      onAction,
      ...rest
    } = this.props;

    let maxHeight = maxViewableResults
      ? maxViewableResults * DEFAULT_HEIGHT
      : null;

    if (!render) {
      render = children;
    }

    return (
      <div style={rootStyle}>
        <Input
          {...rest}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        {this.state.displayResults && (
          <Results
            children={render}
            items={this.state.results}
            maxHeight={maxHeight}
            onClickItem={this.handleClickItem}
            onMouseEnterItem={this.handleMouseEnterItem}
            onMouseLeave={this.handleMouseLeave}
            selectedIndex={this.state.selectedIndex}
            style={resultStyle}
          />
        )}
      </div>
    );
  }
}
