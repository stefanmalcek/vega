using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Entities;

namespace vega.Core.Repositories
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotosAsync(int vehicleId);
    }
}