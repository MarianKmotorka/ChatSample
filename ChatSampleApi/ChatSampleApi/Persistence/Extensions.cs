using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ChatSampleApi.Persistence
{
    public static class Extensions
    {
        public static void RemovePluralizingTableNameConvention(this ModelBuilder modelBuilder)
        {
            foreach (IMutableEntityType entity in modelBuilder.Model.GetEntityTypes())
                entity.SetTableName(entity.DisplayName());
        }

        public static async Task<TEntity> SingleOrNotFoundAsync<TEntity>(this IQueryable<TEntity> query, Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
        {
            var entity = await query.SingleOrDefaultAsync(predicate, cancellationToken);
            return entity ?? throw new NotFoundException($"{typeof(TEntity).Name} not found.");
        }

        public static async Task<TEntity> SingleOrNotFoundAsync<TEntity>(this IQueryable<TEntity> query, Expression<Func<TEntity, bool>> predicate)
        {
            return await SingleOrNotFoundAsync(query, predicate, CancellationToken.None);
        }
    }
}
