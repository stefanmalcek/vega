using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Entities;
using vega.Core.Repositories;

namespace vega.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext _context;

        public PhotoRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Photo>> GetPhotosAsync(int vehicleId)
        {
            return await _context.Photos
                .Where(p => p.VehicleId == vehicleId).ToListAsync();
        }
    }
}