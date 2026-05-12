export interface ResponseVM<T> {
    success: boolean,
    data: T | null,
    message: string,
    errors: string[] | null
}