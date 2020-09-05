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
            IQueryable<TEntity> query,
            PaginationQuery paginationQuery,
            Expression<Func<TEntity, TResponseDto>> mapper,
            Expression<Func<TResponseDto, TKey>> orderBy,
            CancellationToken cancellationToken,
            bool ascending = true
        )
        {
            var mappedQuery = query.Select(mapper);
            IOrderedQueryable<TResponseDto> orderedQuery = null;

            if (ascending) orderedQuery = mappedQuery.OrderBy(orderBy);
            else orderedQuery = mappedQuery.OrderByDescending(orderBy);

            return await GetPagedResponse(orderedQuery, paginationQuery, cancellationToken);
        }

        public static async Task<PagedResponse<T>> GetPagedResponse<T>(IOrderedQueryable<T> query, PaginationQuery paginationQuery, CancellationToken cancellationToken)
        {
            var result = await query
                .Skip(paginationQuery.Skip)
                .Take(paginationQuery.Count)
                .ToListAsync(cancellationToken);

            var totalCount = await query.CountAsync(cancellationToken);

            return new PagedResponse<T>(result)
            {
                Count = result.Count,
                Data = result,
                Skipped = paginationQuery.Skip,
                TotalCount = totalCount
            };
        }

    }
}
