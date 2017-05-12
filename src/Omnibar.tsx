import * as React from 'react';
import { Extension, ResultItem } from '../typings';
import Input from './Input';
import Results from './Results';
import search from './search';
import { KEYS } from './constants';
import AnchorAction from './actions/AnchorAction';

interface Props {
    // list of extensions
    extensions: Array<Extension>;
    // max items
    maxResults?: number;
    // max items to display in view
    maxViewableResults?: number;
    // optional input placeholder text
    placeholder?: string;
    // optional input bar width
    width?: number;
    // optional input bar height
    height?: number;
    // optional input bar style override
    inputStyle?: React.CSSProperties
    // optional result item height
    rowHeight?: number;
    // optional result item style override
    rowStyle?: React.CSSProperties;
    // optional result list style override
    resultStyle?: React.CSSProperties;
    // optional result renderering function
    resultRenderer?: <T>(item: T) => React.ReactChild;
    // optional action override
    onAction?: <T>(item: T) => void;
}

interface State {
    // list of matching results
    results: Array<ResultItem | any>;
    // current selected index
    selectedIndex: number;
}

export default class Omnibar extends React.Component<Props, State> {
    static defaultProps: Props = {
        extensions: [],
        maxViewableResults: null,
        rowHeight: 50,
        resultStyle: {},
    }

    state: State = {
        results: [],
        selectedIndex: 0,
    }

    query(value: string) {
        if (this.props.extensions.length) {
            search(value, this.props.extensions)
                .then(items => {
                    if (items.length) {
                        let results = items;
                        if (this.props.maxResults) {
                            results = results.slice(0, this.props.maxResults);
                        }
                        this.setState({ results });
                    }
                });
        }
    }

    reset() {
        this.setState({ results: [] });
    }

    prev = () => {
        this.setState((prevState: State) => {
            const selectedIndex = prevState.selectedIndex - 1;
            if (selectedIndex >= 0) {
                return { selectedIndex };
            }
        });
    }

    next = () => {
        this.setState((prevState: State) => {
            const selectedIndex = prevState.selectedIndex + 1;
            if (selectedIndex < prevState.results.length) {
                return { selectedIndex };
            }
        });
    }

    action = () => {
        const item = this.state.results[this.state.selectedIndex];
        const action = this.props.onAction || AnchorAction;
        action.call(null, item);
    }

    handleChange = (value: string) => {
        if (value) {
            this.query(value);
        } else {
            this.reset();
        }
    }

    handleKeyDown = (evt: any /* Event */) => {
        switch (evt.keyCode) {
            case KEYS.UP:
                this.prev();
                break;
            case KEYS.DOWN:
                this.next();
                break;
            case KEYS.ENTER:
                this.action();
                break;
        }
    }

    render() {
        const {
            maxViewableResults,
            placeholder,
            width,
            height,
            inputStyle,
            rowHeight,
            rowStyle,
            resultStyle,
            resultRenderer,
            onAction,
        } = this.props;

        const maxHeight = maxViewableResults ? maxViewableResults * rowHeight : null;

        return (
            <div style={{ position: 'relative' }}>
                <Input
                    width={width}
                    height={height}
                    style={inputStyle}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown} />
                {this.state.results.length > 0 && (
                    <Results
                        selectedIndex={this.state.selectedIndex}
                        items={this.state.results}
                        rowHeight={rowHeight}
                        maxHeight={maxHeight}
                        style={resultStyle}
                        rowStyle={rowStyle}
                        resultRenderer={resultRenderer} />
                )}
            </div>
        );
    }
}
