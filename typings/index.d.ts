declare namespace Omnibar {
    // Result set
    type ListResult<T> = Array<T>;
    type ResolvedResults<T> = Promise<ListResult<T>>;
    type Results<T> = ListResult<T> | ResolvedResults<T>;

    // Extensions
    type FunctionalExtension<T> = (query: string) => Results<T>;
    type Extension<T> = FunctionalExtension<T>;
}
