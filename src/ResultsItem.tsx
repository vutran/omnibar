import * as React from 'react';
import { COLORS } from './constants';
import AnchorRenderer from './modifiers/anchor/AnchorRenderer';

interface Props<T> {
    // the item
    item: T;
    // set to true to highlight the given item
    highlighted: boolean;
    // optional style override
    style?: React.CSSProperties;
    // optional result renderering function
    resultRenderer?: <T>(item: T) => React.ReactChild;
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
}

export default class ResultRenderer<T> extends React.PureComponent<Props<T>, State> {
    static defaultProps = {
        highlighted: false,
    }

    state: State = {
        hover: false,
    }

    handleMouseEnter = () => {
        this.setState({ hover: true });
    }

    handleMouseLeave = () => {
        this.setState({ hover: false });
    }

    render() {
        const item = this.props.item;
        let style = { ...ITEM_STYLE, ...this.props.style };

        if (this.props.highlighted || this.state.hover) {
            style = { ...style, ...ITEM_HOVER_STYLE };
        }

        const renderer = this.props.resultRenderer
            ? this.props.resultRenderer
            : AnchorRenderer;

        return (
            <li style={style} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {renderer({ item })}
            </li>
        );
    }
}


