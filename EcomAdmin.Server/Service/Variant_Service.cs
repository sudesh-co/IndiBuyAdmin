using EcommerceAdmin.Server.DbHelpers;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Service
{
    public class Variant_Service
    {
        public JObject getvariantList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetprodcutVariantsList", para);
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
        public async Task<DataTable> SaveProductVariant(Dictionary<string, object> data)
        {
            return DbHelper.ExecuteDataTable("usp_SaveProductVariant", data);
        }
        public JObject getProductVariantDetails(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetProductVariantDetailsImages", para);
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


        public JObject getVarientAttributesList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetVariantAttributesList", para);
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
        public JObject SaveVariantAttributes(JObject data)

        {
            JObject rtnData = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            DataTable dt=  DbHelper.ExecuteDataTable("usp_SaveVariantAttributeMapping", para);
              rtnData["data"] = JArray.FromObject(dt);
            return rtnData;
        }
        public JObject getVariantAttributesDetails(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetProductVariantDetailsImages", para);
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
