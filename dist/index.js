'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_1 = require('tslib');
var React = require('react');

var COLORS = {
  BLACK: '#000',
  BLUE: '#00f',
  DARKGRAY: '#ddd',
  GRAY: '#eee',
  GREEN: '#0f0',
  RED: '#f00',
  WHITE: '#fff',
};
var KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};
var BLUR_DELAY = 200;
var DEFAULT_HEIGHT = 50;

var INPUT_STYLE = {
  width: '100%',
  height: DEFAULT_HEIGHT,
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
var Input = /** @class */ (function(_super) {
  tslib_1.__extends(Input, _super);
  function Input() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      value: '',
    };
    _this.handleChange = function(evt /* Event */) {
      var value = evt.target.value;
      _this.setState({ value: value });
      _this.props.onChange(value);
    };
    return _this;
  }
  Input.prototype.render = function() {
    var style = tslib_1.__assign({}, INPUT_STYLE, this.props.style);
    return React.createElement('input', {
      type: 'text',
      value: this.state.value || this.props.defaultValue,
      placeholder: this.props.placeholder,
      style: style,
      onChange: this.handleChange,
      onKeyDown: this.props.onKeyDown,
      onBlur: this.props.onBlur,
      onFocus: this.props.onFocus,
      autoFocus: this.props.autoFocus,
    });
  };
  return Input;
})(React.PureComponent);

var ITEM_STYLE = {
  borderBottomWidth: 1,
  borderColor: COLORS.DARKGRAY,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderStyle: 'solid',
  borderTopWidth: 0,
  boxSizing: 'border-box',
  color: COLORS.BLACK,
  display: 'block',
  fontSize: 24,
  height: DEFAULT_HEIGHT,
  lineHeight: DEFAULT_HEIGHT + 'px',
  paddingLeft: 15,
  paddingRight: 15,
  textDecoration: 'none',
};
function AnchorRenderer(props) {
  var item = props.item,
    isSelected = props.isSelected,
    isHighlighted = props.isHighlighted,
    style = props.style,
    rest = tslib_1.__rest(props, [
      'item',
      'isSelected',
      'isHighlighted',
      'style',
    ]);
  var mergedStyle = tslib_1.__assign({}, ITEM_STYLE, style);
  if (isSelected) {
    mergedStyle.backgroundColor = COLORS.GRAY;
  }
  if (isHighlighted) {
    mergedStyle.backgroundColor = COLORS.DARKGRAY;
  }
  return React.createElement(
    'a',
    tslib_1.__assign({ href: item.url, style: mergedStyle }, rest),
    item.title
  );
}

var ResultRenderer = /** @class */ (function(_super) {
  tslib_1.__extends(ResultRenderer, _super);
  function ResultRenderer() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      isHighlighted: false,
    };
    _this.handleMouseEnter = function(evt /* Event */) {
      _this.setState({ isHighlighted: true });
      _this.props.onMouseEnter && _this.props.onMouseEnter(evt);
    };
    _this.handleMouseLeave = function(evt /* Event */) {
      _this.setState({ isHighlighted: false });
      _this.props.onMouseLeave && _this.props.onMouseLeave(evt);
    };
    return _this;
  }
  ResultRenderer.prototype.render = function() {
    var item = this.props.item;
    var renderer = this.props.children ? this.props.children : AnchorRenderer;
    return renderer({
      style: this.props.style,
      item: item,
      isSelected: this.props.isSelected,
      isHighlighted: this.state.isHighlighted,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: this.props.onClickItem,
    });
  };
  ResultRenderer.defaultProps = {
    isSelected: false,
  };
  return ResultRenderer;
})(React.PureComponent);

var LIST_STYLE = {
  position: 'absolute',
  width: '100%',
  zIndex: 2,
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  backgroundColor: COLORS.WHITE,
};
function Results(props) {
  var style = tslib_1.__assign({}, LIST_STYLE, props.style);
  if (props.maxHeight) {
    style.maxHeight = props.maxHeight;
    style.borderBottomWidth = 1;
    style.borderBottomColor = COLORS.GRAY;
    style.borderBottomStyle = 'solid';
    style.overflow = 'auto';
  }
  function createHandler(handler, key) {
    return handler.bind(this, key);
  }
  return React.createElement(
    'ul',
    {
      style: style,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
    },
    props.items.map(function(item, key) {
      return React.createElement(ResultRenderer, {
        key: key,
        children: props.children,
        isSelected: props.selectedIndex === key,
        item: item,
        onMouseEnter:
          props.onMouseEnterItem && createHandler(props.onMouseEnterItem, key),
        onClickItem: props.onClickItem,
      });
    })
  );
}

