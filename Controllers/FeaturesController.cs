using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Core.Repositories;


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
        public async Task<ActionResult<IEnumerable<KeyValuePairResource>>> GetFeatures()
        {
            var features = await _repository.GetFeaturesAsync();
            return Ok(_mapper.Map<IEnumerable<KeyValuePairResource>>(features));
        }
    }
}