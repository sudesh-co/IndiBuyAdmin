using EcommerceAdmin.Server.DbHelpers;
using Newtonsoft.Json.Linq;

namespace EcomAdmin.Server.Service
{
    public class ProductAttributeService
    {

        public JObject RegisterCategories(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, Object> param = new Dictionary<string, object>();
            param.Add("CategoryId ", data["CategoryId"]);
            param.Add("Name", data["Name"]);
            param.Add("ParentCategoryId", data["ParentCategoryId"]);
            param.Add("IsActive", data["IsActive "]);

            var dt = DbHelper.ExecuteDataTable("Insert_Update_Category", param);
            rtnObj["data"] = JArray.FromObject(dt);
            return rtnObj;
        }
        public JObject getAttrubutesList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> param = new Dictionary<string, object>();

            // Call stored procedure
            var ds = DbHelper.ExecuteDataSet("[dbo].[GetAttributesOnly]", param);

            // Convert first DataTable to JArray and assign
            if (ds.Tables.Count > 0)
            {
                rtnObj["data"] = JArray.FromObject(ds.Tables[0]);
            }
            if (ds.Tables.Count > 1)
            {
                rtnObj["meta"] = JArray.FromObject(ds.Tables[1]);
            }


            return rtnObj;
        } public JObject getAttrubuteValueList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> param = new Dictionary<string, object>();

            // Call stored procedure
            var ds = DbHelper.ExecuteDataSet("[dbo].[GetAttributeValuesOnly]", param);

            // Convert first DataTable to JArray and assign
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

        public JObject InsertUpdateAttributes(JObject data)
        {
            JObject rtnObj = new JObject();
            var param = data.ToObject<Dictionary<string, object>>();

            var dt = DbHelper.ExecuteDataTable("Insert_Update_Attributes", param);
            rtnObj["data"] = JArray.FromObject(dt);
            return rtnObj;
        }
        
        public JObject AddUpdateAttrubutesValue(JObject data)
        {
            JObject rtnObj = new JObject();
            var param = data.ToObject<Dictionary<string, object>>();

            var dt = DbHelper.ExecuteDataTable("Insert_Update_Attributes_Values", param);
            rtnObj["data"] = JArray.FromObject(dt);
            return rtnObj;
        }

    }

}
