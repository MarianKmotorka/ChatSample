using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using ChatSampleApi.Options;
using CloudinaryDotNet;
using MediatR;

namespace ChatSampleApi.Features.Auth
{
    public class GetCloudinarySignature
    {
        public class Query : IRequest<Response>
        {
            public string Eager { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly CloudinaryOptions _cloudinaryOptions;

            public Handler(CloudinaryOptions cloudinaryOptions)
            {
                _cloudinaryOptions = cloudinaryOptions;
            }

            public Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var timestamp = Stopwatch.GetTimestamp().ToString();

                var cloudinary = new Cloudinary(
                    new Account(
                        _cloudinaryOptions.CloudName,
                        _cloudinaryOptions.ApiKey,
                        _cloudinaryOptions.ApiSecret
                        )
                    );

                var parameters = new Dictionary<string, object>() { ["timestamp"] = timestamp };

                if (!string.IsNullOrEmpty(request.Eager))
                    parameters.Add("eager", request.Eager);

                var signature = cloudinary.Api.SignParameters(parameters);

                return Task.FromResult(new Response
                {
                    TimeStamp = timestamp,
                    Signature = signature
                });

            }
        }

        public class Response
        {
            public string TimeStamp { get; set; }

            public string Signature { get; set; }
        }
    }
}
