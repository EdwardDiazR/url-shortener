using System.ComponentModel.DataAnnotations;

namespace UrlShortenerApi.Models.DTO
{
    public record CreateUrlDto
    {
        [Required]
        public string Url { get; set; }
        public string Title { get; set; }
        public int? UserId { get; set; }
    }
}
