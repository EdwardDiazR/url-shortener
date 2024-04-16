using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UrlShortenerApi.Interfaces;
using UrlShortenerApi.Models;

namespace UrlShortenerApi.Services
{
    public class JWTService : IJwtService
    {
        private IConfiguration _configuration;
        public JWTService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateJWT(int UserId, string username)
        {
            JWT jwt = _configuration.GetSection("Jwt").Get<JWT>();

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
            var signingCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name,username),
                new Claim("userId", UserId.ToString()),
                new Claim("username",username)
          };

            var miToken = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddDays(1),
                issuer: jwt.Issuer,
                audience: jwt.Audience
                );
            string final = new JwtSecurityTokenHandler().WriteToken(miToken);
            Console.WriteLine(final);
            return final;
        }
    }
}
