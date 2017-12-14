import * as React from 'react';
import { COLORS } from './constants';
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
  // set to true to highlight the given item
  highlighted?: boolean;
  // optional style override
  style?: React.CSSProperties;
}

interface State {
  // set to true to highlight
  hover: boolean;
}

const ITEM_STYLE: React.CSSProperties = {
  height: 50,
  lineHeight: '50px',
  fontSize: 24,
  borderStyle: 'solid',
  borderColor: COLORS.DARKGRAY,
  borderTopWidth: 0,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  boxSizing: 'border-box',
};

const ITEM_HOVER_STYLE: React.CSSProperties = {
  backgroundColor: COLORS.GRAY,
};

export default class ResultRenderer<T> extends React.PureComponent<
  Props<T>,
  State
> {
  static defaultProps = {
    highlighted: false,
  };

  state: State = {
    hover: false,
  };

  handleMouseEnter = (evt: any /* Event */) => {
    this.setState({ hover: true });
    this.props.onMouseEnter && this.props.onMouseEnter(evt);
  };

  handleMouseLeave = (evt: any /* Event */) => {
    this.setState({ hover: false });
    this.props.onMouseLeave && this.props.onMouseLeave(evt);
  };

  render() {
    const item = this.props.item;
    let style = { ...ITEM_STYLE, ...this.props.style };

    if (this.props.highlighted || this.state.hover) {
      style = { ...style, ...ITEM_HOVER_STYLE };
    }

    const renderer = this.props.children
      ? this.props.children
      : AnchorRenderer as Omnibar.ResultRenderer<T>;

    return (
      <li
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.props.onClickItem}
      >
        {renderer({ item })}
      </li>
    );
  }
}
