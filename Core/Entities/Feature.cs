using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace vega.Core.Entities
{
    public class Feature
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public ICollection<VehicleFeature> Vehicles { get; set; }

        public Feature()
        {
            Vehicles = new Collection<VehicleFeature>();
        }
    }
}