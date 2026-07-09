export function evaluateNulls<T>(data: T): NonNullable<T>  {
    if(data)
        return data;
    throw new Error("Ocurrio un error, por favor intenta de nuevo mas tarde");
}