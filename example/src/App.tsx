import * as React from 'react';
import Omnibar from '../../src';
import BasicDemoExtension from './extensions/BasicDemoExtension';
import GitHubSearchExtension from './extensions/GitHubSearchExtension';

interface Props {}
interface State {}

const OUTER: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: '100%',
    marginTop: 100,
};

const INNER: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
};

export default class App extends React.Component<Props, State> {
    render() {
        return (
            <div style={OUTER}>
                <div style={INNER}>
                    <Omnibar
                        extensions={[
                            BasicDemoExtension,
                            GitHubSearchExtension,
                        ]} />
                </div>
            </div>
        );
    }
}
