using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Entities;

namespace vega.Core.Repositories
{
    public interface IFeatureRepository
    {
        Task<IEnumerable<Feature>> GetFeaturesAsync();
    }
}
