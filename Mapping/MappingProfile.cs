using System.Linq;
using AutoMapper;
using vega.Core.Entities;
using vega.Core.Models;
using vega.Dtos;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Photo, PhotoDto>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultDto<>));
            CreateMap<Make, MakeDto>();
            CreateMap<Make, KeyValuePairDto>();
            CreateMap<Model, KeyValuePairDto>();
            CreateMap<Feature, KeyValuePairDto>();
            CreateMap<Vehicle, SaveVehicleDto>()
            .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle, VehicleDto>()
             .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
             .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => v.Contact))
             .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf =>
             new KeyValuePairDto { Id = vf.FeatureId, Name = vf.Feature.Name })));

            // API Resource to Domain
            CreateMap<VehicleQueryDto, VehicleQuery>();

            CreateMap<SaveVehicleDto, Vehicle>()
            .ForMember(v => v.Id, opt => opt.Ignore())
            .ForMember(v => v.Features, opt => opt.Ignore())
            .AfterMap((vr, v) =>
            {
                // Remove unselected features
                var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList();
                foreach (var feature in removedFeatures)
                    v.Features.Remove(feature);

                // Add new features
                var addedFeatures = vr.Features.Where(id => v.Features.All(f => f.FeatureId != id))
                    .Select(id => new VehicleFeature { FeatureId = id }).ToList();
                foreach (var feature in addedFeatures)
                    v.Features.Add(feature);

            });
            CreateMap<ContactDto, Contact>().ReverseMap();
        }
    }
}