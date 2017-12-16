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

export default function AnchorRenderer<T>(props: Props<T>) {
  return (
    <a href={props.item.url} style={ANCHOR_STYLE}>
      {props.item.title}
    </a>
  );
}
