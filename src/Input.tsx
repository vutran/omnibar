import * as React from 'react';
import { COLORS, DEFAULT_HEIGHT } from './constants';

interface Props extends React.HTMLProps<HTMLInputElement> {}

interface State {}

const INPUT_STYLE: React.CSSProperties = {
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

export default class Input extends React.PureComponent<Props, State> {
  render() {
    let { style, ...rest } = this.props;

    return <input type="text" style={{ ...INPUT_STYLE, ...style }} {...rest} />;
  }
}
