import * as React from 'react';
import { ResultItem } from '../typings';
import ResultsItem from './ResultsItem';
import { COLORS } from './constants';

interface Props {
    // the currently selected index
    selectedIndex: number;
    // list of result items
    items: Array<ResultItem>;
    // item row height
    rowHeight?: React.CSSLength;
    // optional override container style
    style?: React.CSSProperties;
    // optional row override style
    rowStyle?: React.CSSProperties;
    // optional result renderering function
    resultRenderer?: <T>(item: T) => React.ReactChild;
}

interface State {}

const LIST_STYLE: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    backgroundColor: COLORS.WHITE,
};

export default class Results extends React.Component<Props, State> {
    static defaultProps: Props = {
        selectedIndex: -1,
        items: [],
    }

    render() {
        const style = { ...LIST_STYLE, ...this.props.style };

        if (this.props.rowHeight) {
            style.height = this.props.rowHeight;
        }

        return (
            <ul style={style}>
                {this.props.items.map((item, key) =>
                    <ResultsItem
                        key={key}
                        highlighted={this.props.selectedIndex === key}
                        item={item}
                        style={this.props.rowStyle}
                        resultRenderer={this.props.resultRenderer} />
                )}
            </ul>
        );
    }
}
