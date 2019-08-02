using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Core.Repositories;
using vega.Dtos;


namespace vega.Controllers
{
    [Route("api/[controller]")]
    public class FeaturesController : Controller
    {
        private readonly IFeatureRepository _repository;
        private readonly IMapper _mapper;

        public FeaturesController(IFeatureRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KeyValuePairDto>>> GetFeatures()
        {
            var features = await _repository.GetFeaturesAsync();
            return Ok(_mapper.Map<IEnumerable<KeyValuePairDto>>(features));
        }
    }
}