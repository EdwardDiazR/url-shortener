using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO;
using UrlShortenerApi.Models.DTO.Url;

namespace UrlShortenerApi.Interfaces
{
    public interface IShortenerService
    {
        public List<Url> GetUrlsByUsername(string Username);
        public Url GetUrlDetailsById(int UrlId,int UserId);
        public UrlApiResponseDto GetFullUrl(string shortUrl);
        public Url CreateShortUrl(CreateUrlDto UrlDto);
        public void DeleteUrlById(int UrlId, int UserId);
        public string GenerateUserProfileLink(string username);
    }
}
