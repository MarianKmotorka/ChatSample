using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ChatSampleApi.Pagination
{
    public class PaginationProcessor
    {
        public static async Task<PagedResponse<TResponseDto>> GetPagedResponse<TResponseDto, TEntity, TKey>
        (
            IQueryable<TEntity> data,
            PaginationQuery query,
            Expression<Func<TEntity, TResponseDto>> mapper,
            Expression<Func<TResponseDto, TKey>> orderBy,
            bool ascending,
            CancellationToken cancellationToken
        )
        {
            var resultQuery = data.Select(mapper);

            if (ascending) resultQuery = resultQuery.OrderBy(orderBy);
            else resultQuery = resultQuery.OrderByDescending(orderBy);

            var result = await resultQuery
                .Skip(query.Skip)
                .Take(query.Count)
                .ToListAsync(cancellationToken);

            var totalCount = await data.CountAsync(cancellationToken);

            return new PagedResponse<TResponseDto>(result)
            {
                Count = result.Count,
                Data = result,
                Skipped = query.Skip,
                TotalCount = totalCount
            };
        }
    }
}
