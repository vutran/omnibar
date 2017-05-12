export default `
import React from 'react';
import ReactDOM from 'react-dom';
import Omnibar from 'omnibar';
import NpmSearchExtension from './NpmSearchExtension';

ReactDOM.render(
    <div>
        <Omnibar
            placeholder="Search npm packages"
            maxResults={10}
            maxViewableResults={5}
            extensions={[
                NpmSearchExtension,
            ]} />
    </div>,
    document.getElementById('app')
);
`;
