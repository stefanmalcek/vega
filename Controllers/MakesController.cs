using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Core.Repositories;

namespace vega.Controllers
{
    [Route("api/[controller]")]
    public class MakesController : Controller
    {
        private readonly IMakeRepository _repository;
        private readonly IMapper _mapper;

        public MakesController(IMakeRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MakeResource>>> GetMakes()
        {
            var makes = await _repository.GetMakesAsync();
            return Ok(_mapper.Map<IEnumerable<MakeResource>>(makes));
        }
    }
}