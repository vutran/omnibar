import * as React from 'react';
import Input from './Input';
import Results from './Results';
import search from './search';
import { KEYS } from './constants';
import AnchorAction from './modifiers/anchor/AnchorAction';
import { debounce } from './utils';

export default class Omnibar<T> extends React.PureComponent<Omnibar.Props<T>, Omnibar.State<T>> {
    // TODO - fix generic container
    static defaultProps: Omnibar.Props<any> = {
        extensions: [],
        maxViewableResults: null,
        rowHeight: 50,
        resultStyle: {},
        inputDelay: 100,
    }

    state: Omnibar.State<T> = {
        results: [],
        selectedIndex: 0,
        displayResults: false,
    }

    constructor(props: Omnibar.Props<T>) {
        super(props);
        this.query = debounce(this.query, this.props.inputDelay);
    }

    query = (value: string) => {
        if (this.props.extensions.length) {
            search<T>(value, this.props.extensions)
                .then(items => {
                    if (items.length) {
                        let results = items;
                        if (this.props.maxResults) {
                            results = results.slice(0, this.props.maxResults);
                        }
                        this.setState({ results, displayResults: true });
                    }
                });
        }
    }

    reset() {
        this.setState({
            results: [],
            displayResults: false,
        });
    }

    prev = () => {
        this.setState((prevState: Omnibar.State<T>) => {
            const selectedIndex = prevState.selectedIndex - 1;
            if (selectedIndex >= 0) {
                return { selectedIndex };
            }
        });
    }

    next = () => {
        this.setState((prevState: Omnibar.State<T>) => {
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

    handleBlur = () => {
        this.setState({ displayResults: false });
    }

    handleFocus = () => {
        this.setState({ displayResults: true });
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
                {React.createElement(
                    Input,
                    {
                        width,
                        height,
                        style: inputStyle,
                        placeholder,
                        onChange: this.handleChange,
                        onKeyDown: this.handleKeyDown,
                        onBlur: this.handleBlur,
                        onFocus: this.handleFocus,
                    }
                )}
                {this.state.displayResults && (
                    React.createElement(
                        Results,
                        {
                            selectedIndex: this.state.selectedIndex,
                            items: this.state.results,
                            rowHeight: rowHeight,
                            maxHeight: maxHeight,
                            style: resultStyle,
                            rowStyle: rowStyle,
                            resultRenderer: resultRenderer,
                        },
                    )
                )}
            </div>
        );
    }
}
