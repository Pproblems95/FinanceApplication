export interface CleanControllerResponse<T> {
    data: T,
    hasNextPage: boolean,
    nextCursor: string
}