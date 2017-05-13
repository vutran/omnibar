import * as React from 'react';
import { active } from './utils';
import Omnibar from '../../src';
import CodeBlock from './CodeBlock';
import MathExtension from './extensions/MathExtension';
import math from './examples/math';

interface Tab {
    filename: string;
    code: string;
}

interface Props {
    tabs: Array<Tab>;
}

interface State {
    tab: string;
}

export default class Editor extends React.Component<Props, State> {
    state: State = {
        tab: null,
    };

    switchTab = (evt: any) => {
        this.setState({ tab: evt.target.id });
    }

    componentWillMount() {
        this.setState({ tab: this.props.tabs[0].filename });
    }

    render() {
        return (
            <div>
                <div className="tab-nav">
                    { this.props.tabs.map((tab) => (
                        <button
                            key={tab.filename}
                            type="button"
                            id={tab.filename}
                            className={active(this.state.tab === tab.filename, 'active')}
                            onClick={this.switchTab}>
                            {tab.filename}
                        </button>
                    )) }
                </div>
                { this.props.tabs.map((tab) => (
                    this.state.tab === tab.filename && <CodeBlock key={tab.filename} className="editor">{tab.code}</CodeBlock>)
                ) }
            </div>
        );
    }
}
