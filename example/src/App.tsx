import * as React from 'react';
import Omnibar from '../../src';
import MathExtension from './extensions/MathExtension';
import NpmSearchExtension from './extensions/NpmSearchExtension';
import GitHubSearchExtension from './extensions/GitHubSearchExtension';

interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
    resultRenderer = ({ item }: { item: any }) => {
        return (
            <div style={{ display: 'flex', paddingLeft: 15, paddingRight: 15, color: '#000', textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 30, marginRight: 15 }}>
                    <img src={item.image} width={30} height={30} />
                </div>
                <div style={{ flexGrow: 1 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 'bold', lineHeight: 2, marginTop: 0, marginBottom: 0 }}>{item.title}</h2>
                    <h3 style={{ color: '#bbb', fontSize: 11, lineHeight: 1, marginTop: 0, marginBottom: 0 }}>{item.subtitle}</h3>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <header className="header">
                    <div className="wrapper">
                        <h1>Omnibar</h1>
                        <h2>Extensible search component for React.</h2>
                        <div className="search">
                            <Omnibar
                                placeholder="Search npm package..."
                                maxResults={10}
                                maxViewableResults={5}
                                extensions={[
                                    MathExtension,
                                    GitHubSearchExtension,
                                    NpmSearchExtension,
                                ]}
                                resultRenderer={this.resultRenderer} />
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
