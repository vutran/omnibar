import * as React from 'react';
import Input from './Input';
import Results from './Results';
import search from './search';
import { KEYS, BLUR_DELAY } from './constants';
import AnchorAction from './modifiers/anchor/AnchorAction';
import { debounce } from './utils';

export default class Omnibar<T> extends React.PureComponent<
    Omnibar.Props<T>,
    Omnibar.State<T>
> {
    // TODO - fix generic container
    static defaultProps: Omnibar.Props<any> = {
        extensions: [],
        maxViewableResults: null,
        rowHeight: 50,
        resultStyle: {},
        inputDelay: 100,
    };

    state: Omnibar.State<T> = {
        results: [],
        selectedIndex: 0,
        hoveredIndex: -1,
        displayResults: false,
    };

    constructor(props: Omnibar.Props<T>) {
        super(props);
        this.query = debounce(this.query, this.props.inputDelay);
    }

    query = (value: string) => {
        if (this.props.extensions.length > 0) {
            search<T>(value, this.props.extensions).then(results => {
                this.setState({
                    results:
                        this.props.maxResults > 0
                            ? results.slice(0, this.props.maxResults)
                            : results,
                    displayResults: results.length > 0,
                });
            });
        }
    };

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
    };

    next = () => {
        this.setState((prevState: Omnibar.State<T>) => {
            const selectedIndex = prevState.selectedIndex + 1;
            if (selectedIndex < prevState.results.length) {
                return { selectedIndex };
            }
        });
    };

    action = () => {
        // uses the hovered index if the user is currently
        // mousing over an item, falls back on the
        // selected index
        const idx =
            this.state.hoveredIndex > -1
                ? this.state.hoveredIndex
                : this.state.selectedIndex;
        const item = this.state.results[idx];
        const action = this.props.onAction || AnchorAction;
        action.call(null, item);
    };

    handleChange = (value: string) => {
        if (value) {
            this.query(value);
        } else {
            this.reset();
        }
    };

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
    };

    handleMouseEnterItem = (hoveredIndex: number) => {
        this.setState({ hoveredIndex });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredIndex: -1 });
    };

    handleBlur = () => {
        setTimeout(() => this.setState({ displayResults: false }), BLUR_DELAY);
    };

    handleFocus = () => {
        this.setState({ displayResults: true });
    };

    handleClickItem = (e: any) => {
        e.preventDefault();
        if (this.state.hoveredIndex > -1) {
            this.action();
        }
    };

    componentWillReceiveProps(nextProps: Omnibar.Props<T>) {
        if (this.props.defaultValue !== nextProps.defaultValue) {
            this.handleChange(nextProps.defaultValue);
        }
    }

    render() {
        const {
            maxViewableResults,
            placeholder,
            defaultValue,
            width,
            height,
            inputStyle,
            rowHeight,
            rowStyle,
            resultStyle,
            resultRenderer,
            onAction,
        } = this.props;

        const maxHeight = maxViewableResults
            ? maxViewableResults * rowHeight
            : null;

        return (
            <div style={{ position: 'relative' }}>
                {React.createElement(Input, {
                    defaultValue,
                    width,
                    height,
                    style: inputStyle,
                    placeholder,
                    onChange: this.handleChange,
                    onKeyDown: this.handleKeyDown,
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                })}
                {this.state.displayResults &&
                    Results({
                        selectedIndex: this.state.selectedIndex,
                        items: this.state.results,
                        rowHeight: rowHeight,
                        maxHeight: maxHeight,
                        style: resultStyle,
                        rowStyle: rowStyle,
                        onMouseEnterItem: this.handleMouseEnterItem,
                        onMouseLeave: this.handleMouseLeave,
                        onClickItem: this.handleClickItem,
                        resultRenderer: resultRenderer,
                    })}
            </div>
        );
    }
}
