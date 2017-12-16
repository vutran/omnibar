import * as React from 'react';

function search<T, U>(
  value: T,
  extensions: Array<BareBones.FunctionalExtensions<U>>
): any {}

interface QueryProps<T> {
  children: (x: any) => React.ReactNode;
  extensions: Array<BareBones.FunctionalExtensions<T>>;
  maxResults?: number;
}

interface QueryState {}

// Generic class to be used on the bare-bones version, and the "full package" version
class Query<T> extends React.PureComponent<QueryProps<T>, QueryState> {
  query = (value: string) => {
    search<string, T>(value, this.props.extensions).then((results: any) => {});
  };
  render() {
    return (
      <div>
        {this.props.children({
          onChange: this.query,
        })}
      </div>
    );
  }
}

export default class BareBones<T> extends React.PureComponent<
  BareBones.Props<T>,
  BareBones.State<T>
> {
  state: BareBones.State<T> = {
    results: [],
  };
  render() {
    return (
      <Query
        extensions={this.props.extensions}
        maxResults={this.props.maxResults}
      >
        {({ onChange }) => {
          return (
            <div>
              <input onChange={onChange} />
              {this.props.children({
                results: [],
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

// <BareBones extensions={} onSelect={this.handleSelectedItem}>
//   {({ Item, getItemProps, results }) => {
//     return results.map((resultItem, index) => (
//       <Item
//         {...getItemProps({ index })}
//         item={resultItem}
//         key={resultItem.title}
//       />
//     ));
//   }}
// </BareBones>;
