import * as React from 'react';
import { DEFAULT_HEIGHT } from './constants';
import Microphone from './Microphone';

/**
 * Adds voice commands to your Omnibar
 */
export function withVoice(Component: any): React.ComponentClass<any> {
  interface VoiceProps extends Omnibar.Props<any> {}
  interface VoiceState {
    value: string;
    isSpeaking: boolean;
  }

  return class VoiceOmnibar extends React.Component<VoiceProps, VoiceState> {
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
        };
        this.recognition = recognition;
      }
    }

    speak = () => {
      this.recognition.lang = 'en-US';
      this.setState({ isSpeaking: true });
      this.recognition.start();
    };

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
        lineHeight: `${DEFAULT_HEIGHT}px`,
        fontSize: 24,
        paddingRight: 15,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 15,
      };

      const style: React.CSSProperties = this.props.style || {};

      if (this.state.isSpeaking) {
        style.backgroundColor = 'rgba(0, 255, 0, 0.075)';
      }

      return (
        <div style={base}>
          <Component
            {...this.props}
            defaultValue={this.state.value}
            style={style}
          />
          <button onClick={this.speak} style={mic}>
            <Microphone width={24} height={24} active={this.state.isSpeaking} />
          </button>
        </div>
      );
    }
  };
}
