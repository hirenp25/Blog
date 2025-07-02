using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Api.Model
{
    [Table("Blog")]
    public class Blogs
    {
        public int id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public bool IsFeatured { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
