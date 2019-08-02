using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Dtos
{
    public class MakeDto : KeyValuePairDto
    {
        public ICollection<KeyValuePairDto> Models { get; set; }

        public MakeDto()
        {
            Models = new Collection<KeyValuePairDto>();
        }
    }
}