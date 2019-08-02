using System.Threading.Tasks;
using vega.Core.Entities;
using vega.Core.Models;

namespace vega.Core.Repositories
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);
        void AddVehicle(Vehicle vehicle);
        void DeleteVehicle(Vehicle vehicle);
        Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery queryObj);
    }
}