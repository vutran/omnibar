import * as React from 'react';
import Omnibar from '../../../src';
import CodeBlock from '../CodeBlock';
import GitHubSearchExtension from '../extensions/GitHubSearchExtension';

interface Props {}
interface State {}

const EXTENSION_CODE = `
const GH = \`https://api.github.com/search/repositories\`;

export default function GitHubSearchExtension(query) {
    return fetch(\`\${GH}?q=\${query}\`)
        .then(resp => resp.items)
        .then(items => items.map(item => ({
            title: item.full_name,
            url: item.html_url,
        })));
}
`;

const USAGE_CODE = `
<Omnibar
    placeholder="Search GitHub repositories"
    maxResults={5}
    extensions={[GitHubSearchExtension]} />
`

export default class App extends React.Component<Props, State> {
    render() {
        return (
            <div className="base">
                <h2>API Search Extension</h2>
                <div className="example">
                    <div className="example-left">
                        <CodeBlock>{EXTENSION_CODE}</CodeBlock>
                    </div>
                    <div className="example-right">
                        <CodeBlock style={{ marginBottom: 30 }}>{USAGE_CODE}</CodeBlock>
                        <Omnibar
                            placeholder="Search GitHub repositories"
                            maxResults={5}
                            extensions={[GitHubSearchExtension]} />
                    </div>
                </div>
            </div>
        );
    }
}
