import * as React from 'react';

export default class BareBones<T> extends React.PureComponent<
  BareBones.Props<T>,
  BareBones.State<T>
> {
  state: BareBones.State<T> = {
    results: [],
  };
  render() {
    return (
      <div>
        {this.props.children({
          results: [],
        })}
      </div>
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
