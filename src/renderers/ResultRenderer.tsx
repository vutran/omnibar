import * as React from 'react';
import { ResultItem } from '../../typings';
import { COLORS } from '../constants';

interface Props {
    // the item
    item: ResultItem;
    // optional style override
    style?: React.CSSProperties;
}

const ITEM_STYLE: React.CSSProperties = {
    height: 50,
    lineHeight: '50px',
    fontSize: 24,
    borderStyle: 'solid',
    borderColor: COLORS.GRAY,
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
};

const ANCHOR_STYLE: React.CSSProperties = {
    display: 'block',
    textDecoration: 'none',
    color: COLORS.BLACK,
    paddingLeft: 15,
    paddingRight: 15,
};

export default function ResultRenderer(props: Props) {
    const style = { ...ITEM_STYLE, ...props.style };

    return (
        <li style={style}>
            <a href={props.item.url} style={ANCHOR_STYLE}>{props.item.title}</a>
        </li>
    );
}
