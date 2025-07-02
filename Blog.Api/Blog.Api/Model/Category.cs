using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Api.Model
{
    [Table("Categories")]
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
