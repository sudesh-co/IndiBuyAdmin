using EcomAdmin.Server.Service;
using EcommerceAdmin.Server.DbHelpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController :ControllerBase
    {
        FileService _file = new FileService();
        ProductService _service = new ProductService();
        [HttpPost("SaveProduct")]
        public async Task<IActionResult> SaveProduct()
        {
            try
            {
                var form = await Request.ReadFormAsync();
                var data = new Dictionary<string, object>
                {
                    ["Name"] = form["Name"].ToString(),
                    ["Description"] = form["Description"].ToString(),
                    ["Price"] = Convert.ToDecimal(form["Price"].ToString()),
                    ["SKU"] = form["SKU"].ToString(),
                    ["BrandId"] = form["BrandId"].ToString(),
                    ["Slug"] = form["Slug"].ToString(),
                    ["ProductId"] = form["ProductId"].ToString(),
                    ["CategoryId"] = string.IsNullOrWhiteSpace(form["CategoryId"]) ? DBNull.Value : Convert.ToInt32(form["CategoryId"]),
                    ["IsActive"] = form["IsActive"].ToString() == "true" ? true : false,
                    ["ImageMetaList"] = string.Join(",", form.Files.Select(f => f.FileName)) 
                };
                var files = form.Files;

                DataTable result = await _service.RegisterProduct(data);

                if (result.Rows.Count > 0)
                {
                    var productId = result.Rows[0]["ProductId"].ToString();
                    var savePath = $"Uploads/product-images/{productId}";

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
        [HttpPost("getProductsList")]
        public JObject getProductsList([FromBody] JObject data)
        {
            return _service.getProductsList(data);
        }
        [HttpPost("getProductDetails")]

        public JObject getProductDetails(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetProductDetailsImages", para);
            if (ds.Tables.Count > 0)
            {
                rtnObj["data"] = JArray.FromObject(ds.Tables[0]);
            }
            if (ds.Tables.Count > 1)
            {
                rtnObj["imgdeta"] = JArray.FromObject(ds.Tables[1]);
            }
            return rtnObj;
        }
    }
}