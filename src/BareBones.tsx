import * as React from 'react';
import search from './search';

interface QueryProps<T> {
  children: (x: any) => React.ReactNode;
  extensions: Array<BareBones.FunctionalExtensions<T>>;
  maxResults?: number;
}

interface QueryState<T> {
  results: Array<BareBones.ResultItem>;
}

// Generic class to be used on the bare-bones version, and the "full package" version
class Query<T> extends React.PureComponent<QueryProps<T>, QueryState<T>> {
  static defaultProps: QueryProps<T> = {
    maxResults: 20,
  };
  state: QueryState<T> = {
    results: [],
  };
  query = (value: string) => {
    if (this.props.extensions.length > 0) {
      search<T>(value, this.props.extensions).then(results => {
        this.setState({
          results:
            this.props.maxResults > 0
              ? results.slice(0, this.props.maxResults)
              : results,
          displayResults: results.length > 0,
        });
      });
    }
  };
  render() {
    return (
      <div>
        {this.props.children({
          onChange: this.query,
          results: this.state.results,
        })}
      </div>
    );
  }
}

export default class BareBones<T> extends React.PureComponent<
  BareBones.Props<T>,
  BareBones.State<T>
> {
  render() {
    return (
      <Query
        extensions={this.props.extensions}
        maxResults={this.props.maxResults}
      >
        {({ onChange, results }) => {
          return (
            <div>
              <input
                onChange={e => {
                  e.preventDefault();
                  onChange(e.target.value);
                }}
              />
              {this.props.children({
                results,
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}
