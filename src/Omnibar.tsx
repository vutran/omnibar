import * as React from 'react';
import { Extension, ResultItem } from '../typings';
import Input from './Input';
import Results from './Results';
import { flatten } from './utils';
import { KEYS } from './constants';

interface Props {
    // list of extensions
    extensions: Array<Extension>;
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
            const results = [];
            for (let extension of this.props.extensions) {
                if (typeof extension === 'function') {
                    results.push(extension.call(null, value));
                }
            }

            Promise.resolve(results)
                .then(groups => {
                    const results = flatten<ResultItem>(groups);
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
