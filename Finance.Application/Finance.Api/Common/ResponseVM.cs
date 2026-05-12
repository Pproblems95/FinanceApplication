namespace Finance.Api.Common
{
    public record ResponseVM<T>(
        bool Success,
        T? Data,
        string Message,
        List<string>? Errors = null
    ) {
        public static ResponseVM<T> Ok(T data, string message = "Success")
            => new ResponseVM<T>(true, data, message);
        public static ResponseVM<T> Failure(string message = "Failure", List<string>? errors = null)
            => new ResponseVM<T>(false, default, message, errors);
    }
}
