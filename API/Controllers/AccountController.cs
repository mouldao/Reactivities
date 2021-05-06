using System.Security.Claims;
using System.Threading.Tasks;
using _API.DTOs;
using _API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _API.Controllers
{   [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
         private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager,
       
        SignInManager<AppUser> signInManager, TokenService tokenService )
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
        var user = await _userManager.FindByEmailAsync(loginDTO.Email);

        if (user == null) return Unauthorized();

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

        if (result.Succeeded)
        {
            return   CreateUserObject(user);
        }

        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
    {
        if ( await _userManager.Users.AnyAsync(x=> x.Email == registerDTO.Email))
        {
                // return BadRequest("Email taken");
                // ModelState.AddModelError("email", "Email taken");
                // return BadRequest(ModelState);
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
        if ( await _userManager.Users.AnyAsync(x=> x.UserName == registerDTO.UserName))
        {
               ModelState.AddModelError("email", "Username taken");
                   return ValidationProblem();
        }

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

        if (result.Succeeded)
        {
            return CreateUserObject(user);
        }
        return BadRequest("Problem registering account");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
          return   CreateUserObject(user);

    }

    private UserDTO CreateUserObject(AppUser user)
    {
         return new UserDTO
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
    }
}
}