using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UrlShortenerApi.Interfaces;
using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO.Auth;
using UrlShortenerApi.Models.DTO.User;

namespace UrlShortenerApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService) { _authService = authService; }

        [HttpPost("login")]
        public ActionResult Login(LoginDto loginDto)
        {
            try
            {


                return Ok(_authService.Login(loginDto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("is-user")]
        public ActionResult CheckIfIsUser(string parameter) {
            try
            {
                return Ok(_authService?.CheckIfIsUser(parameter));

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register")]
        public ActionResult<User> RegisterUser(RegisterUserDto registerUserDto)
        {
            try
            {
                User user = _authService.RegisteUser(registerUserDto); 
                return Ok(user);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }


        [HttpGet("check-session")]
        public ActionResult CheckSession(string username, int UserId)
        {
            try
            {
                return Ok(_authService.CheckIfProfileIsLogged(UserId, username));
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to check {ex.Message}");
            }
        }
    }
}
