import * as React from 'react';
import { ResultItem } from '../typings';
import ResultRenderer from './renderers/ResultRenderer';

interface Props {
    // list of result items
    items: Array<ResultItem>;
    // item row height
    rowHeight?: React.CSSLength;
    // optional override container style
    style?: React.CSSProperties;
    // optional row override style
    rowStyle?: React.CSSProperties;
}

interface State {}

const LIST_STYLE: React.CSSProperties = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
};

export default class Results extends React.Component<Props, State> {
    render() {
        const style = { ...LIST_STYLE, ...this.props.style };

        if (this.props.rowHeight) {
            style.height = this.props.rowHeight;
        }

        return (
            <ul style={LIST_STYLE}>
                {this.props.items.map((item, key) => <ResultRenderer key={key} item={item} style={this.props.rowStyle} />)}
            </ul>
        );
    }
}
