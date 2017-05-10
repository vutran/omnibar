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

Import the module and extensions

```jsx
import Omnibar from 'omnibar';
import FooExtension from './FooExtension';
import BarExtension from './BarExtension';
```

Render it in your component

```jsx
class MyComponent extends React.Component {
    render() {
        return (
            <Omnibar
                placeholder="Enter keyword"
                extensions={[
                    FooExtension,
                    BarExtension,
                ]} />
        );
    }
}
```

## Extending your Omnibar

### Simple Extension

The most simplest extension should return a list of items.

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

Extensions can also return a Promise that resolves a list of items.

```json
{
    "items": [
        { "name": "foo", "website": "foo.com" },
        { "name": "bar", "website": "bar.com" },
    ]
}
```

```jsx
export default function SearchExtension(query) {
    return fetch(`https://myapi.com/?q=${query}`)
        .then(resp => resp.items.map(item => ({
            title: item.name,
            url: item.website,
        });
```

### Custom Renderers

You can also specify a custom result item rendering function to display extra data in your listings.

```
class MyComponent extends React.Component {
    resultRenderer = ({ item }) => {
        return (
            <div>
                <img src={item.owner.avatar_url} width={30} height={30} />
                <a href={item.html_url}>{item.full_name}</a>
            </div>
        );
    }

    render() {
        return (
            <Omnibar
                placeholder="Search GitHub"
                extensions={[GitHubExtension]}
                resultRenderer={this.resultRenderer} />
        );
    }
}
```

## License

MIT © [Vu Tran](https://github.com/vutran/)
