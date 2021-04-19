using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
namespace _API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class BaseApiConroller : ControllerBase
    {
        private IMediator _mediator;
        
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}