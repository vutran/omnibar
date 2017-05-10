import * as React from 'react';
import Omnibar from '../../src';
import Example1 from './examples/Example1';
import Example2 from './examples/Example2';
import Example3 from './examples/Example3';
import MathExtension from './extensions/MathExtension';

interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <header className="header">
                    <div className="wrapper">
                        <h1>Omnibar</h1>
                        <h2>Extensible search component for React.</h2>
                        <div className="search">
                            <Omnibar
                                placeholder="Type something..."
                                extensions={[
                                    MathExtension,
                                ]} />
                        </div>
                    </div>
                </header>
                <div className="outer wrapper">
                    <Example1 />
                    <Example2 />
                    <Example3 />
                </div>
            </div>
        );
    }
}