/**
 * Flatten a list of lists
 *
 * @param {Array<Array<T>>} lists
 * @return {Array<T>}
 */
function flatten(list) {
  return list.reduce(function(prev, next) {
    return prev.concat(next);
  }, []);
}
/**
 * Prevent a function from being called multiple times
 * repeatedly within a short time frame.
 *
 * @param {Function} fn
 * @param {number} wait
 * @return {Function}
 */
function debounce(fn, wait) {
  var _this = this;
  var timeout = null;
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var ctx = _this;
    var later = function() {
      timeout = null;
      fn.apply(ctx, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Does a search for the given `query` against the list of `extensions`
 * and returns a Promise that results into a list of `ResultItem`.
 *
 * @param {string} query
 * @param {Array<Extension>} extension
 * @return {Promise<Array<T>>}
 */
function search(query, extensions) {
  var results = [];
  // iterate through all extensions and compile them into `results` list
  for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
    var extension = extensions_1[_i];
    if (typeof extension === 'function') {
      results.push(extension.call(null, query));
    }
  }
  return Promise.all(results).then(function(groups) {
    return flatten(groups);
  });
}

function AnchorAction(item) {
  if (item.url) {
    window.location.href = item.url;
  }
}

var Omnibar$1 = /** @class */ (function(_super) {
  tslib_1.__extends(Omnibar, _super);
  function Omnibar(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      results: [],
      selectedIndex: 0,
      hoveredIndex: -1,
      displayResults: false,
    };
    _this.query = function(value) {
      if (_this.props.extensions.length > 0) {
        search(value, _this.props.extensions).then(function(results) {
          _this.setState({
            results:
              _this.props.maxResults > 0
                ? results.slice(0, _this.props.maxResults)
                : results,
            displayResults: results.length > 0,
          });
        });
      }
    };
    _this.prev = function() {
      _this.setState(function(prevState) {
        var selectedIndex = prevState.selectedIndex - 1;
        if (selectedIndex >= 0) {
          return { selectedIndex: selectedIndex };
        }
      });
    };
    _this.next = function() {
      _this.setState(function(prevState) {
        var selectedIndex = prevState.selectedIndex + 1;
        if (selectedIndex < prevState.results.length) {
          return { selectedIndex: selectedIndex };
        }
      });
    };
    _this.action = function() {
      // uses the hovered index if the user is currently
      // mousing over an item, falls back on the
      // selected index
      var idx =
        _this.state.hoveredIndex > -1
          ? _this.state.hoveredIndex
          : _this.state.selectedIndex;
      var item = _this.state.results[idx];
      var action = _this.props.onAction || AnchorAction;
      action.call(null, item);
    };
    _this.handleChange = function(value) {
      if (value) {
        _this.query(value);
      } else {
        _this.reset();
      }
    };
    _this.handleKeyDown = function(evt /* Event */) {
      switch (evt.keyCode) {
        case KEYS.UP:
          _this.prev();
          break;
        case KEYS.DOWN:
          _this.next();
          break;
        case KEYS.ENTER:
          _this.action();
          break;
      }
    };
    _this.handleMouseEnterItem = function(hoveredIndex) {
      _this.setState({ hoveredIndex: hoveredIndex });
    };
    _this.handleMouseLeave = function() {
      _this.setState({ hoveredIndex: -1 });
    };
    _this.handleBlur = function() {
      setTimeout(function() {
        return _this.setState({ displayResults: false });
      }, BLUR_DELAY);
    };
    _this.handleFocus = function() {
      _this.setState({ displayResults: true });
    };
    _this.handleClickItem = function(e) {
      e.preventDefault();
      if (_this.state.hoveredIndex > -1) {
        _this.action();
      }
    };
    _this.query = debounce(_this.query, _this.props.inputDelay);
    return _this;
  }
  Omnibar.prototype.reset = function() {
    this.setState({
      results: [],
      displayResults: false,
    });
  };
  Omnibar.prototype.componentWillReceiveProps = function(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.handleChange(nextProps.defaultValue);
    }
  };
  Omnibar.prototype.render = function() {
    var maxHeight = this.props.maxViewableResults
      ? this.props.maxViewableResults * DEFAULT_HEIGHT
      : null;
    return React.createElement(
      'div',
      { style: this.props.rootStyle },
      React.createElement(Input, {
        defaultValue: this.props.defaultValue,
        autoFocus: this.props.autoFocus,
        style: this.props.style,
        placeholder: this.props.placeholder,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
      }),
      this.state.displayResults &&
        Results({
          children: this.props.render || this.props.children,
          selectedIndex: this.state.selectedIndex,
          items: this.state.results,
          maxHeight: maxHeight,
          style: this.props.resultStyle,
          onMouseEnterItem: this.handleMouseEnterItem,
          onMouseLeave: this.handleMouseLeave,
          onClickItem: this.handleClickItem,
        })
    );
  };
  // TODO - fix generic container
  Omnibar.defaultProps = {
    children: null,
    render: null,
    extensions: [],
    maxViewableResults: null,
    inputDelay: 100,
    // style props
    resultStyle: {},
    rootStyle: { position: 'relative' },
  };
  return Omnibar;
})(React.PureComponent);

