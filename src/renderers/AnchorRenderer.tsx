import * as React from 'react';
import { ResultItem } from '../../typings';
import { COLORS } from '../constants';

interface Props {
    // the item
    item: ResultItem;
}

const ANCHOR_STYLE: React.CSSProperties = {
    display: 'block',
    textDecoration: 'none',
    color: COLORS.BLACK,
    paddingLeft: 15,
    paddingRight: 15,
};

export default function AnchorRenderer(props: Props) {
    return (
        <a href={props.item.url} style={ANCHOR_STYLE}>{props.item.title}</a>
    );
}
