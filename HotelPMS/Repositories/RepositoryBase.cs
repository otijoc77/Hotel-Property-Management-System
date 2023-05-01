using HotelPMS.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace HotelPMS.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected Context Context { get; set; }

        public RepositoryBase(Context context)
        {
            Context = context;
            Context.Database.EnsureCreated();
        }

        public async Task<T> GetAsync(int id)
        {
            return await Context.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public async Task<T> AddAsync(T item)
        {
            Context.Set<T>().Add(item);
            await Context.SaveChangesAsync();
            return item;
        }

        public async Task<T> DeleteAsync(int id)
        {
            var entity = await Context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            Context.Set<T>().Remove(entity);
            await Context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> UpdateAsync(T item)
        {
            Context.Set<T>().Update(item);
            await Context.SaveChangesAsync();
            return item;
        }

        public async Task<List<T>> GetByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await Context.Set<T>().Where(expression).ToListAsync();
        }
    }
}
