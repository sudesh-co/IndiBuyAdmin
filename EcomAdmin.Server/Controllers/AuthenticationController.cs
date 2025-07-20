using EcomAdmin.Server.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EcomAdmin.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        IConfiguration _configuration;
        public AuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration;

        }
        AuthenticationService _service = new AuthenticationService();
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto data)
        {
            var user = _service.ValidateUser(data.email, data.password); // Check user from DB

            if (user == null )
                return Unauthorized("Invalid credentials");

            var token = GenerateJwtToken(user);
            return Ok(new { token, user });
        }

        [HttpPost("RegisterNewUser")]
        public JObject RegisterNewUser([FromBody] JObject data)
        {
            return _service.RegisterNewUser(data);
        }

        [HttpPost("logout")]
        public JObject logout([FromBody] JObject data)
        {
            return _service.logout(data);
        }
        private string GenerateJwtToken(UserDto user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

            var claims = new[]
            {
        new Claim("id", user.UserId.ToString()),
        //new Claim("name", user.FullName),
        new Claim("email", user.Email),
        new Claim("isAdmin", user.IsAdmin.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
public class LoginDto
{
    public string email { get; set; }
    public string password { get; set; }
}
