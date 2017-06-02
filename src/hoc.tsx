import * as React from 'react';
import Microphone from './Microphone';

/**
 * Adds voice commands to your Omnibar
 */
export function withVoice(Component: any): React.ComponentClass<any> {
    interface VoiceProps {
        height?: number;
        inputStyle?: React.CSSProperties;
    }
    interface VoiceState {
        value: string;
        isSpeaking: boolean;
    }

    return class VoiceOmnibar extends React.Component<VoiceProps, VoiceState> {
        static defaultProps = {
            height: 50,
        }

        state: VoiceState = {
            value: '',
            isSpeaking: false,
        };

        recognition: any = null;

        constructor(props: any) {
            super(props);
            this.recognition = null;
        }

        componentDidMount() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.onresult = (evt: any) => {
                    for (let i = evt.resultIndex; i < evt.results.length; ++i) {
                        this.setState({ value: evt.results[i][0].transcript });
                    }
                }
                this.recognition = recognition;
            }
        }

        speak = () => {
            this.recognition.lang = 'en-US';
            this.setState({ isSpeaking: true });
            this.recognition.start();
        }

        render() {
            const base: React.CSSProperties = {
                position: 'relative',
            };

            const mic: React.CSSProperties = {
                position: 'absolute',
                right: 0,
                top: 0,
                border: 0,
                backgroundColor: 'transparent',
                lineHeight: `${this.props.height}px`,
                fontSize: 24,
                paddingRight: 15,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 15,
            };

            const inputStyle: React.CSSProperties = this.props.inputStyle || {};

            if (this.state.isSpeaking) {
                inputStyle.backgroundColor = 'rgba(0, 255, 0, 0.075)';
            }

            return (
                <div style={base}>
                    <Component
                        {...this.props}
                        defaultValue={this.state.value}
                        inputStyle={inputStyle} />
                    <button onClick={this.speak} style={mic}><Microphone width={24} height={24} active={this.state.isSpeaking} /></button>
                </div>
            );
        }
    }
}
