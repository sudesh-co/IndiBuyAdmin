using EcomAdmin.Server.Service;
using EcommerceAdmin.Server.Controllers;
using EcommerceAdmin.Server.DbHelpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController :BaseController
    {
        HomeService _service = new HomeService();
        FileService _file = new FileService();

        [HttpPost("SaveCarouselItem")]
        public async Task<IActionResult> SaveCarouselItem()
        {
            try
            {
                var form = await Request.ReadFormAsync();

                var data = new Dictionary<string, object>
                {
                    ["Id"] = form["Id"].ToString(),  
                    ["Title"] = form["Title"].ToString(),
                    ["Subtitle"] = form["Subtitle"].ToString(),
                    ["CtaText"] = form["CtaText"].ToString(),
                    ["CtaLink"] = form["CtaLink"].ToString(),

                    ["ProductId"] = string.IsNullOrWhiteSpace(form["ProductId"]) ? DBNull.Value : Convert.ToInt32(form["ProductId"]),
                    ["CategoryId"] = string.IsNullOrWhiteSpace(form["CategoryId"]) ? DBNull.Value : Convert.ToInt32(form["CategoryId"]),
                    ["SubCategoryId"] = string.IsNullOrWhiteSpace(form["SubCategoryId"]) ? DBNull.Value : Convert.ToInt32(form["SubCategoryId"]),

                    ["StartDate"] = Convert.ToDateTime(form["StartDate"].ToString()),
                    ["EndDate"] = Convert.ToDateTime(form["EndDate"].ToString()),
                    ["Priority"] = Convert.ToInt32(form["Priority"].ToString()),
                    ["Status"] = form["Status"].ToString(),

                    ["ImageMetaList"] = string.Join(",", form.Files.Select(f => f.FileName))
                };

                var files = form.Files;

                DataTable result = await _service.RegisterCarouselItem(data);

                if (result.Rows.Count > 0)
                {
                    var itemId = result.Rows[0]["Id"].ToString();
                    var savePath = $"Uploads/carousel-images/{itemId}";

                    await _file.SaveFilesAsync(files, savePath);
                }
                else
                {
                    return Ok(new { message = "Carousel item was not saved" });
                }

                return Ok(new { message = "Carousel item saved successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("getCarouselList")]
        public JObject getCarouselList([FromBody] JObject data)
        {
            return _service.getCarouselList(data);
        }

        [HttpPost("GetCarouselItemById")]
        public JObject GetCarouselItemById(JObject data)
        {
            return _service.GetCarouselItemById(data);
        }
    }
}
