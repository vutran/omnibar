import * as React from 'react';
import { AnchorItem } from './';
import { COLORS, DEFAULT_HEIGHT } from '../../constants';

interface Props<T> {
  // the item
  item: AnchorItem & T;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

const ITEM_STYLE: React.CSSProperties = {
  borderBottomWidth: 1,
  borderColor: COLORS.DARKGRAY,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderStyle: 'solid',
  borderTopWidth: 0,
  boxSizing: 'border-box',
  color: COLORS.BLACK,
  display: 'block',
  fontSize: 24,
  height: DEFAULT_HEIGHT,
  lineHeight: `${DEFAULT_HEIGHT}px`,
  paddingLeft: 15,
  paddingRight: 15,
  textDecoration: 'none',
};

const ITEM_HOVER_STYLE: React.CSSProperties = {
  backgroundColor: COLORS.GRAY,
};

export default function AnchorRenderer<T>(
  props: Props<T> & React.HTMLAttributes<HTMLAnchorElement>
) {
  const { item, isSelected, isHighlighted, style, ...rest } = props;

  const mergedStyle = { ...ITEM_STYLE, ...style };

  if (isSelected) {
    mergedStyle.backgroundColor = COLORS.GRAY;
  }

  if (isHighlighted) {
    mergedStyle.backgroundColor = COLORS.DARKGRAY;
  }

  return (
    <a href={item.url} style={mergedStyle} {...rest}>
      {item.title}
    </a>
  );
}
