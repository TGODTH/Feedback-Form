using System.ComponentModel.DataAnnotations;

namespace feedback_api.Models
{
    public class FeedbackDto
    {
        [Key]
        public byte QG { get; set; }
        [Key]
        public byte QId { get; set; }
        public byte L1 { get; set; }
        public byte L2 { get; set; }
        public byte L3 { get; set; }
        public byte L4 { get; set; }
        public byte L5 { get; set; }
    }
}
