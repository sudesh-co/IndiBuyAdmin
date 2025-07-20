using EcomAdmin.Server.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductAttributeController: ControllerBase
    {
        ProductAttributeService _service = new ProductAttributeService();
        [HttpPost("RegisterCategories")]
        public JObject RegisterCategories([FromBody] JObject data)
        {
            return _service.RegisterCategories(data);
        }
        [HttpPost("getAttrubutesList")]
        public JObject getAttrubutesList([FromBody] JObject data)
        {
            return _service.getAttrubutesList(data);
        } 
        [HttpPost("getAttrubuteValueList")]
        public JObject getAttrubuteValueList([FromBody] JObject data)
        {
            return _service.getAttrubuteValueList(data);
        }
        [HttpPost("InsertUpdateAttributes")]
        public JObject InsertUpdateAttributes([FromBody] JObject data)
        {
            return _service.InsertUpdateAttributes(data);
        }
         [HttpPost("AddUpdateAttrubutesValue")]
        public JObject AddUpdateAttrubutesValue([FromBody] JObject data)
        {
            return _service.AddUpdateAttrubutesValue(data);
        }


    }
}
