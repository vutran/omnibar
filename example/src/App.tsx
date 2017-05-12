import * as React from 'react';
import Omnibar from '../../src';
import CodeBlock from './CodeBlock';
import MathExtension from './extensions/MathExtension';
import NpmSearchExtension from './extensions/NpmSearchExtension';
import GitHubSearchExtension from './extensions/GitHubSearchExtension';
import math from './examples/math';
import npmSearch from './examples/npm-search';

interface Props {}
interface State {
    tab1: string;
    tab2: string;
}

function active(compare: boolean, className: string): string {
    if (compare) {
        return className;
    }
}

export default class App extends React.Component<Props, State> {
    state: State ={
        tab1: 'main.jsx',
        tab2: 'main.jsx',
    };

    switchTab1 = (evt: any) => {
        this.setState({ tab1: evt.target.id });
    }

    switchTab2 = (evt: any) => {
        this.setState({ tab2: evt.target.id });
    }

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
                    </div>
                </header>
                <div className="body wrapper">
                    <div className="block center">
                        <img className="block-img" src="./assets/binocular.svg" alt="Search" />
                        <h2>Search</h2>
                        <p>
                            A powerful search bar for your React application.
                        </p>
                    </div>

                    <div className="block center">
                        <img className="block-img" src="./assets/package.svg" alt="Search" />
                        <h2>Extensions</h2>
                        <p>
                            Extend the capabilities of your omnibar with custom extensions with a dead simple API.
                        </p>
                    </div>

                    <div className="block center">
                        <img className="block-img" src="./assets/paperclip.svg" alt="Search" />
                        <h2>Flexibility</h2>
                        <p>
                            Populate results from different sources, apply unique actions, or create custom renderers.
                        </p>
                    </div>

                    <div className="block full">
                        <header className="block-header">
                            <h2>Example 1 - Math</h2>
                            <Omnibar
                                placeholder="Enter an expression"
                                extensions={[MathExtension]} />
                        </header>
                        <div className="tab-nav">
                            <button
                                type="button"
                                id="main.jsx"
                                className={active(this.state.tab1 === 'main.jsx', 'active')}
                                onClick={this.switchTab1}>
                                main.jsx
                            </button>
                            <button
                                type="button"
                                id="MathExtension.jsx"
                                className={active(this.state.tab1 === 'MathExtension.jsx', 'active')}
                                onClick={this.switchTab1}>
                                MathExtension.jsx
                            </button>
                        </div>
                        { this.state.tab1 === 'main.jsx' && <CodeBlock className="editor">{math.main}</CodeBlock> }
                        { this.state.tab1 === 'MathExtension.jsx' && <CodeBlock className="editor">{math.MathExtension}</CodeBlock> }
                    </div>

                    <div className="block full">
                        <header className="block-header">
                            <h2>Example 2 - NPM Search</h2>
                            <Omnibar
                                placeholder="Search npm packages"
                                maxResults={10}
                                maxViewableResults={5}
                                extensions={[NpmSearchExtension]} />
                        </header>
                        <div className="tab-nav">
                            <button
                                type="button"
                                id="main.jsx"
                                className={active(this.state.tab2 === 'main.jsx', 'active')}
                                onClick={this.switchTab2}>
                                main.jsx
                            </button>
                            <button
                                type="button"
                                id="NpmSearchExtension.jsx"
                                className={active(this.state.tab2 === 'NpmSearchExtension.jsx', 'active')}
                                onClick={this.switchTab2}>
                                NpmSearchExtension.jsx
                            </button>
                        </div>
                        { this.state.tab2 === 'main.jsx' && <CodeBlock className="editor">{npmSearch.main}</CodeBlock> }
                        { this.state.tab2 === 'NpmSearchExtension.jsx' && <CodeBlock className="editor">{npmSearch.NpmSearchExtension}</CodeBlock> }
                    </div>

                    <div className="block full center">
                        <a className="get-started" href="https://github.com/vutran/omnibar/">Get Started</a>
                    </div>
                </div>
                <footer className="footer">
                    Developed by <a href="https://github.com/vutran/">@vutran</a>.
                    Icons by <a href="http://www.flaticon.com/packs/management-2">Freepik</a>.
                </footer>
            </div>
        );
    }
}
