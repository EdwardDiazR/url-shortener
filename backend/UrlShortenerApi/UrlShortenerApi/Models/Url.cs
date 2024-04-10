using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UrlShortenerApi.Models
{
    [Table("urls")]
    public class Url
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("url_title")]
        public string UrlTitle { get; set; }

        [Required]
        [Column("long_url")]
        public string LongUrl { get; set; }

        [Required]
        [Column("short_url")]
        public string ShortUrl { get; set; }

        [Required]
        [Column("complete_short_url")]
        public string CompleteShortUrl { get; set; }

        [Column("visited_times")]
        public double VisitedTimes { get; set; }
        [Column("last_visited_time")]
        public DateTime ? LastTimeVisited { get; set; }

        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        public int ? UserId { get; set; }

    }
}
