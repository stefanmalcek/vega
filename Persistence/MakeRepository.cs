using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Entities;
using vega.Core.Repositories;

namespace vega.Persistence
{
    public class MakeRepository : IMakeRepository
    {
        private readonly VegaDbContext _context;

        public MakeRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Make>> GetMakesAsync()
        {
            return await _context.Makes.Include(m => m.Models).ToListAsync();
        }
    }
}
