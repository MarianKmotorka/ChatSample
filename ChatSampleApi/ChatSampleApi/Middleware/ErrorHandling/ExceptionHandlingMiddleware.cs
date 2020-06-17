using System;
using System.Net;
using System.Threading.Tasks;
using ChatSampleApi.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ChatSampleApi.Middleware.ErrorHandling
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.BadRequest;
            ErrorResponse errorResponse;

            switch (exception)
            {
                case BadRequestException _:
                    errorResponse = ErrorResponseFactory.CreateBadRequestErrorResponse(exception.Message);
                    break;
                case NotFoundException _:
                    code = HttpStatusCode.NotFound;
                    errorResponse = ErrorResponseFactory.CreateNotFoundErrorResponse(exception.Message);
                    break;
                default:
                    _logger.LogError(exception, string.Empty);
                    errorResponse = ErrorResponseFactory.CreateBadRequestErrorResponse("Processing error");
                    break;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            var result = JsonConvert.SerializeObject(errorResponse,
                new JsonSerializerSettings() { ContractResolver = new DefaultContractResolver { NamingStrategy = new CamelCaseNamingStrategy() } });

            return context.Response.WriteAsync(result);
        }
    }

    public static class CustomExceptionHandlingMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomExceptionHandlingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlingMiddleware>();
        }
    }
}
