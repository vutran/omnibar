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
        .then(resp => resp.items);
}

export function renderGitHubItem({ item }) {
    return (
        <div>
            <img src={item.owner.avatar_url} width={30} height={30} />
            <a href={item.html_url}>{item.full_name}</a>
        </div>
    );
}
`;

const USAGE_CODE = `
<Omnibar
    placeholder="Search GitHub repositories"
    maxResults={5}
    extensions={[GitHubSearchExtension]}
    resultRenderer={renderGitHubItem} />
`

export default class App extends React.Component<Props, State> {
    renderGitHubItem = ({ item }: { item: any }) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ maxWidth: 30, marginRight: 15, marginLeft: 15, display: 'flex', flexDirection: 'row' }}>
                    <img
                        src={item.owner.avatar_url}
                        alt={item.full_name}
                        width={30}
                        height={30}
                        style={{ alignSelf: 'center' }} />
                </div>
                <a href={item.html_url} style={{ flexGrow: 1, color: '#000', textDecoration: 'none', fontSize: 14 }}>
                    {item.full_name}
                </a>
            </div>
        );
    }

    render() {
        return (
            <div className="base">
                <h2>GitHub Search Extension</h2>
                <div className="example-left">
                    <p>
                        The result listing will use the
                        built-in <code>`AnchorRenderer`</code> by default.
                        However, you can replace the result renderer
                        with your own custom rendering function.
                    </p>
                </div>
                <div className="example">
                    <div className="example-left">
                        <CodeBlock>{EXTENSION_CODE}</CodeBlock>
                    </div>
                    <div className="example-right">
                        <CodeBlock style={{ marginBottom: 30 }}>{USAGE_CODE}</CodeBlock>
                        <Omnibar
                            placeholder="Search GitHub repositories"
                            maxResults={5}
                            extensions={[GitHubSearchExtension]}
                            resultRenderer={this.renderGitHubItem} />
                    </div>
                </div>
            </div>
        );
    }
}
