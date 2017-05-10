import * as React from 'react';
import Omnibar from '../../../src';
import CodeBlock from '../CodeBlock';
import NpmSearchExtension from '../extensions/NpmSearchExtension';

interface Props {}
interface State {}

const EXTENSION_CODE = `
const URL = 'https://api.npms.io/v2/search/suggestions';

export default function NpmSearchExtension(query) {
    return fetch(\`\${URL}?q=\${query}&size=10\`)
        .then(packages => packages.map(
            item => ({
                title: item.package.name,
                url: item.package.links.npm,
            }),
        ));
}
`;

const USAGE_CODE = `
<Omnibar
    placeholder="Search npm packages"
    maxResults={5}
    extensions={[NpmSearchExtension]} />
`

export default class App extends React.Component<Props, State> {
    render() {
        return (
            <div className="base">
                <h2>Npm Search Extension</h2>
                <div className="example-left">
                    <p>Extensions can also return a Promise that resolves a list of items.</p>
                </div>
                <div className="example">
                    <div className="example-left">
                        <CodeBlock>{EXTENSION_CODE}</CodeBlock>
                    </div>
                    <div className="example-right">
                        <CodeBlock style={{ marginBottom: 30 }}>{USAGE_CODE}</CodeBlock>
                        <Omnibar
                            placeholder="Search npm packages"
                            maxResults={5}
                            extensions={[NpmSearchExtension]} />
                    </div>
                </div>
            </div>
        );
    }
}
