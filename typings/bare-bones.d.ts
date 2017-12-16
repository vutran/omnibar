declare namespace BareBones {
  type ListResult<T> = Array<T>;
  type ResolvedResults<T> = Promise<ListResult<T>>;
  type Results<T> = ListResult<T> | ResolvedResults<T>;

  interface ResultItem {
    title: string;
    description: string;
  }

  type FunctionalExtensions<T> = (query: string) => Results<T>;

  interface Props<T> {
    children: <T>(e: T) => React.ReactNode;
    extensions: Array<BareBones.FunctionalExtensions<T>>;
    maxResults?: number;
  }

  interface State<T> {
    results: ResultItem[];
  }
}

declare module 'bareBones' {
  export default class BareBones<T> extends React.Component<
    BareBones.Props<T>,
    BareBones.State<T>
  > {}
}
