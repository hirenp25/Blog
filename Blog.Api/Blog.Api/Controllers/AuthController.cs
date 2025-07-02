using Blog.Api.Data;
using Blog.Api.Dto;
using Blog.Api.Model;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IRepository<User> _repository;

        public AuthController(IRepository<User> repository)
        {
            _repository = repository;
            // Initialize any required services or repositories here
        }
        [HttpPost]
        public async Task<IResult> Login([FromBody] LoginDto model)
        {
            var User = (await _repository.GetAll(x => x.Email == model.Email)).FirstOrDefault();
            if (User is not null && User.Password == model.Password)
            {
                var claimsPrinciple = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, model.Email) },
                    BearerTokenDefaults.AuthenticationScheme
                    )
                 );
                return Results.SignIn(claimsPrinciple);
            }
            else
            {
                return Results.BadRequest();
            }
        }
    }
}
