using EcomAdmin.Server.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiscountsController
    {
        DiscountsService _service = new DiscountsService();

        [HttpPost("getDiscountList")]
        public JObject getDiscountList([FromBody] JObject data)
        {
            return _service.getDiscountList(data);
        }
        [HttpPost("saveDiscount")]
        public JObject saveDiscount([FromBody] JObject data)
        {
            return _service.saveDiscount(data);
        }
    }
}
