import * as React from 'react';
import { AnchorItem } from './';
import { COLORS } from '../../constants';

interface Props<T> {
  // the item
  item: AnchorItem & T;
}

const ANCHOR_STYLE: React.CSSProperties = {
  display: 'block',
  textDecoration: 'none',
  color: COLORS.BLACK,
  paddingLeft: 15,
  paddingRight: 15,
};

export default function AnchorRenderer<T>(
  props: Props<T> & React.HTMLAttributes<HTMLAnchorElement>
) {
  const { item, style, ...rest } = props;
  const mergedStyle = { ...ANCHOR_STYLE, ...style };

  return (
    <a href={item.url} style={mergedStyle} {...rest}>
      {item.title}
    </a>
  );
}
