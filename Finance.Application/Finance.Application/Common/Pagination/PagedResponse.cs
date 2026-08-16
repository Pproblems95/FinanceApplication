namespace Finance.Application.Common
{
    public class PagedResponse<T>
    {
        public T Items { get; init; }
        public int PageSize { get; init; }
        public string? NextCursor { get; init; } = string.Empty;
        public bool HasNextPage => NextCursor != string.Empty;

        public PagedResponse (T data, int pageSize, string? nextCursor)
        {
            Items = data;
            PageSize = pageSize;
            NextCursor = nextCursor;
        }

        public static PagedResponse<T> Create(T data, int pagesize, string? nextCursor)
        {
            return new PagedResponse<T>(data, pagesize, nextCursor);
        }
    }
}
