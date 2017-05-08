import * as React from 'react';
import { Extension, ResultItem } from '../typings';
import Input from './Input';
import Results from './Results';
import search from './search';
import { KEYS } from './constants';

interface Props {
    // list of extensions
    extensions: Array<Extension>;
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
}

interface State {
    // list of matching results
    results: Array<ResultItem>;
    // current selected index
    selectedIndex: number;
}

export default class Omnibar extends React.Component<Props, State> {
    state: State = {
        results: [],
        selectedIndex: -1,
    }

    query(value: string) {
        if (this.props.extensions.length) {
            search(value, this.props.extensions)
                .then(results => {
                    this.setState({ results });
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
        }
    }

    render() {
        const {
            placeholder,
            width,
            height,
            inputStyle,
            rowHeight,
            rowStyle,
        } = this.props;

        return (
            <div>
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
                        rowStyle={rowStyle} />
                )}
            </div>
        );
    }
}
