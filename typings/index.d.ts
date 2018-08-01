declare namespace Omnibar {
  // Result set
  type ListResult<T> = Array<T>;
  type ResolvedResults<T> = Promise<ListResult<T>>;
  type Results<T> = ListResult<T> | ResolvedResults<T>;

  // Extensions
  type FunctionalExtension<T> = (query: string) => Results<T>;
  type Extension<T> = FunctionalExtension<T>;

  type MouseEvent = (evt: any) => void;

  // Renderers
  type ResultRenderer<T> = (
    {
      item,
      isSelected,
      isHighlighted,
    }: {
      item: T;
      isSelected: boolean;
      isHighlighted: boolean;
    } & React.HTMLAttributes<HTMLElement>
  ) => JSX.Element;

  interface Props<T> {
    // results renderer function
    children?: ResultRenderer<T>;
    // alias of children
    render?: ResultRenderer<T>;
    // optional input bar style override
    style?: React.CSSProperties;
    // list of extensions
    extensions: Array<Omnibar.Extension<T>>;
    // max items
    maxResults?: number;
    // max items to display in view
    maxViewableResults?: number;
    // optional input placeholder text
    placeholder?: string;
    // optional result list style override
    resultStyle?: React.CSSProperties;
    // optional style on the root element
    rootStyle?: React.CSSProperties;
    // triggered when a query is made
    onQuery?: <T>(items: Array<T>) => void;
    // optional action override
    onAction?: <T>(item: T) => void;
    // optional input delay override
    inputDelay?: number;
    // optional default value
    defaultValue?: string;
    // optionally make the Omnibar autoFocus
    autoFocus?: boolean;
  }

  interface State<T> {
    // list of matching results
    results: Array<T>;
    // current selected index (applies action upon key event)
    selectedIndex: number;
    // current mouse hovered index (applies action click event)
    hoveredIndex: number;
    // display results?
    displayResults: boolean;
  }
}

declare module 'omnibar' {
  export default class Omnibar<T> extends React.Component<
    Omnibar.Props<T>,
    Omnibar.State<T>
  > {}
  export function command<T>(
    extension: Omnibar.Extension<T>,
    command: string
  ): Omnibar.Extension<T>;
  export function withVoice<T>(Component: T): T;
}
