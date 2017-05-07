import * as React from 'react';
import { COLORS } from './constants';

interface Props {
    // callback method when the input value has changed
    onChange: (value: string) => void;
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
    width: 600,
    height: 50,
    fontSize: 24,
    lineHeight: '24px',
    boxSizing: 'border-box',
    outline: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.GRAY,
    paddingLeft: 15,
    paddingRight: 15,
};

export default class Input extends React.Component<Props, State> {
    state: State = {
        value: '',
    }

    handleChange = (evt: any /* Event */) => {
        const value = evt.target.value;
        this.setState({ value });
        this.props.onChange(value);
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
                style={style}
                onChange={this.handleChange} />
        );
    }
}

