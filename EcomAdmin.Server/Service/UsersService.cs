using EcommerceAdmin.Server.DbHelpers;
using Newtonsoft.Json.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EcomAdmin.Server.Service
{
    public class UsersService
    {

        public JObject GetUsers(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetUsers", para);
            if (ds.Tables.Count > 0)
            {
                rtnObj["data"] = JArray.FromObject(ds.Tables[0]);
            }
            if (ds.Tables.Count > 1)
            {
                rtnObj["meta"] = JArray.FromObject(ds.Tables[1]);
            }
            return rtnObj;
        }
        public JObject addUpdateUser(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataTable("usp_AddOrUpdateUser", para);
            rtnObj["data"] = JArray.FromObject(ds);
            return rtnObj;
        }
    }
}
