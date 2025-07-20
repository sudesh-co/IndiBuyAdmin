using EcomAdmin.Server.Service;
using EcommerceAdmin.Server.Controllers;
using EcommerceAdmin.Server.DbHelpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        UsersService service = new UsersService();
        [HttpPost("GetUsers")]
        public JObject GetUsers ([FromBody] JObject data)
        {
            return   service.GetUsers(data);
        }
        [HttpPost("addUpdateUser")]
        public JObject addUpdateUser([FromBody] JObject data)
        {
            return   service.addUpdateUser(data);
        }
    }

}
