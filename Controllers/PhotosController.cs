using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;
using vega.Core.Repositories;

namespace vega.Controllers
{
    [Route("api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment _host;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IPhotoRepository _photoRepository;
        private readonly IMapper _mapper;
        private readonly PhotoSettings _photoSettings;
        private readonly IPhotoService _photoService;

        public PhotosController(IHostingEnvironment host, IVehicleRepository vehicleRepository,
            IPhotoRepository photoRepository, IMapper mapper, IOptions<PhotoSettings> options,
            IPhotoService photoService)
        {
            _photoService = photoService;
            _host = host;
            _vehicleRepository = vehicleRepository;
            _photoRepository = photoRepository;
            _mapper = mapper;
            _photoSettings = options.Value;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoResource>>> GetPhotos(int vehicleId)
        {
            var photos = await _photoRepository.GetPhotosAsync(vehicleId);

            return Ok(_mapper.Map<IEnumerable<PhotoResource>>(photos));
        }

        [HttpPost]
        public async Task<ActionResult<PhotoResource>> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await _vehicleRepository.GetVehicleAsync(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > _photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!_photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type");

            var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            var photo = await _photoService.UploadPhotoAsync(vehicle, file, uploadsFolderPath);

            return Ok(_mapper.Map<PhotoResource>(photo));
        }
    }
}