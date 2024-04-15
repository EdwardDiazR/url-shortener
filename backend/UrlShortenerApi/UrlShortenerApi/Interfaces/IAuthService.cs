using UrlShortenerApi.Models.DTO.Auth;
using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO.User;

namespace UrlShortenerApi.Interfaces
{
    public interface IAuthService
    {
        public User Login(LoginDto loginDto);
        public User RegisteUser(RegisterUserDto userDto);
        public bool CheckIfIsUser(string parameter);

        public bool CheckIfProfileIsLogged(int userId, string username);
        
    }
}