/**
 * Filter your extension through a command prefix. (eg: 'user')
 *
 * @param {Omnibar.Extension} extension
 * @param {string} command
 * @return {Omnibar.Results}
 */
function command(extension, command) {
  var prefix = new RegExp('^' + command + '\\s', 'i');
  return function(query) {
    // down-case for comparison
    var lc = command.toLowerCase();
    var lq = query.toLowerCase();
    if (lc === lq) {
      return [];
    }
    if (!lq.startsWith(lc + ' ')) {
      return [];
    }
    return extension(query.replace(prefix, '').trim());
  };
}

// Credits: http://www.flaticon.com/free-icon/microphone_159802#term=microphone&page=1&position=49
function Microphone(props) {
  var fill = props.active ? '#000' : '#ccc';
  return React.createElement(
    'svg',
    {
      width: props.width,
      height: props.height,
      fill: fill,
      x: '0px',
      y: '0px',
      viewBox: '0 0 490.9 490.9',
    },
    React.createElement(
      'g',
      null,
      React.createElement(
        'g',
        null,
        React.createElement('path', {
          d:
            'M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5C149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5c0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z',
        }),
        React.createElement('path', {
          d:
            'M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9C106.6,220,101.2,214.5,94.4,214.5z',
        })
      )
    ),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null),
    React.createElement('g', null)
  );
}

/**
 * Adds voice commands to your Omnibar
 */
function withVoice(Component$$1) {
  return /** @class */ (function(_super) {
    tslib_1.__extends(VoiceOmnibar, _super);
    function VoiceOmnibar(props) {
      var _this = _super.call(this, props) || this;
      _this.state = {
        value: '',
        isSpeaking: false,
      };
      _this.recognition = null;
      _this.speak = function() {
        _this.recognition.lang = 'en-US';
        _this.setState({ isSpeaking: true });
        _this.recognition.start();
      };
      _this.recognition = null;
      return _this;
    }
    VoiceOmnibar.prototype.componentDidMount = function() {
      var _this = this;
      if ('webkitSpeechRecognition' in window) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.onresult = function(evt) {
          for (var i = evt.resultIndex; i < evt.results.length; ++i) {
            _this.setState({ value: evt.results[i][0].transcript });
          }
        };
        this.recognition = recognition;
      }
    };
    VoiceOmnibar.prototype.render = function() {
      var base = {
        position: 'relative',
      };
      var mic = {
        position: 'absolute',
        right: 0,
        top: 0,
        border: 0,
        backgroundColor: 'transparent',
        lineHeight: DEFAULT_HEIGHT + 'px',
        fontSize: 24,
        paddingRight: 15,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 15,
      };
      var style = this.props.style || {};
      if (this.state.isSpeaking) {
        style.backgroundColor = 'rgba(0, 255, 0, 0.075)';
      }
      return React.createElement(
        'div',
        { style: base },
        React.createElement(
          Component$$1,
          tslib_1.__assign({}, this.props, {
            defaultValue: this.state.value,
            style: style,
          })
        ),
        React.createElement(
          'button',
          { onClick: this.speak, style: mic },
          React.createElement(Microphone, {
            width: 24,
            height: 24,
            active: this.state.isSpeaking,
          })
        )
      );
    };
    return VoiceOmnibar;
  })(React.Component);
}

exports['default'] = Omnibar$1;
exports.command = command;
exports.withVoice = withVoice;
