export default `
import React from 'react';
import ReactDOM from 'react-dom';
import Omnibar from 'omnibar';
import MathExtension from './MathExtension';
import NpmSearchExtension from './NpmSearchExtension';

ReactDOM.render(
    <div>
        <Omnibar
            placeholder="Enter keyword"
            maxResults={10}
            maxViewableResults={5}
            extensions={[
                MathExtension,
                NpmSearchExtension,
            ]} />
    </div>,
    document.getElementById('app')
);
`;
