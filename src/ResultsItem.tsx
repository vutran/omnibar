import * as React from 'react';
import { AnchorItem } from './modifiers/anchor';
import AnchorRenderer from './modifiers/anchor/AnchorRenderer';

interface Props<T> {
  // results renderer function
  children: Omnibar.ResultRenderer<T>;
  // the item
  item: T;
  // onMouseEnter item callback
  onMouseEnter?: (e: any /* Event */) => void;
  // onMouseLeave item callback
  onMouseLeave?: (e: any /* Event */) => void;
  // onClick callback
  onClickItem?: (e: any /* Event */) => void;
  // set to true if the item is currently selected
  isSelected?: boolean;
  // optional style override
  style?: React.CSSProperties;
}

interface State {
  // set to true to highlight
  isHighlighted: boolean;
}

export default class ResultRenderer<T> extends React.PureComponent<
  Props<T>,
  State
> {
  static defaultProps = {
    isSelected: false,
  };

  state: State = {
    isHighlighted: false,
  };

  handleMouseEnter = (evt: any /* Event */) => {
    this.setState({ isHighlighted: true });
    this.props.onMouseEnter && this.props.onMouseEnter(evt);
  };

  handleMouseLeave = (evt: any /* Event */) => {
    this.setState({ isHighlighted: false });
    this.props.onMouseLeave && this.props.onMouseLeave(evt);
  };

  render() {
    const item = this.props.item;

    const renderer = this.props.children
      ? this.props.children
      : (AnchorRenderer as Omnibar.ResultRenderer<T>);

    return renderer({
      style: this.props.style,
      item,
      isSelected: this.props.isSelected,
      isHighlighted: this.state.isHighlighted,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: this.props.onClickItem,
    });
  }
}
