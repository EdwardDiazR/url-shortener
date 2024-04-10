using UrlShortenerApi.Models;
using UrlShortenerApi.Models.DTO;

namespace UrlShortenerApi.Interfaces
{
    public interface IShortenerService
    {
        public List<Url> GetUrlsByUsername(string Username);
        public Url GetUrlDetailsById(int UrlId,int UserId);
        public string GetFullUrl(string shortUrl);
        public Url CreateShortUrl(CreateUrlDto UrlDto);
        public void DeleteUrlById(int UrlId, int UserId);
    }
}
