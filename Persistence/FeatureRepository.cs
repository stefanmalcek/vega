using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Entities;
using vega.Core.Repositories;

namespace vega.Persistence
{
    public class FeatureRepository : IFeatureRepository
    {
        private readonly VegaDbContext _context;

        public FeatureRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feature>> GetFeaturesAsync()
        {
            return await _context.Features.ToListAsync();
        }
    }
}