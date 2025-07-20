using EcomAdmin.Server.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VariantController:ControllerBase
    {
        Variant_Service _service = new Variant_Service();
        FileService _file = new FileService();
        [HttpPost("SaveProductVariant")]
        public async Task<IActionResult> SaveProductVariant()
        {
            try
            {
                var form = await Request.ReadFormAsync();
                var data = new Dictionary<string, object>
                {
                    ["VariantId"] = form["VariantId"].ToString(),
                    ["ProductId"] = form["ProductId"].ToString(),
                    ["Price"] = Convert.ToDecimal(form["Price"].ToString()),
                    ["SKU"] = form["SKU"].ToString(),
                    ["Slug"] = form["Slug"].ToString(),
                    ["Stock"] = form["Stock"].ToString(),
                    ["IsActive"] = form["IsActive"].ToString() == "true" ? true : false,
                    ["ImageMetaList"] = string.Join(",", form.Files.Select(f => f.FileName))
                };
                var files = form.Files;

                DataTable result = await _service.SaveProductVariant(data);

                if (result.Rows.Count > 0)
                {
                    var productId = result.Rows[0]["ProductId"].ToString();
                    var VariantId = result.Rows[0]["VariantId"].ToString();
                    var savePath = $"Uploads/productvariant-images/{productId}/{VariantId}";

                    await _file.SaveFilesAsync(files, savePath);
                }
                else
                {
                    return Ok(new { message = "Product Was Not Saved" });

                }

                return Ok(new { message = "Product saved successfully" });

            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpPost("getvariantList")]
        public JObject getvariantList([FromBody] JObject data)
        {
            return _service.getvariantList(data);
        }

        [HttpPost("getProductVariantDetails")]
        public JObject getProductVariantDetails([FromBody] JObject data)
        {
            return _service.getProductVariantDetails(data);
        }

        [HttpPost("SaveVariantAttributes")]
        public JObject SaveVariantAttributes([FromBody] JObject data)
        {
            return _service.SaveVariantAttributes(data);
        }


        [HttpPost("getVarientAttributesList")]
        public JObject getVarientAttributesList([FromBody] JObject data)
        {
            return _service.getVarientAttributesList(data);
        }

        [HttpPost("getVariantAttributesDetails")]
        public JObject getVariantAttributesDetails([FromBody] JObject data)
        {
            return _service.getVariantAttributesDetails(data);
        }
    }
}
