import * as React from 'react';
import { COLORS, DEFAULT_HEIGHT } from './constants';

interface Props extends React.HTMLProps<HTMLInputElement> {}

interface State {}

const INPUT_STYLE: React.CSSProperties = {
  borderColor: COLORS.DARKGRAY,
  borderStyle: 'solid',
  borderWidth: 1,
  boxSizing: 'border-box',
  fontSize: 24,
  height: DEFAULT_HEIGHT,
  lineHeight: '24px',
  outline: 0,
  paddingLeft: 15,
  paddingRight: 15,
  width: '100%',
};

export default class Input extends React.PureComponent<Props, State> {
  render() {
    let { style, ...rest } = this.props;

    return <input type="text" style={{ ...INPUT_STYLE, ...style }} {...rest} />;
  }
}
