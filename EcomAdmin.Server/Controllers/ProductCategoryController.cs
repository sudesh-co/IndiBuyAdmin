using EcommerceAdmin.Server.DbHelpers;
using EcommerceAdmin.Server.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

[ApiController]
[Route("api/[controller]")]
public class ProductCategoryController : ControllerBase
{
    public readonly Category_Service _service = new Category_Service();

    [HttpPost("RegisterCategories")]
    public JObject RegisterCategories([FromBody] JObject data)
    {
        return _service.RegisterCategories(data);
    }  
    [HttpPost("getCategoriesList")]
    public JObject getCategoriesList([FromBody] JObject data)
    {
        return _service.getCategoriesList(data);
    } 
    [HttpPost("AddUpdateCategories")]
    public JObject AddUpdateCategories([FromBody] JObject data)
    {
        return _service.AddUpdateCategories(data);
    } 

}
