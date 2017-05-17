import * as React from 'react';
import ResultsItem from './ResultsItem';
import { COLORS } from './constants';

interface Props<T> {
    // the currently selected index
    selectedIndex: number;
    // list of result items
    items: Array<T>;
    // max container height
    maxHeight?: React.CSSLength;
    // item row height
    rowHeight?: React.CSSLength;
    // optional override container style
    style?: React.CSSProperties;
    // optional row override style
    rowStyle?: React.CSSProperties;
    // optional result renderering function
    resultRenderer?: <T>(item: T) => React.ReactChild;
}

interface State { }

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

    return (
        <ul style={style}>
            {props.items.map((item, key) =>
                React.createElement(
                    ResultsItem,
                    {
                        key,
                        highlighted: props.selectedIndex === key,
                        item,
                        style: props.rowStyle,
                        resultRenderer: props.resultRenderer,
                    },
                )
            )}
        </ul>
    );
}
