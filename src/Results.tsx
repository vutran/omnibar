import * as React from 'react';
import ResultsItem from './ResultsItem';
import { COLORS } from './constants';

interface Props<T> {
  // results renderer function
  children?: Omnibar.ResultRenderer<T>;
  // the currently selected index
  selectedIndex: number;
  // list of result items
  items: Array<T>;
  // onMouseEnter callback
  onMouseEnter?: (e: any /* Event */) => void;
  // onMouseLeave callback
  onMouseLeave?: (e: any /* Event */) => void;
  // onMouseEnter item callback
  onMouseEnterItem?: (e: any /* Event */) => void;
  // onMouseLeave item callback
  onMouseLeaveItem?: (e: any /* Event */) => void;
  // onClick callback
  onClickItem?: (e: any /* Event */) => void;
  // max container height
  maxHeight?: React.CSSLength;
  // item row height
  rowHeight?: React.CSSLength;
  // optional override container style
  style?: React.CSSProperties;
  // optional row override style
  rowStyle?: React.CSSProperties;
}

const LIST_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  zIndex: 2,
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  backgroundColor: COLORS.WHITE,
};

export default function Results<T>(props: Props<T>) {
  const style = { ...LIST_STYLE, ...props.style };

  if (props.maxHeight) {
    style.maxHeight = props.maxHeight;
    style.borderBottomWidth = 1;
    style.borderBottomColor = COLORS.GRAY;
    style.borderBottomStyle = 'solid';
    style.overflow = 'auto';
  }

  function createHandler(handler: any, key: number) {
    return handler.bind(this, key);
  }

  return (
    <ul
      style={style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.items.map((item, key) =>
        React.createElement(ResultsItem, {
          key,
          children: props.children,
          highlighted: props.selectedIndex === key,
          item,
          style: props.rowStyle,
          onMouseEnter:
            props.onMouseEnterItem &&
            createHandler(props.onMouseEnterItem, key),
          onClickItem: props.onClickItem,
        })
      )}
    </ul>
  );
}
