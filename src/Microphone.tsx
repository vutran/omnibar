// Credits: http://www.flaticon.com/free-icon/microphone_159802#term=microphone&page=1&position=49

import * as React from 'react';

interface Props {
  width: number;
  height: number;
  active?: boolean;
}

export default function Microphone(props: Props) {
  const fill = props.active ? '#000' : '#ccc';
  return (
    <svg
      width={props.width}
      height={props.height}
      fill={fill}
      x="0px"
      y="0px"
      viewBox="0 0 490.9 490.9"
    >
      <g>
        <g>
          <path d="M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5C149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5c0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z" />
          <path d="M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9C106.6,220,101.2,214.5,94.4,214.5z" />
        </g>
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
}
