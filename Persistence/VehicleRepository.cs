using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Entities;
using vega.Core.Models;
using vega.Core.Repositories;
using vega.Extensions;

namespace vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }

        public void AddVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }

        public void DeleteVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }

        public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Vehicles.FindAsync(id);

            return await _context.Vehicles
                    .Include(v => v.Features).ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model).ThenInclude(m => m.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();
            var query = _context.Vehicles
                     .Include(v => v.Model).ThenInclude(m => m.Make)
                     .AsQueryable();

            query = query.ApplyFiltering(queryObj);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.Contact.Name
            };
            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }
    }
}