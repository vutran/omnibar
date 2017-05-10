import * as React from 'react';
import Omnibar from '../../../src';
import CodeBlock from '../CodeBlock';
import BasicDemoExtension from '../extensions/BasicDemoExtension';

interface Props {}

const EXTENSION_CODE = `
export default function BasicDemoExtension(query) {
    const rgx = new RegExp(query, 'i');
    const items = [
        {
            title: 'GitHub',
            url: 'https://github.com',
        },
        {
            title: 'Google',
            url: 'https://google.com',
        },
        {
            title: 'Twitter',
            url: 'https://twitter.com',
        },
    ];
    return items.filter(item => rgx.test(item.title));
}`;

const USAGE_CODE = `
<Omnibar
    placeholder="Enter a keyword"
    extensions={[BasicDemoExtension}] />
`;


export default function Example1(props: Props) {
    return (
        <div className="base">
            <h2>Simple Extension</h2>
            <div className="example-left">
                <p>The most simplest extension should return a list of items.</p>
                <p>Default shape: <code>{`{ title, url }`}</code></p>
            </div>
            <div className="example">
                <div className="example-left">
                    <CodeBlock>{EXTENSION_CODE}</CodeBlock>
                </div>
                <div className="example-right">
                    <CodeBlock style={{ marginBottom: 30 }}>{USAGE_CODE}</CodeBlock>
                    <Omnibar
                        placeholder="Enter a keyword"
                        extensions={[BasicDemoExtension]} />
                </div>
            </div>
        </div>
    );
}
