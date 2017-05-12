'use strict';

var React = require('react');

const COLORS = {
    BLACK: '#000',
    BLUE: '#00f',
    DARKGRAY: '#ddd',
    GRAY: '#eee',
    GREEN: '#0f0',
    RED: '#f00',
    WHITE: '#fff',
};
const KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
};

const INPUT_STYLE = {
    width: '100%',
    height: 50,
    fontSize: 24,
    lineHeight: '24px',
    boxSizing: 'border-box',
    outline: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.DARKGRAY,
    paddingLeft: 15,
    paddingRight: 15,
};
class Input extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: '',
        };
        this.handleChange = (evt /* Event */) => {
            const value = evt.target.value;
            this.setState({ value });
            this.props.onChange(value);
        };
        this.handleKeyDown = (evt /* Event */) => {
            this.props.onKeyDown(evt);
        };
    }
    render() {
        const style = Object.assign({}, INPUT_STYLE, this.props.style);
        if (this.props.width) {
            style.width = this.props.width;
        }
        if (this.props.height) {
            style.height = this.props.height;
        }
        return (React.createElement("input", { type: "text", value: this.state.value, placeholder: this.props.placeholder, style: style, onChange: this.handleChange, onKeyDown: this.handleKeyDown }));
    }
}

const ANCHOR_STYLE = {
    display: 'block',
    textDecoration: 'none',
    color: COLORS.BLACK,
    paddingLeft: 15,
    paddingRight: 15,
};
function AnchorRenderer(props) {
    return (React.createElement("a", { href: props.item.url, style: ANCHOR_STYLE }, props.item.title));
}

const ITEM_STYLE = {
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
const ITEM_HOVER_STYLE = {
    backgroundColor: COLORS.GRAY,
};
class ResultRenderer extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            hover: false,
        };
        this.handleMouseEnter = () => {
            this.setState({ hover: true });
        };
        this.handleMouseLeave = () => {
            this.setState({ hover: false });
        };
    }
    render() {
        const item = this.props.item;
        let style = Object.assign({}, ITEM_STYLE, this.props.style);
        if (this.props.highlighted || this.state.hover) {
            style = Object.assign({}, style, ITEM_HOVER_STYLE);
        }
        const renderer = this.props.resultRenderer
            ? this.props.resultRenderer
            : AnchorRenderer;
        return (React.createElement("li", { style: style, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, renderer({ item })));
    }
}
ResultRenderer.defaultProps = {
    highlighted: false,
    item: null,
};

const LIST_STYLE = {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    backgroundColor: COLORS.WHITE,
};
class Results extends React.Component {
    render() {
        const style = Object.assign({}, LIST_STYLE, this.props.style);
        if (this.props.maxHeight) {
            style.maxHeight = this.props.maxHeight;
            style.borderBottomWidth = 1;
            style.borderBottomColor = COLORS.GRAY;
            style.borderBottomStyle = 'solid';
            style.overflow = 'auto';
        }
        return (React.createElement("ul", { style: style }, this.props.items.map((item, key) => React.createElement(ResultRenderer, { key: key, highlighted: this.props.selectedIndex === key, item: item, style: this.props.rowStyle, resultRenderer: this.props.resultRenderer }))));
    }
}
Results.defaultProps = {
    selectedIndex: -1,
    items: [],
};

/**
 * Flatten a list of lists
 *
 * @param {Array<Array<T>>} lists
 * @return {Array<T>}
 */
/**
 * Flatten a list of lists
 *
 * @param {Array<Array<T>>} lists
 * @return {Array<T>}
 */ function flatten(list) {
    return list.reduce((prev, next) => {
        return prev.concat(next);
    }, []);
}

/**
 * Does a search for the given `query` against the list of `extensions`
 * and returns a Promise that results into a list of `ResultItem`.
 *
 * @param {string} query
 * @param {Array<Extension>} extension
 * @return {Promise<Array<ResultItem>>}
 */
function search(query, extensions) {
    const results = [];
    // iterate through all extensions and compile them into `results` list
    for (let extension of extensions) {
        if (typeof extension === 'function') {
            results.push(extension.call(null, query));
        }
    }
    return Promise.all(results)
        .then(groups => flatten(groups));
}

function AnchorAction(item) {
    if (item.url) {
        window.location.href = item.url;
    }
}

class Omnibar$1 extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            results: [],
            selectedIndex: 0,
        };
        this.prev = () => {
            this.setState((prevState) => {
                const selectedIndex = prevState.selectedIndex - 1;
                if (selectedIndex >= 0) {
                    return { selectedIndex };
                }
            });
        };
        this.next = () => {
            this.setState((prevState) => {
                const selectedIndex = prevState.selectedIndex + 1;
                if (selectedIndex < prevState.results.length) {
                    return { selectedIndex };
                }
            });
        };
        this.action = () => {
            const item = this.state.results[this.state.selectedIndex];
            const action = this.props.onAction || AnchorAction;
            action.call(null, item);
        };
        this.handleChange = (value) => {
            if (value) {
                this.query(value);
            }
            else {
                this.reset();
            }
        };
        this.handleKeyDown = (evt /* Event */) => {
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
    }
    query(value) {
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
    render() {
        const { maxViewableResults, placeholder, width, height, inputStyle, rowHeight, rowStyle, resultStyle, resultRenderer, onAction, } = this.props;
        const maxHeight = maxViewableResults ? maxViewableResults * rowHeight : null;
        return (React.createElement("div", { style: { position: 'relative' } },
            React.createElement(Input, { width: width, height: height, style: inputStyle, placeholder: placeholder, onChange: this.handleChange, onKeyDown: this.handleKeyDown }),
            this.state.results.length > 0 && (React.createElement(Results, { selectedIndex: this.state.selectedIndex, items: this.state.results, rowHeight: rowHeight, maxHeight: maxHeight, style: resultStyle, rowStyle: rowStyle, resultRenderer: resultRenderer }))));
    }
}
Omnibar$1.defaultProps = {
    extensions: [],
    maxViewableResults: null,
    rowHeight: 50,
    resultStyle: {},
};

module.exports = Omnibar$1;
