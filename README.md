# Omnibar

> Extensible React omnibar to perform actions based on a given query.

## Install

```bash
$ npm i -S omnibar
```

or with Yarn:

```bash
$ yarn add omnibar
```

## Usage

Import the module and your extensions

```jsx
import Omnibar from 'omnibar';
import FooExtension from './FooExtension';
import BarExtension from './BarExtension';
```

Render it in your component

```jsx
export default MyComponent() {
    return (
        <Omnibar
            placeholder="Enter keyword"
            extensions={[
                FooExtension,
                BarExtension,
            ]} />
    );
}
```

## Extending your Omnibar

### Simple Extension

The example below returns a simple list of items. `<Omnibar />` will
render an anchor item with the default result item schema.

```typescript
{
    title: string;
    url: string;
}
```

```jsx
export default function FooExtension() {
    return [
        { title: 'Dropbox', url: 'https://dropbox.com' },
        { title: 'GitHub', url: 'https://google.com' },
        { title: 'Facebook', url: 'https://facebook.com' },
    ];
}
```

### Promise-based Results

Extensions can also return a `Promise` that resolves a list of items.

For example, given an API endpoint `https://myapi.com/` that takes
a request parameter `q`, it will return a JSON response like so:

```json
{
    "items": [
        { "name": "foo", "website": "foo.com" },
        { "name": "bar", "website": "bar.com" },
    ]
}
```

Your extension can return a `Promise` that resolves into a list of items.
The example below makes a request to our fake API endpoint
and maps it's data schema with the default anchor schema.

```jsx
export default function SearchExtension(query) {
    return fetch(`https://myapi.com/?q=${query}`)
        .then(resp => resp.items.map(item => ({
            title: item.name,
            url: item.website,
        });
```

### Custom Renderers

If you would like to display additional data in your result listings such as a thumbnail, you can
create pass a rendering function to the `resultRenderer` prop in your `<Omnibar />` instance.

The example below changes our result item schema to be in the shape of:

```typescript
{
    owner: {
        avatar_url: string;
    };
    html_url: string;
    full_name: string;
}
```

```
function resultRenderer({ item }) => {
    return (
        <div>
            <img src={item.owner.avatar_url} width={30} height={30} />
            <a href={item.html_url}>{item.full_name}</a>
        </div>
    );
}

class MyComponent extends React.Component {
    render() {
        return (
            <Omnibar
                placeholder="Search GitHub"
                extensions={[GitHubExtension]}
                resultRenderer={resultRenderer} />
        );
    }
}
```

## Props API

| Prop | Type | Required? | Description |
| :-- | :-- | :-- | :-- |
| `extensions` | `Array<Extension>` | * | An array of extensions to be loaded. |
| `placeholder` | `string` | | Input placeholder |
| `maxResults` | `number` | | The maximum amount of results to display overall. |
| `maxViewableResults` | `number` | | The maximum amount of results to display in the viewable container (before scrolling). |
| `width` | `number` | | The width of the omnibar |
| `height` | `number` | | The height of the omnibar |
| `inputStyle` | `object` | | Style object override for the input element |
| `rowHeight` | `number` | | The height for each result row item |
| `rowStyle` | `object` | | Style object override for each result row item |
| `resultStyle` | `object` | | Style object override for the result container |
| `resultRenderer` | `Function` | | Rendering function for each result item. Arguments: `{ item }` |
| `onAction` | `Function` | | Override the defaut action callback when an item is executed. Arguments: `item` |

## Contributing

1. Clone the repository.
2. Switch to the cloned directory and run `npm install` or `yarn`
3. Run `npm start`.

## License

MIT © [Vu Tran](https://github.com/vutran/)
