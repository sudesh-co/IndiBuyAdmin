using EcommerceAdmin.Server.DbHelpers;
using Newtonsoft.Json.Linq;
using System.Data;

namespace EcomAdmin.Server.Service
{
    public class Brands_service
    {
        public async Task<DataTable> AddUpdateBrands(Dictionary<string, object> data)
        {
            return DbHelper.ExecuteDataTable("usp_SaveBrandWithLogo", data);
        }
        public JObject getBrandsList(JObject data)
        {
            JObject rtnObj = new JObject();
            Dictionary<string, object> para = data.ToObject<Dictionary<string, object>>();
            var ds = DbHelper.ExecuteDataSet("usp_GetBrandsWithLogos", para);
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
            public  JObject getBrandDetails(JObject data)
            {
                JObject rtnObj = new JObject();
                Dictionary<string, object> parm = data.ToObject<Dictionary<string, object>>();
                DataTable dt=  DbHelper.ExecuteDataTable("usp_GetAllBrandsWithLogos", parm);
                rtnObj["data"] = JArray.FromObject(dt);
                return rtnObj;
            }
    }
}
