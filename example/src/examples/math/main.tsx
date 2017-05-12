export default `
import React from 'react';
import ReactDOM from 'react-dom';
import Omnibar from 'omnibar';
import MathExtension from './MathExtension';

ReactDOM.render(
    <div>
        <Omnibar
            placeholder="Enter an expression"
            extensions={[
                MathExtension,
            ]} />
    </div>,
    document.getElementById('app')
);
`;
