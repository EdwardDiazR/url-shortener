using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UrlShortenerApi.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string UserProfileLink { get; set; }
        public string password { get; set; }
        public string DisplayName { get; set; }
        public char Gender { get; set; }
        public string Email { get; set; }
        public string ProfilePictureUrl { get; set; }
        public double ProfileVisitCounter { get; set; }

    }
}
