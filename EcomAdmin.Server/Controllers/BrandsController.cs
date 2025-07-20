using EcomAdmin.Server.Service;
using EcommerceAdmin.Server.DbHelpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandsController : ControllerBase
    {
        Brands_service _service = new Brands_service();
        FileService _file = new FileService();
        [HttpPost("AddUpdateBrands")]
        public async Task<IActionResult> AddUpdateBrands()
        {
            try
            {
                var form = await Request.ReadFormAsync();
                var brandLogo = (form.Files != null && form.Files.Count > 0)
                    ? string.Join(",", form.Files.Select(f => Path.GetFileName(f.FileName))) // ensures just the filename
                    : form.TryGetValue("BrandLogo", out var brandValue) ? brandValue.ToString() : string.Empty;
                int brandId = 0;
                if (int.TryParse(form["BrandId"].ToString(), out var parsedId))
                {
                    brandId = parsedId;
                }
                var data = new Dictionary<string, object>
                {
                    ["Name"] = form["Name"].ToString(),
                    ["BrandId"] = brandId,
                    ["IsActive"] = form["IsActive"].ToString() == "true" ? true : false,
                    ["BrandLogo"] = brandLogo
                };
                var files = form.Files;

                DataTable result = await _service.AddUpdateBrands(data);

                if (result.Rows.Count > 0 && files?.Count > 0)
                {
                    var brandID = Convert.ToInt32(result.Rows[0]["BrandId"]);
                    var savePath = $"Uploads/brand-logos/{brandID}";

                    await _file.SaveFilesAsync(files, savePath);
                }
                else
                {
                    return Ok(new { message = "Brand Was Not Saved" });

                }

                return Ok(new { message = "brand saved successfully" });

            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost("getBrandsList")]
        public JObject getBrandsList([FromBody] JObject data)
        {
            return _service.getBrandsList(data);
        }
        [HttpPost("getBrandDetails")]
        public JObject getBrandDetails([FromBody] JObject data)
        {
            return _service.getBrandDetails(data);
        }

    }
}
