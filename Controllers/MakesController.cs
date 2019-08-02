using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Core.Repositories;
using vega.Dtos;

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
        public async Task<ActionResult<IEnumerable<MakeDto>>> GetMakes()
        {
            var makes = await _repository.GetMakesAsync();
            return Ok(_mapper.Map<IEnumerable<MakeDto>>(makes));
        }
    }
}