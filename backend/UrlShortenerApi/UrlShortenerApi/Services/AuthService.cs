using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using UrlShortenerApi.Data;
using UrlShortenerApi.Interfaces;
using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO.Auth;
using UrlShortenerApi.Models.DTO.User;

namespace UrlShortenerApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _db;
        private IShortenerService _shortenerService;
        public AuthService(ApplicationDbContext db, IShortenerService shortenerService)
        {
            _db = db;
            _shortenerService = shortenerService;
        }
        public User Login(LoginDto loginDto)
        {
            string HashedPassword = HashPassword(loginDto.password);
            User? user = _db.User.Where(user => user.Username == loginDto.username && user.password == HashedPassword).FirstOrDefault();

            if (user is null)
            {
                throw new Exception("Ha ocurrido un error en la validacion");
            }

            return user;
        }

        public bool CheckIfIsUser(string parameter)
        {
            bool urlDoesntExists = _db.Url.Any(u => u.UrlHash == parameter);
            return _db.User.Any(user => user.Username == parameter && !urlDoesntExists);

        }

        public User RegisteUser(RegisterUserDto userDto)
        {
            if (!IsUsenameAvailable(userDto.username))
            {
                throw new Exception($"{userDto.username} ya esta siendo utilizado por otro usuario, intenta con uno diferente");
            }

            if(userDto.Password != userDto.ConfirmedPassword)
            {
                throw new Exception("Las contraseñas no coinciden");
            }

            User user = new User()
            {
                Email = userDto.Email,
                password = HashPassword(userDto.Password),
                Username = userDto.username,
                ProfileVisitCounter = 0,
                DisplayName = userDto.username,
                UserProfileLink = _shortenerService.GenerateUserProfileLink(userDto.username),
                Gender = userDto.Gender,
                ProfilePictureUrl = "",
                ProfileDescription = " "

            };


            _db.User.Add(user);
            _db.SaveChanges();


            return user;
            //TODO: Create a new user
            //Hash the password before save to db
        }



        public bool IsUsenameAvailable(string username)
        {
            return !_db.User.Any(user => user.Username == username);

        }
        public void Logout() { }

        public bool CheckIfProfileIsLogged(int userId, string username)
        {
            return _db.User.Any(user => user.UserId == userId && user.Username == username);
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                // Convert the password string to a byte array
                byte[] bytes = Encoding.UTF8.GetBytes(password);

                // Compute the hash
                byte[] hash = sha256.ComputeHash(bytes);

                // Convert the byte array to a hexadecimal string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    builder.Append(hash[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        private bool ComparePassword(string inputPassword, string HashedPassword)
        {
            return HashedPassword == HashPassword(inputPassword);
        }



    }
}
