using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega.Core.Entities;

namespace vega.Core
{
    public interface IPhotoService
    {
         Task<Photo> UploadPhotoAsync(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }
}