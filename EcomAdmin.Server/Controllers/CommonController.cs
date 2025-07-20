using EcommerceAdmin.Server.DbHelpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;

namespace EcommerceAdmin.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : BaseController
    {
        readonly IWebHostEnvironment _env;

        public CommonController(IWebHostEnvironment env)
        {
            _env = env;
        }
        [HttpPost("Get_DDL_Data")]
        public JArray Get_DDL_Data([FromBody] JObject data)
        {
            var paramDict = data.ToObject<Dictionary<string, object>>();
            var dt = DbHelper.ExecuteDataTable("Get_DDL_Data", paramDict);

            // Convert DataTable to a raw JSON array
            return JArray.FromObject(dt);
        }
        [HttpPost("Delete_By_Table_And_Where")]
        public JArray Delete_By_Table_And_Where([FromBody] JObject data)
        {
            var paramDict = data.ToObject<Dictionary<string, object>>();
            var dt = DbHelper.ExecuteDataTable("Delete_By_Table_And_Where", paramDict);
            return JArray.FromObject(dt);
        }

        [HttpGet("{entityName}")]
        public IActionResult Get(string entityName)
        {
            var parameters = new Dictionary<string, object> { { "@EntityName", entityName } };
            var dt = DbHelper.ExecuteDataTable("Get_GridFieldConfig", parameters);
            return Ok(JArray.FromObject(dt));
        }

        [HttpPost("Delete_By_Table_And_where_and_file_name")]
        [HttpPost]
        public JArray Delete_By_Table_And_where_and_file_name([FromBody] JObject data)
        {
            // Extract and validate input
            var relativePath = data["filePath"]?.ToString();
            var tableName = data["tableName"]?.ToString();
            var whereClause = data["whereClause"]?.ToString();

            if (string.IsNullOrWhiteSpace(relativePath))
                throw new ArgumentException("File path is missing or empty.");

            if (string.IsNullOrWhiteSpace(tableName) || string.IsNullOrWhiteSpace(whereClause))
                throw new ArgumentException("Table name or where clause is missing.");

            // DB deletion
            var paraDict = new Dictionary<string, object>
    {
        { "tableName", tableName },
        { "whereClause", whereClause }
    };

            var dt = DbHelper.ExecuteDataTable("Delete_By_Table_And_Where_And_FileName", paraDict);

            // File system deletion
            string fullPath = Path.Combine(_env.WebRootPath, relativePath);

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }

            return JArray.FromObject(new[] { relativePath });
        }


        [HttpPost("save")]
        public IActionResult Save([FromBody] List<GridFieldConfig> configs)
        {
            foreach (var cfg in configs)
            {
                var parameters = new Dictionary<string, object?>
        {
            { "@Id", cfg.Id },
            { "@EntityName", cfg.EntityName },
            { "@FieldName", cfg.FieldName },
            { "@Label", cfg.Label },
            { "@FieldType", cfg.FieldType },
            { "@IsVisible", cfg.IsVisible },
            { "@SortOrder", cfg.SortOrder }
        };

                // Call your stored procedure to insert or update
                DbHelper.ExecuteDataTable("Save_GridFieldConfig", parameters);
            }

            return Ok(new { success = true });
        }


    }

}
public class GridFieldConfig
{
    public int Id { get; set; }
    public string EntityName { get; set; } = "";
    public string FieldName { get; set; } = "";
    public string Label { get; set; } = "";
    public string FieldType { get; set; } = "text";
    public bool IsVisible { get; set; } = true;
    public int SortOrder { get; set; }
}
