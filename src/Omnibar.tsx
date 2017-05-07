import * as React from 'react';
import { Extension, ResultItem } from '../typings';
import Input from './Input';
import Results from './Results';
import { flatten } from './utils';

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
    results: Array<ResultItem>;
}

export default class Omnibar extends React.Component<Props, State> {
    state: State = {
        results: [],
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

    handleChange = (value: string) => {
        if (value) {
            this.query(value);
        } else {
            this.reset();
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
                    onChange={this.handleChange} />
                {this.state.results.length > 0 && (
                    <Results
                        items={this.state.results}
                        rowHeight={rowHeight}
                        rowStyle={rowStyle} />
                )}
            </div>
        );
    }
}
