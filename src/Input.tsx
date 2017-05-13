import * as React from 'react';
import { COLORS } from './constants';

interface Props {
    // callback method when the input value has changed
    onChange: (value: string) => void;
    // callback method when a key is pressed
    onKeyDown: (evt: any /* Event */) => void;
    // optional input placeholder text
    placeholder?: string;
    // optional input width
    width?: number;
    // optional input height
    height?: number;
    // optional style override
    style?: React.CSSProperties;
}

interface State {
    value: string;
}

const INPUT_STYLE: React.CSSProperties = {
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

export default class Input extends React.PureComponent<Props, State> {
    state: State = {
        value: '',
    }

    handleChange = (evt: any /* Event */) => {
        const value = evt.target.value;
        this.setState({ value });
        this.props.onChange(value);
    }

    handleKeyDown = (evt: any /* Event */) => {
        this.props.onKeyDown(evt);
    }

    render() {
        const style = { ...INPUT_STYLE, ...this.props.style };

        if (this.props.width) {
            style.width = this.props.width;
        }

        if (this.props.height) {
            style.height = this.props.height;
        }

        return (
            <input
                type="text"
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={style}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown} />
        );
    }
}

