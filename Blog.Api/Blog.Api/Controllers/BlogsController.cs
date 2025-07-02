using Blog.Api.Data;
using Blog.Api.Model;
using Blog.Api.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IRepository<Blogs> _blogrepository;

        public BlogsController(IRepository<Blogs> blogrepository)
        {
            _blogrepository = blogrepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetBlogsList()
        {
            var blogs = await _blogrepository.GetAll();
            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetBlog([FromRoute] int id)
        {
            var blog = await _blogrepository.GetById(id);
            return Ok(blog);
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddBlog([FromBody] BlogDto model)
        {
            var blog = new Blogs()
            {
                CategoryId = model.CategoryId,
                Title = model.Title,
                Description = model.Description,
                Content = model.Content,
                Image = model.Image,
                IsFeatured = model.IsFeatured
            };
            await _blogrepository.AddAsync(blog);
            await _blogrepository.SaveChangesAsync();
            return Ok(model);
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBlog([FromRoute] int id, [FromBody] BlogDto model)
        {
            var blog = await _blogrepository.GetById(id);
            blog.Description = model.Description;
            blog.Title = model.Title;
            blog.Content = model.Content;
            blog.IsFeatured = model.IsFeatured;
            blog.Image = model.Image;
            _blogrepository.Update(blog);
            await _blogrepository.SaveChangesAsync();
            return Ok(model);

        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBlog([FromRoute] int id)
        {
            await _blogrepository.DeleteAsync(id);
            await _blogrepository.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("featured")]
        public async Task<ActionResult> GetBlogsFeatureList()
        {
            var blogs = await _blogrepository.GetAll(x=>x.IsFeatured==true);
            return Ok(blogs);
        }
    }
}
