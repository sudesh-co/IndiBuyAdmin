using EcommerceAdmin.Server.DbHelpers;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Service
{
    public class ProductService
    {
        public async Task<DataTable>RegisterProduct(Dictionary<string, object> data)
        {
            return  DbHelper.ExecuteDataTable("usp_SaveProductWithImages", data);
        }
        public  JObject getProductsList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var  ds = DbHelper.ExecuteDataSet("usp_GetProductsWithImages", para);
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
        public  JObject getProductDetails(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var  ds = DbHelper.ExecuteDataSet("usp_GetProductDetailsImages", para);
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
