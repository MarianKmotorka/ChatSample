using System.Collections.Generic;
using System.Linq;

namespace ChatSampleApi.Pagination
{
    public class PagedResponse<T>
    {
        public PagedResponse(IEnumerable<T> data)
        {
            Data = data.ToList();
        }

        public List<T> Data { get; set; }

        public int Skipped { get; set; }

        public int Count { get; set; }

        public int TotalCount { get; set; }

        public bool HasMore => Skipped + Count < TotalCount;
    }
}
