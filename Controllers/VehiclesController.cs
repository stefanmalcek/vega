using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Entities;
using vega.Core.Models;
using vega.Core.Repositories;

namespace vega.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<VehicleResource>> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            _repository.AddVehicle(vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicleAsync(vehicle.Id);
            var result = _mapper.Map<VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<VehicleResource>> UpdateVehicle(int id, [FromBody]SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _repository.GetVehicleAsync(id);
            if (vehicle == null)
                return NotFound();

            _mapper.Map(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicleAsync(id);
            var result = _mapper.Map<VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _repository.GetVehicleAsync(id, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            _repository.DeleteVehicle(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleResource>> GetVehicle(int id)
        {
            var vehicle = await _repository.GetVehicleAsync(id);
            if (vehicle == null)
                return NotFound();

            var vehicleResource = _mapper.Map<VehicleResource>(vehicle);
            return Ok(vehicleResource);
        }

        [HttpGet]
        public async Task<ActionResult<QueryResultResource<VehicleResource>>> GetVehicles(VehicleQueryResource queryResource)
        {
            var queryObj = _mapper.Map<VehicleQueryResource, VehicleQuery>(queryResource);
            var queryResult = await _repository.GetVehiclesAsync(queryObj);

            return Ok(_mapper.Map<QueryResultResource<VehicleResource>>(queryResult));
        }
    }
}