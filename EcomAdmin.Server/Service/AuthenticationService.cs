using EcommerceAdmin.Server.DbHelpers;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EcomAdmin.Server.Service
{
    public class AuthenticationService
    {

        public JObject login(JObject data)
        {
            Dictionary<string, object> param = data.ToObject<Dictionary<string, object>>();
            JObject rtnData = new JObject();

            DataTable dt = DbHelper.ExecuteDataTable("LoginUser", param);
            return rtnData;

        }
        public UserDto ValidateUser(string email, string password)
        {
            string hashedPassword = HashPassword(password); // 🔑 Hash before checking

            var param = new Dictionary<string, object>
    {
        { "@Email", email },
        { "@PasswordHash", hashedPassword }
    };

            DataTable dt = DbHelper.ExecuteDataTable("LoginUser", param);

            if (dt.Rows.Count == 0)
                return null;

            DataRow row = dt.Rows[0];
            return new UserDto
            {
                UserId = Convert.ToInt32(row["UserId"]),
                Email = row["Email"].ToString()
            };
        }

        public JObject RegisterNewUser(JObject data)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("Email", data["email"].ToString());
            param.Add("PasswordHash", HashPassword(data["password"].ToString()));
            JObject rtnData = new JObject();

            DataTable dt = DbHelper.ExecuteDataTable("RegisterUser", param);
            return rtnData;

        }
        public string HashPassword(string password)
        {
            using (SHA256 sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }
       


        public JObject logout(JObject data)
        {
            JObject rtnData = new JObject();

            return rtnData;

        }
    }
}
public class UserDto
{
    public int UserId { get; set; }
    //public string FullName { get; set; }
    public string Email { get; set; }
    public bool IsAdmin { get; set; }
}
